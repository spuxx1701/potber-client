import Controller from '@ember/controller';
import { ThreadRouteModel } from 'potber-client/routes/authenticated/thread';

export default class ThreadController extends Controller {
  declare model: ThreadRouteModel;

  queryParams = ['TID', 'page', 'PID', 'lastReadPost', 'scrollToBottom'];
  TID = '';
  page = '';
  PID = '';
  lastReadPost = '';
  scrollToBottom = '';

  get thread() {
    return this.model.threadResource.value;
  }

  get pageTitle() {
    if (this.thread)
      return `${this.thread.title} [${this.thread.page?.number}]`;
  }

  get posts() {
    if (this.thread) return this.thread.page?.posts || [];
  }
}
