import Controller from '@ember/controller';
import { ThreadRouteModel } from 'potber/routes/thread';

export default class ThreadController extends Controller {
  declare model: ThreadRouteModel;

  queryParams = ['TID', 'page'];

  get pageTitle() {
    return `${this.model.thread.title} [${this.model.currentPage}]`;
  }

  get threads() {
    return this.model.thread.page?.posts || [];
  }
}
