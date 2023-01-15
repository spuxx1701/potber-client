import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import LocalStorageService from './local-storage';

export default class RendererService extends Service {
  @service declare localStorage: LocalStorageService;

  @tracked leftSidebarExpanded = false;
  rootStyle = document.documentElement.style;

  @action initialize() {
    this.updateMainNavPosition();
    this.updateBoxStyle();
  }

  @action updateMainNavPosition() {
    const mainNavPosition = this.localStorage.getMainNavPosition();
    if (mainNavPosition === 'top') {
      this.rootStyle.setProperty('--main-nav-top', '0px');
      this.rootStyle.setProperty('--main-nav-bottom', 'unset');
      this.rootStyle.setProperty(
        '--page-content-padding-top',
        'var(--main-nav-height)'
      );
      this.rootStyle.setProperty('--page-content-padding-bottom', '0px');
    } else {
      this.rootStyle.setProperty('--main-nav-top', 'unset');
      this.rootStyle.setProperty('--main-nav-bottom', '0px');
      this.rootStyle.setProperty('--page-content-padding-top', '0px');
      this.rootStyle.setProperty(
        '--page-content-padding-bottom',
        'var(--main-nav-height)'
      );
    }
  }

  @action updateBoxStyle() {
    const boxStyle = this.localStorage.getBoxStyle();
    if (boxStyle === 'rect') {
      this.rootStyle.setProperty('--global-border-radius', '0px');
      this.rootStyle.setProperty('--global-gap', 'unset');
    } else {
      this.rootStyle.setProperty('--global-border-radius', '5px');
      this.rootStyle.setProperty('--global-gap', '0.25rem');
    }
  }

  @action createClickRipple(event: Event) {
    // do something
  }

  @action closeLeftSidebar() {
    this.leftSidebarExpanded = false;
    this.updateLeftSidebar();
  }

  @action toggleLeftSidebar() {
    this.leftSidebarExpanded = !this.leftSidebarExpanded;
    this.updateLeftSidebar();
  }

  @action updateLeftSidebar() {
    const style = document.documentElement.style;
    if (this.leftSidebarExpanded) {
      style.setProperty('--sidebar-width', 'var(--sidebar-expanded-width)');
    } else {
      style.setProperty('--sidebar-width', '0px');
    }
  }
}
