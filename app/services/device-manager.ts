import Service, { service } from '@ember/service';
import MessagesService from './messages';
import SettingsService, { Gestures } from './settings';
import RendererService from './renderer';

type OperatingSystem =
  | 'Android'
  | 'iOS'
  | 'Windows'
  | 'Linux'
  | 'Mac OS'
  | 'unknown';

type Browser = 'Firefox' | 'Chrome' | 'WebKit' | 'unknown';

export default class DeviceManagerService extends Service {
  @service declare messages: MessagesService;
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;

  userAgent = window.navigator.userAgent;
  operatingSystem: OperatingSystem = this.getOperatingSystem(this.userAgent);
  browser: Browser = this.getBrowser(this.userAgent);

  initialize() {
    this.messages.log(
      `Recognized OS: ${this.operatingSystem}; Browser: ${this.browser}.`,
      {
        context: this.constructor.name,
      },
    );
    if (this.operatingSystem === 'iOS') {
      this.enableiOSCompatibility();
    }
    this.toggleGesturesSupport();
  }

  /**
   * Enabled or disables gestures support.
   */
  toggleGesturesSupport() {
    switch (this.settings.getSetting('gestures')) {
      case Gestures.all:
        this.renderer.setStyleVariable('--app-overscroll-behavior-y', 'none');
        this.renderer.setStyleVariable('--app-overscroll-behavior-x', 'none');
        break;
      case Gestures.onlySidebar:
        this.renderer.setStyleVariable('--app-overscroll-behavior-y', 'unset');
        this.renderer.setStyleVariable('--app-overscroll-behavior-x', 'none');
        break;
      default:
        this.renderer.setStyleVariable('--app-overscroll-behavior-y', 'unset');
        this.renderer.setStyleVariable('--app-overscroll-behavior-x', 'unset');
    }
  }

  /**
   * Determines the operating system.
   * @param userAgent The user agent.
   * @returns The operating system.
   */
  getOperatingSystem(userAgent: string): OperatingSystem {
    if (userAgent.match(/iP(ad|hone)/i)) {
      return 'iOS';
    } else if (userAgent.match(/Android/i)) {
      return 'Android';
    } else if (userAgent.match(/Windows/i)) {
      return 'Windows';
    } else if (userAgent.match(/Linux/i)) {
      return 'Linux';
    } else if (userAgent.match(/Mac OS X/i)) {
      return 'Mac OS';
    }
    return 'unknown';
  }

  /**
   * Determines the browser.
   * @param userAgent The user agent.
   * @returns The browser.
   */
  getBrowser(userAgent: string): Browser {
    if (userAgent.match(/Firefox/i)) {
      return 'Firefox';
    } else if (userAgent.match(/Chrome/)) {
      return 'Chrome';
    } else if (userAgent.match(/WebKit/i)) {
      return 'WebKit';
    }
    return 'unknown';
  }

  /**
   * Enables iOS compatibility mode.
   */
  enableiOSCompatibility() {
    // Set an attribute on the document
    document.documentElement.setAttribute('data-ios', 'true');
    // Add a bottom border to the bottom nav to make room for the home button
    document.documentElement.style.setProperty(
      '--bottom-nav-bottom-border',
      'var(--bottom-nav-bottom-border-ios)',
    );
  }

  get isDesktop() {
    return this.renderer.isDesktop;
  }
}
