import Controller from '@ember/controller';
import { service } from '@ember/service';
import { ThreadRouteModel } from 'potber-client/routes/authenticated/thread';
import SettingsService from 'potber-client/services/settings';
import ThreadStore from 'potber-client/services/stores/thread';

export default class ThreadController extends Controller {
  @service('stores/thread' as any) declare threadStore: ThreadStore;
  @service declare settings: SettingsService;
  declare model: ThreadRouteModel;

  queryParams = ['TID', 'page', 'PID', 'lastReadPost', 'position', 'feed'];
  TID = '';
  page = '';
  PID = '';
  lastReadPost = '';
  scrollToBottom = '';
  feed = '';

  get thread() {
    return this.threadStore.thread;
  }

  get currentPage() {
    return this.model.page ?? this.thread?.page?.number;
  }

  get pageTitle() {
    if (this.thread)
      return `${this.thread.title} [${this.currentPage ?? '..'}]`;
  }

  get isError() {
    return this.threadStore.state?.isError;
  }

  get isFeed() {
    return this.feed === 'true';
  }
}
