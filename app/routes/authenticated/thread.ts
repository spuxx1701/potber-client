import { service } from '@ember/service';
import { reject } from 'rsvp';
import ThreadController from 'potber-client/controllers/authenticated/thread';
import CustomStore from 'potber-client/services/custom-store';
import NewsfeedService from 'potber-client/services/newsfeed';
import ApiService from 'potber-client/services/api';
import { State, trackedFunction } from 'ember-resources/util/function';
import { Threads } from 'potber-client/services/api/types';
import Route from '@ember/routing/route';

interface Params {
  TID: string;
  PID?: string;
  page?: string;
  lastReadPost?: string;
  scrollToBottom?: string;
}

export type ThreadResource = State<Promise<Threads.Read>>;

export interface ThreadRouteModel {
  threadId: string;
  threadResource: ThreadResource;
  lastReadPost: string;
}

export default class ThreadRoute extends Route {
  @service declare store: CustomStore;
  @service declare newsfeed: NewsfeedService;
  @service declare api: ApiService;

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

  model(params: Params) {
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
      const threadResource = trackedFunction(this, () =>
        this.api.findThreadById(params.TID, {
          page,
          postId,
          updateBookmark: true,
        }),
      );
      return {
        threadId: params.TID,
        threadResource,
        lastReadPost: lastReadPost,
      } as ThreadRouteModel;
    } catch (error: any) {
      if (error.message === 'not-found') {
        return null;
      } else {
        return reject(error);
      }
    }
  }

  afterModel() {
    // Refresh bookmarks after the model hook has resolved since the current transition might
    // have impacted those.
    this.newsfeed.refreshBookmarks();
  }
}
