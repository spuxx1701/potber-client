import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { sleep } from 'potber-client/utils/misc';
import MessagesService from './messages';
import SettingsService, { BoxStyle, SidebarLayout } from './settings';

const LOADING_INDICATOR_DELAY = 500;

export default class RendererService extends Service {
  @service declare settings: SettingsService;
  @service declare messages: MessagesService;
  @tracked leftSidebarExpanded = false;
  rootStyle = document.documentElement.style;

  preventScrollReset = false;

  /**
   * Initializes the service.
   */
  @action initialize() {
    this.updateBoxStyle();
    this.updateSidebarLayout();
  }

  /**
   * Updates the current box style.
   */
  updateBoxStyle() {
    if (this.settings.boxStyle === BoxStyle.rect) {
      this.rootStyle.setProperty('--global-border-radius', '0px');
      this.rootStyle.setProperty('--global-gap', 'unset');
    } else {
      this.rootStyle.setProperty('--global-border-radius', '5px');
      this.rootStyle.setProperty('--global-gap', '0.25rem');
    }
  }

  /**
   * Updates the sidebar layout. Affects whether the sidebar is rendered on the left
   * or ride side as well as the position of the sidebar toggle button.
   */
  updateSidebarLayout() {
    switch (this.settings.sidebarLayout) {
      case SidebarLayout.rightBottom:
        this.rootStyle.setProperty('--sidebar-left', 'unset');
        this.rootStyle.setProperty('--sidebar-right', '0px');
        this.rootStyle.setProperty('--bottom-nav-left-gap', '0px');
        this.rootStyle.setProperty(
          '--bottom-nav-right-gap',
          'var(--control-default-height)'
        );
        break;
      case SidebarLayout.rightTop:
        this.rootStyle.setProperty('--sidebar-left', 'unset');
        this.rootStyle.setProperty('--sidebar-right', '0px');
        this.rootStyle.setProperty('--bottom-nav-left-gap', '0px');
        this.rootStyle.setProperty('--bottom-nav-right-gap', '0px');
        break;
      case SidebarLayout.leftBottom:
        this.rootStyle.setProperty('--sidebar-left', '0px');
        this.rootStyle.setProperty('--sidebar-right', 'unset');
        this.rootStyle.setProperty(
          '--bottom-nav-left-gap',
          'var(--control-default-height)'
        );
        this.rootStyle.setProperty('--bottom-nav-right-gap', '0px');
        break;
      default:
        this.rootStyle.setProperty('--sidebar-left', '0px');
        this.rootStyle.setProperty('--sidebar-right', 'unset');
        this.rootStyle.setProperty('--bottom-nav-left-gap', '0px');
        this.rootStyle.setProperty('--bottom-nav-right-gap', '0px');
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
      this.rootStyle.setProperty('--sidebar-backdrop-opacity', '1');
      this.rootStyle.setProperty('--sidebar-backdrop-pointer-events', 'all');
    } else {
      this.rootStyle.setProperty('--sidebar-width', '0px');
      this.rootStyle.setProperty('--sidebar-backdrop-opacity', '0');
      this.rootStyle.setProperty('--sidebar-backdrop-pointer-events', 'none');
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
    await sleep(LOADING_INDICATOR_DELAY);
    this.rootStyle.setProperty('--loading-indicator-opacity', '0');
  }

  /**
   * Prevents the next reset of the scroll position that would otherwise be
   * triggered by calling RendererService.trySetScrollPosition().
   */
  @action preventNextScrollReset() {
    this.preventScrollReset = true;
  }

  /**
   * Attempts to set the window's scroll position. Will not do anything if
   * RendererService.preventScrollReset has been set earlier. However, setting this
   * property will only prevent a scroll reset one single time.
   */
  @action trySetScrollPosition(options?: Partial<ScrollToOptions>) {
    if (this.preventScrollReset) {
      this.preventScrollReset = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto', ...options });
  }

  /**
   * Can be used to scroll to the bottom after a certain amount of miliseconds.
   * Useful when refreshing thread pages.
   * @param waitTime The wait time in miliseconds.
   */
  async waitAndScrollToBottom(waitTime = 500) {
    await sleep(waitTime);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}
