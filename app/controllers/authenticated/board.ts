import Controller from '@ember/controller';
import { BoardRouteModel } from 'potber-client/routes/authenticated/board';

export default class BoardController extends Controller {
  declare model: BoardRouteModel;

  queryParams = ['BID', 'page'];

  get pageTitle() {
    return `${this.model.board.name} [${this.model.board.page.number}]`;
  }

  get threads() {
    return this.model.board.page?.threads || [];
  }
}
