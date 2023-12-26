import { service } from '@ember/service';
import { reject } from 'rsvp';
import ThreadController from 'potber-client/controllers/authenticated/thread';
import CustomStore from 'potber-client/services/custom-store';
import NewsfeedService from 'potber-client/services/newsfeed';
import ApiService from 'potber-client/services/api';
import { State, trackedFunction } from 'ember-resources/util/function';
import { Threads } from 'potber-client/services/api/types';
import Route from '@ember/routing/route';
import SettingsService from 'potber-client/services/settings';
import RendererService from 'potber-client/services/renderer';

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
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;

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
      // Make sure to cache the thread on the controller so we always have access the latest state
      threadResource.promise.then((thread) => {
        // eslint-disable-next-line ember/no-controller-access-in-routes
        this.controllerFor('authenticated.thread').set('cache', thread);
      });
      // In case the user wants transitions to be dynamic, we need to await the promise and show a loading indicator
      if (this.settings.getSetting('transitions') === 'static') {
        this.renderer.showLoadingIndicator();
        await threadResource.promise;
        this.renderer.hideLoadingIndicator();
      }
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
