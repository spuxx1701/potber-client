import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { changelog } from 'potber-client/changelog';
import RendererService from 'potber-client/services/renderer';

export default class ChangelogRoute extends Route {
  @service declare renderer: RendererService;

  model() {
    return changelog;
  }

  @action didTransition() {
    this.renderer.trySetScrollPosition();
  }
}
