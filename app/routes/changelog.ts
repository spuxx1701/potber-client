import Route from '@ember/routing/route';
import { changelog } from 'potber-client/changelog';

export default class ChangelogRoute extends Route {
  model() {
    return changelog;
  }
}
