import Controller from '@ember/controller';
import { service } from '@ember/service';
import { ThreadRouteModel } from 'potber-client/routes/authenticated/thread';
import SettingsService from 'potber-client/services/settings';
import ThreadStore from 'potber-client/services/stores/thread';

export default class ThreadController extends Controller {
  @service('stores/thread' as any) declare threadStore: ThreadStore;
  @service declare settings: SettingsService;
  declare model: ThreadRouteModel;

  queryParams = ['TID', 'page', 'PID', 'lastReadPost', 'scrollToBottom'];
  TID = '';
  page = '';
  PID = '';
  lastReadPost = '';
  scrollToBottom = '';

  get showSkeletonPage() {
    return (
      this.settings.getSetting('transitions') === 'dynamic' &&
      this.threadStore.currentThreadState?.isLoading &&
      !this.threadStore.isReloading
    );
  }

  get currentOrPreviousThread() {
    return this.threadStore.currentThread ?? this.threadStore.previousThread;
  }

  get currentPage() {
    return this.model.page ?? this.currentOrPreviousThread?.page?.number;
  }

  get pageTitle() {
    if (this.currentOrPreviousThread)
      return `${this.currentOrPreviousThread.title} [${
        this.currentPage ?? '..'
      }]`;
  }

  get isError() {
    return this.threadStore.currentThreadState?.isError;
  }
}
