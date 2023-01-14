import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const PREFIX = 'potber-';

export default class LocalStorageService extends Service {
  @tracked mainNavPosition: string = this.getMainNavPosition();
  @tracked avatarStyle: string = this.getAvatarStyle();
  @tracked boxStyle: string = this.getBoxStyle();

  @action getMainNavPosition() {
    this.mainNavPosition =
      localStorage.getItem(`${PREFIX}mainNavPosition`) || 'bottom';
    return this.mainNavPosition;
  }

  @action setMainNavPosition(value: 'top' | 'bottom') {
    localStorage.setItem(`${PREFIX}mainNavPosition`, value);
    this.mainNavPosition = value;
  }

  @action getAvatarStyle() {
    this.avatarStyle = localStorage.getItem(`${PREFIX}avatarStyle`) || 'none';
    return this.avatarStyle;
  }

  @action setAvatarStyle(value: 'none' | 'small' | 'large') {
    localStorage.setItem(`${PREFIX}avatarStyle`, `${value}`);
    this.avatarStyle = value;
  }

  @action getBoxStyle() {
    this.boxStyle = localStorage.getItem(`${PREFIX}boxStyle`) || 'rect';
    return this.boxStyle;
  }

  @action setBoxStyle(value: 'rect' | 'round') {
    localStorage.setItem(`${PREFIX}boxStyle`, `${value}`);
    this.getBoxStyle();
  }
}
