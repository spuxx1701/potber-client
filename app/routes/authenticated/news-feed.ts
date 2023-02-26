import Route from '@ember/routing/route';
import { service } from '@ember/service';
import LocalStorageService from 'potber-client/services/local-storage';
import RSVP from 'rsvp';

export default class NewsFeedRoute extends Route {
  @service declare localStorage: LocalStorageService;

  async model() {
    return RSVP.hash({
      boardFavorites: this.localStorage.boardFavorites,
    });
  }
}
