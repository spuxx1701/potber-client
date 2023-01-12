import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const PREFIX = 'potber-';

export default class LocalStorageService extends Service {
  @tracked mainNavPosition: string = this.getMainNavPosition();
  @tracked enableBenders: boolean = this.getEnableBenders();

  @action getMainNavPosition() {
    this.mainNavPosition =
      localStorage.getItem(`${PREFIX}mainNavPosition`) || 'bottom';
    return this.mainNavPosition;
  }

  @action setMainNavPosition(value: 'top' | 'bottom') {
    localStorage.setItem(`${PREFIX}mainNavPosition`, value);
    this.getMainNavPosition();
  }

  @action getEnableBenders() {
    this.enableBenders = localStorage.getItem(`${PREFIX}enableBenders`) === '1';
    return this.enableBenders;
  }

  @action setEnableBenders(value: boolean) {
    localStorage.setItem(`${PREFIX}enableBenders`, `${+value}`);
    this.getEnableBenders();
  }
}
