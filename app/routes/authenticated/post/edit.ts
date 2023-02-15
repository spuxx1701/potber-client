import { action } from '@ember/object';
import Route from '@ember/routing/route';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import Post from 'potber-client/models/post';
import CustomStore from 'potber-client/services/custom-store';
import MessagesService from 'potber-client/services/messages';
import RendererService from 'potber-client/services/renderer';

interface Params {
  TID: string;
  PID: string;
}

export interface PostEditRouteModel {
  threadId: string;
  post: Post;
}

export default class PostEditRoute extends Route {
  @service declare renderer: RendererService;
  @service declare messages: MessagesService;
  @service declare store: CustomStore;

  // We need to tell the route to refresh the model after the query parameters have changed
  queryParams = {
    TID: {
      refreshModel: true,
    },
    PID: {
      refreshModel: true,
    },
  };

  async model(params: Params, transition: Transition<unknown>) {
    try {
      const post = await this.store.findRecord('post', params.PID, {
        adapterOptions: {
          queryParams: {
            threadId: params.TID,
          },
        },
      });
      return post;
    } catch (error) {
      this.messages.logErrorAndNotify(
        'Da ist etwas schiefgegangen. Bitte versuche es nochmal.',
        error,
        this.constructor.name
      );
      transition.abort();
    }
  }

  @action didTransition() {
    this.renderer.tryResetScrollPosition();
  }
}
