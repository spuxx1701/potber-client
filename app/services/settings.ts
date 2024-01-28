import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import LocalStorageService from './local-storage';
import RendererService from './renderer';
import {
  AvatarStyle,
  FontSize,
  Gestures,
  LandingPage,
  Settings,
  SidebarLayout,
  Theme,
  Transitions,
} from './settings/types';

export * from './settings/types';
export default class SettingsService extends Service {
  @service declare localStorage: LocalStorageService;
  @service declare renderer: RendererService;

  @tracked protected active: Settings = this.load();
  readonly default: Settings = {
    avatarStyle: AvatarStyle.small,
    theme: Theme.default,
    landingPage: LandingPage.boardOverview,
    autoRefreshSidebar: true,
    sidebarLayout: SidebarLayout.leftTop,
    fontSize: FontSize.medium,
    replaceForumUrls: true,
    darkenReadPosts: false,
    hideGlobalAndAnnouncementThreads: false,
    goToBottomOfThreadPage: true,
    transitions: Transitions.static,
    gestures: Gestures.none,
    debug: false,
  };

  initialize() {
    this.toggleDebugMode(this.getSetting('debug'));
  }

  /**
   * Loads settings from local storage and/or defaults to default values
   * if one or more settings could not be found.
   * @returns The settings.
   */
  load(): Settings {
    const settings = { ...this.default };
    const storedSettings = this.localStorage.readSettings();
    if (storedSettings) {
      if (Object.values(AvatarStyle).includes(storedSettings.avatarStyle)) {
        settings.avatarStyle = storedSettings.avatarStyle;
      }
      if (Object.values(Theme).includes(storedSettings.theme)) {
        settings.theme = storedSettings.theme;
      }
      if (Object.values(LandingPage).includes(storedSettings.landingPage)) {
        settings.landingPage = storedSettings.landingPage;
      }
      if (Object.values(SidebarLayout).includes(storedSettings.sidebarLayout)) {
        settings.sidebarLayout = storedSettings.sidebarLayout;
      }
      if (Object.values(FontSize).includes(storedSettings.fontSize)) {
        settings.fontSize = storedSettings.fontSize;
      }
      if (Object.values(Transitions).includes(storedSettings.transitions)) {
        settings.transitions = storedSettings.transitions;
      }
      if (typeof storedSettings.autoRefreshSidebar === 'boolean') {
        settings.autoRefreshSidebar = storedSettings.autoRefreshSidebar;
      }
      if (typeof storedSettings.replaceForumUrls === 'boolean') {
        settings.replaceForumUrls = storedSettings.replaceForumUrls;
      }
      if (typeof storedSettings.darkenReadPosts === 'boolean') {
        settings.darkenReadPosts = storedSettings.darkenReadPosts;
      }
      if (typeof storedSettings.goToBottomOfThreadPage === 'boolean') {
        settings.goToBottomOfThreadPage = storedSettings.goToBottomOfThreadPage;
      }
      if (
        typeof storedSettings.hideGlobalAndAnnouncementThreads === 'boolean'
      ) {
        settings.hideGlobalAndAnnouncementThreads =
          storedSettings.hideGlobalAndAnnouncementThreads;
      }
      if (Object.values(Gestures).includes(storedSettings.gestures)) {
        settings.gestures = storedSettings.gestures;
      }
      if (typeof storedSettings.debug === 'boolean') {
        settings.debug = storedSettings.debug;
      }
    }
    return settings;
  }

  /**
   * Saves the active settings.
   */
  @action save() {
    this.localStorage.writeSettings(this.active);
  }

  getSettings() {
    return this.active;
  }

  getSetting<Key extends keyof Settings, Value extends Settings[Key]>(
    key: Key,
  ) {
    return this.active[key] as Value;
  }

  setSetting<Key extends keyof Settings, Value extends Settings[Key]>(
    key: Key,
    value: Value,
  ) {
    this.active = { ...this.active, [key]: value };
    this.save();
  }

  get sidebarLayout() {
    return this.active.sidebarLayout;
  }

  toggleDebugMode(enabled: boolean) {
    this.renderer.setStyleVariable(
      '--gestures-container-background',
      enabled && this.getSetting('gestures') !== Gestures.none
        ? 'var(--gestures-container-background-debug)'
        : 'unset',
    );
  }
}
