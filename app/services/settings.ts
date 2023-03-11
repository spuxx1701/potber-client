import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import LocalStorageService from './local-storage';

export interface Settings {
  avatarStyle: AvatarStyle;
  boxStyle: BoxStyle;
  landingPage: LandingPage;
  autoRefreshSidebar: boolean;
  sidebarLayout: SidebarLayout;
}

export enum AvatarStyle {
  none,
  small,
}

export enum BoxStyle {
  rect,
  round,
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

export default class SettingsService extends Service {
  @service declare localStorage: LocalStorageService;

  @tracked protected active: Settings = this.load();
  readonly default: Settings = {
    avatarStyle: AvatarStyle.none,
    boxStyle: BoxStyle.rect,
    landingPage: LandingPage.boardOverview,
    autoRefreshSidebar: true,
    sidebarLayout: SidebarLayout.leftTop,
  };

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
      if (Object.values(BoxStyle).includes(storedSettings.boxStyle)) {
        settings.boxStyle = storedSettings.boxStyle;
      }
      if (Object.values(LandingPage).includes(storedSettings.landingPage)) {
        settings.landingPage = storedSettings.landingPage;
      }

      if (Object.values(SidebarLayout).includes(storedSettings.sidebarLayout)) {
        settings.sidebarLayout = storedSettings.sidebarLayout;
      }
      if (typeof storedSettings.autoRefreshSidebar === 'boolean') {
        settings.autoRefreshSidebar = storedSettings.autoRefreshSidebar;
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

  get avatarStyle() {
    return this.active.avatarStyle;
  }

  set avatarStyle(avatarStyle: AvatarStyle) {
    this.active = { ...this.active, avatarStyle };
    this.save();
  }

  get boxStyle() {
    return this.active.boxStyle;
  }

  set boxStyle(boxStyle: BoxStyle) {
    this.active = { ...this.active, boxStyle };
    this.save();
  }

  get sidebarLayout() {
    return this.active.sidebarLayout;
  }

  set sidebarLayout(sidebarLayout: SidebarLayout) {
    this.active = { ...this.active, sidebarLayout };
    this.save();
  }

  get landingPage() {
    return this.active.landingPage;
  }

  set landingPage(landingPage: LandingPage) {
    this.active = { ...this.active, landingPage };
    this.save();
  }

  get autoRefreshSidebar() {
    return this.active.autoRefreshSidebar;
  }

  set autoRefreshSidebar(autoRefreshSidebar: boolean) {
    this.active = { ...this.active, autoRefreshSidebar };
    this.save();
  }
}
