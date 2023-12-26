import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { ThreadRouteModel } from 'potber-client/routes/authenticated/thread';
import { Threads } from 'potber-client/services/api/types';

export default class ThreadController extends Controller {
  declare model: ThreadRouteModel;
  @tracked cache: Threads.Read | null = null;

  queryParams = ['TID', 'page', 'PID', 'lastReadPost', 'scrollToBottom'];
  TID = '';
  page = '';
  PID = '';
  lastReadPost = '';
  scrollToBottom = '';

  get thread() {
    return this.model.threadResource.value ?? this.cache;
  }

  get pageTitle() {
    if (this.thread)
      return `${this.thread.title} [${this.thread.page?.number}]`;
  }

  get posts() {
    if (this.thread) return this.thread.page?.posts || [];
  }
}
