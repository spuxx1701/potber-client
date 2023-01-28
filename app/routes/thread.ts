import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { Thread } from 'potber/services/api/types/thread';
import LocalStorageService from 'potber/services/local-storage';
import RendererService from 'potber/services/renderer';
import { sleep } from 'potber/utils/misc';
import RSVP, { reject } from 'rsvp';
import { scrollToHash } from 'ember-url-hash-polyfill';
import ThreadsService from 'potber/services/threads';

interface Params {
  TID: string;
  PID?: string;
  page?: string;
}

export interface ThreadRouteModel {
  thread: Thread;
  page: number;
  avatarStyle: string;
}

export default class ThreadRoute extends Route {
  @service declare localStorage: LocalStorageService;
  @service declare threads: ThreadsService;
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

  async model(params: Params) {
    try {
      // Attempt to parse the page
      let page: number | undefined;
      if (params.page) page = parseInt(params.page) || 1;
      const thread = await this.threads.getThread(params.TID, {
        postId: params.PID,
        page,
      });
      this.renderer.tryResetScrollPosition();
      return RSVP.hash({
        thread,
        page: thread.page?.pageNumber || page,
        avatarStyle: this.localStorage.avatarStyle,
      } as ThreadRouteModel);
    } catch (error: any) {
      if (error.message === 'not-found') {
        return null;
      } else {
        return reject(error);
      }
    }
  }

  @action async didTransition() {
    await sleep(250);
    // If PID was supplied, we also need to add the anchor
    const params = new URL(window.location.href).searchParams;
    if (params.has('PID')) {
      // Set the hash without triggering without triggering a browser scroll action
      const currentState = { ...history.state };
      history.replaceState(
        currentState,
        'unused',
        `#reply_${params.get('PID')}`
      );
    }
    if (window.location.hash) {
      scrollToHash(`reply_${params.get('PID')}`);
    }
  }
}
