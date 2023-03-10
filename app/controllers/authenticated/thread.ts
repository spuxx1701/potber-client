import Controller from '@ember/controller';
import { ThreadRouteModel } from 'potber-client/routes/authenticated/thread';

export default class ThreadController extends Controller {
  declare model: ThreadRouteModel;

  queryParams = ['TID', 'page', 'PID', 'subtleUntilPostId', 'scrollToBottom'];
  TID = '';
  page = '';
  PID = '';
  subtleUntilPostId = '';
  scrollToBottom = '';

  get pageTitle() {
    return `${this.model.thread.title} [${this.model.thread.page?.number}]`;
  }

  get threads() {
    return this.model.thread.page?.posts || [];
  }
}
