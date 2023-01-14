import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ApiService from 'potber/services/api';

export default class IndexRoute extends Route {
  @service declare api: ApiService;

  async model() {
    return await this.api.getBoardCategories();
  }
}
