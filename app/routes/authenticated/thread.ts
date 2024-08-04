import { reject } from 'rsvp';
import ThreadController from 'potber-client/controllers/authenticated/thread';
import SlowRoute from '../base/slow';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import ThreadStore from 'potber-client/services/stores/thread';
import SettingsService from 'potber-client/services/settings';
import BookmarkStore from 'potber-client/services/stores/bookmark';

interface Params extends Record<string, unknown> {
  TID: string;
  PID?: string;
  page?: string;
  lastReadPost?: string;
  position?: string;
  feed?: string;
}

export interface ThreadRouteModel {
  threadId: string;
  page?: number;
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

  resetController(controller: ThreadController) {
    // Query parameters are sticky by default, so we need to reset them
    controller.set('TID', '');
    controller.set('page', '');
    controller.set('PID', '');
    controller.set('lastReadPost', '');
    controller.set('position', '');
    controller.set('feed', '');
  }

  async model(params: Params) {
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
        timeoutWarning: true,
      };
      await this.threadStore.loadThread(params.TID, options);
      const model: ThreadRouteModel = {
        threadId: params.TID,
        page,
        lastReadPost: lastReadPost,
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
