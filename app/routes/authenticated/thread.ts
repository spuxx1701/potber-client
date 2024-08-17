import { reject } from 'rsvp';
import ThreadController from 'potber-client/controllers/authenticated/thread';
import SlowRoute from '../base/slow';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import ThreadStore from 'potber-client/services/stores/thread';
import SettingsService from 'potber-client/services/settings';
import { sleep } from 'potber-client/utils/misc';
import BookmarkStore from 'potber-client/services/stores/bookmark';

interface Params extends Record<string, unknown> {
  TID: string;
  PID?: string;
  page?: string;
  lastReadPost?: string;
  scrollToBottom?: string;
}

export interface ThreadRouteModel {
  threadId: string;
  page?: number;
  postId?: string;
  lastReadPost?: string;
}
export default class ThreadRoute extends SlowRoute {
  @service('stores/thread') declare threadStore: ThreadStore;
  @service('stores/bookmark') declare bookmarkStore: BookmarkStore;
  @service declare settings: SettingsService;

  // We need to tell the route to refresh the model after the query parameters have changed
  queryParams = {
    TID: {
      refreshModel: true,
    },
    PID: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  beforeModel(transition: Transition) {
    if (this.settings.getSetting('transitions') === 'dynamic') return;
    super.beforeModel(transition);
  }

  resetController(controller: ThreadController) {
    // Query parameters are sticky by default, so we need to reset them
    controller.set('TID', '');
    controller.set('page', '');
    controller.set('PID', '');
    controller.set('scrollToBottom', '');
  }

  async model(params: Params, transition: Transition) {
    try {
      // Attempt to parse the page
      let page: number | undefined;
      let postId = params.PID;
      let lastReadPost = params.lastReadPost;
      if (params.page) {
        page = parseInt(params.page) || 1;
        // If page is supplied, ignore post ID to prevent conflicts
        postId = undefined;
        lastReadPost = undefined;
      }
      const options = {
        postId,
        page,
        keepPreviousThread: transition.from?.name === this.routeName,
        timeoutWarning: true,
      };
      if (this.settings.getSetting('transitions') === 'static') {
        await this.threadStore.loadThread(params.TID, options);
      } else {
        this.threadStore.loadThread(params.TID, options);
        // Wait for a very short amount of time so the UI has time to play the ripple animation
        await sleep(100);
      }
      const model: ThreadRouteModel = {
        threadId: params.TID,
        page,
        lastReadPost: lastReadPost,
        postId,
      };
      return model;
    } catch (error: any) {
      return reject(error);
    }
  }

  afterModel() {
    this.bookmarkStore.reload({ delay: 500 });
  }
}
