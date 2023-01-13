import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import RendererService from './renderer';

const PREFIX = 'potber-';

export default class LocalStorageService extends Service {
  @tracked mainNavPosition: string = this.getMainNavPosition();
  @tracked benders: string = this.getBenders();
  @tracked boxStyle: string = this.getBoxStyle();

  @action getMainNavPosition() {
    this.mainNavPosition =
      localStorage.getItem(`${PREFIX}mainNavPosition`) || 'bottom';
    return this.mainNavPosition;
  }

  @action setMainNavPosition(value: 'top' | 'bottom') {
    localStorage.setItem(`${PREFIX}mainNavPosition`, value);
    this.getMainNavPosition();
  }

  @action getBenders() {
    this.benders = localStorage.getItem(`${PREFIX}benders`) || 'none';
    return this.benders;
  }

  @action setBenders(value: 'none' | 'small' | 'large') {
    localStorage.setItem(`${PREFIX}benders`, `${value}`);
    this.getBenders();
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
