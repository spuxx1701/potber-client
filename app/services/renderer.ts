import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { sleep } from 'potber/utils/misc';
import LocalStorageService from './local-storage';
import MessagesService from './messages';

export default class RendererService extends Service {
  @service declare localStorage: LocalStorageService;
  @service declare messages: MessagesService;
  @tracked leftSidebarExpanded = false;
  rootStyle = document.documentElement.style;

  preventScrollReset = false;

  @action initialize() {
    this.updateBoxStyle();
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
    if (this.leftSidebarExpanded) {
      this.rootStyle.setProperty(
        '--sidebar-width',
        'var(--sidebar-expanded-width)'
      );
    } else {
      this.rootStyle.setProperty('--sidebar-width', '0px');
    }
  }

  @action async showLoadingIndicator() {
    this.rootStyle.setProperty('--loading-indicator-opacity', '1');
  }

  @action async hideLoadingIndicator() {
    await sleep(200);
    this.rootStyle.setProperty('--loading-indicator-opacity', '0');
  }

  /**
   * Prevents the next reset of the scroll position that would otherwise be
   * triggered by calling RendererService.tryResetScrollPosition().
   */
  @action preventNextScrollReset() {
    this.preventScrollReset = true;
  }

  /**
   * Attempts to reset the window's scroll position. Will not do anything if
   * RendererService.preventScrollReset has been set earlier. However, setting this
   * property will only prevent a scroll reset one single time.
   */
  @action tryResetScrollPosition() {
    if (this.preventScrollReset) {
      this.preventScrollReset = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
