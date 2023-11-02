import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import LocalStorageService from './local-storage';
import RendererService from './renderer';

export interface Settings {
  avatarStyle: AvatarStyle;
  theme: Theme;
  landingPage: LandingPage;
  autoRefreshSidebar: boolean;
  sidebarLayout: SidebarLayout;
  fontSize: FontSize;
  replaceForumUrls: boolean;
  darkenReadPosts: boolean;
  enableGestures: boolean;
  debug: boolean;
}

export enum AvatarStyle {
  none,
  small,
}

export enum Theme {
  'default',
  'snowman',
  'default-round',
}

export enum LandingPage {
  boardOverview,
  home,
  pot,
}

export enum SidebarLayout {
  leftTop,
  leftBottom,
  rightTop,
  rightBottom,
}

export enum FontSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export default class SettingsService extends Service {
  @service declare localStorage: LocalStorageService;
  @service declare renderer: RendererService;

  @tracked protected active: Settings = this.load();
  readonly default: Settings = {
    avatarStyle: AvatarStyle.none,
    theme: Theme.default,
    landingPage: LandingPage.boardOverview,
    autoRefreshSidebar: true,
    sidebarLayout: SidebarLayout.leftTop,
    fontSize: FontSize.medium,
    replaceForumUrls: true,
    darkenReadPosts: false,
    enableGestures: false,
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
      if (typeof storedSettings.autoRefreshSidebar === 'boolean') {
        settings.autoRefreshSidebar = storedSettings.autoRefreshSidebar;
      }
      if (typeof storedSettings.replaceForumUrls === 'boolean') {
        settings.replaceForumUrls = storedSettings.replaceForumUrls;
      }
      if (typeof storedSettings.darkenReadPosts === 'boolean') {
        settings.darkenReadPosts = storedSettings.darkenReadPosts;
      }
      if (typeof storedSettings.enableGestures === 'boolean') {
        settings.enableGestures = storedSettings.enableGestures;
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
      enabled && this.getSetting('enableGestures')
        ? 'var(--gestures-container-background-debug)'
        : 'unset',
    );
  }
}
