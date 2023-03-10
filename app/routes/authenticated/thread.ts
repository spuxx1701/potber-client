import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { sleep } from 'potber-client/utils/misc';
import RSVP, { reject } from 'rsvp';
import ThreadController from 'potber-client/controllers/authenticated/thread';
import Thread from 'potber-client/models/thread';
import CustomStore from 'potber-client/services/custom-store';
import NewsfeedService from 'potber-client/services/newsfeed';

interface Params {
  TID: string;
  PID?: string;
  page?: string;
  subtleUntilPostId?: string;
  scrollToBottom?: string;
}

export interface ThreadRouteModel {
  thread: Thread;
  subtleUntilPostId: string;
}

export default class ThreadRoute extends Route {
  @service declare store: CustomStore;
  @service declare newsfeed: NewsfeedService;

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
    controller.set('scrollToBottom', '');
  }

  async model(params: Params) {
    try {
      // Attempt to parse the page
      let page: number | undefined;
      let postId = params.PID;
      let subtleUntilPostId = params.subtleUntilPostId;
      if (params.page) {
        page = parseInt(params.page) || 1;
        // If page is supplied, ignore post ID to prevent conflicts
        postId = undefined;
        subtleUntilPostId = undefined;
      }
      const thread = await this.store.findRecord('thread', params.TID, {
        adapterOptions: {
          queryParams: {
            postId,
            page,
            updateBookmark: true,
          },
        },
      });
      return RSVP.hash({
        thread,
        subtleUntilPostId: subtleUntilPostId,
      } as ThreadRouteModel);
    } catch (error: any) {
      if (error.message === 'not-found') {
        return null;
      } else {
        return reject(error);
      }
    }
  }

  async afterModel() {
    // Refresh bookmarks after the model hook has resolved since the current transition might
    // have impacted those.
    this.newsfeed.refreshBookmarks();
  }
}
