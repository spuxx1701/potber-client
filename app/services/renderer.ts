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

  /**
   * Initializes the service.
   */
  @action initialize() {
    this.updateBoxStyle();
  }

  /**
   * Updates the current box style.
   */
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

  /**
   * Creates a ripple animation on the event target.
   * @param event The event.
   */
  @action createClickRipple(event: Event) {
    // Clean up existing ripples
    const existingRipples = document.body.getElementsByClassName(
      'click-ripple-container'
    );
    for (const ripple of existingRipples) {
      ripple.remove();
    }
    // Create new ripple
    const control = event.currentTarget as HTMLElement;
    if (control) {
      const rippleContainer = document.createElement('span');
      rippleContainer.classList.add('click-ripple-container');
      const ripple = document.createElement('span');
      const diameter = Math.max(control.clientWidth, control.clientHeight);
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.classList.add('click-ripple');
      rippleContainer.appendChild(ripple);
      control.appendChild(rippleContainer);
    }
  }

  /**
   * Closes the left sidebar.
   */
  @action closeLeftSidebar() {
    this.leftSidebarExpanded = false;
    this.updateLeftSidebar();
  }

  /**
   * Toggles the left sidebar.
   */
  @action toggleLeftSidebar() {
    this.leftSidebarExpanded = !this.leftSidebarExpanded;
    this.updateLeftSidebar();
  }

  /*
   * Updates the state of the left sidebar.
   */
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

  /**
   * Shows the loading indicator.
   */
  @action async showLoadingIndicator() {
    this.rootStyle.setProperty('--loading-indicator-opacity', '1');
  }

  /**
   * Hides the loading indicator.
   */
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
