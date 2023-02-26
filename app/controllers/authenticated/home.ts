import Controller from '@ember/controller';
import { service } from '@ember/service';
import LocalStorageService from 'potber-client/services/local-storage';

export default class HomeController extends Controller {
  @service declare localStorage: LocalStorageService;

  get boardFavorites() {
    if (this.localStorage.boardFavorites) {
      return this.localStorage.boardFavorites?.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    return null;
  }
}
