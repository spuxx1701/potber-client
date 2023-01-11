import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const PREFIX = 'potber-';

export default class LocalStorageService extends Service {
  @tracked mainNavPosition: string = this.getMainNavPosition();

  @action getMainNavPosition() {
    this.mainNavPosition =
      localStorage.getItem(`${PREFIX}mainNavPosition`) || 'bottom';
    return this.mainNavPosition;
  }

  @action setMainNavPosition(value: 'top' | 'bottom') {
    localStorage.setItem(`${PREFIX}mainNavPosition`, value);
    this.getMainNavPosition();
  }
}
