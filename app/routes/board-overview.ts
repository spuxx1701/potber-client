import Route from '@ember/routing/route';
import { service } from '@ember/service';
import BoardsService from 'potber/services/boards';

export default class BoardOverviewRoute extends Route {
  @service declare boards: BoardsService;

  async model() {
    return await this.boards.getBoardCategories();
  }
}
