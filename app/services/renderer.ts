import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import LocalStorageService from './local-storage';

export default class RendererService extends Service {
  @service declare localStorage: LocalStorageService;

  rootStyle = document.documentElement.style;

  @action initialize() {
    this.updateMainNavPosition();
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
}
