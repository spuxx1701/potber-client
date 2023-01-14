import Controller from '@ember/controller';
import { BoardRouteModel } from 'potber/routes/board';

export default class ThreadController extends Controller {
  declare model: BoardRouteModel;

  queryParams = ['BID', 'page'];

  get pageTitle() {
    return `${this.model.board.name} [${this.model.page}]`;
  }

  get threads() {
    return this.model.board.page?.threads || [];
  }
}
