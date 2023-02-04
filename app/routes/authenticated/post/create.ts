import Route from '@ember/routing/route';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import { PostFormContent } from 'potber/components/board/post-form';
import { Thread } from 'potber/services/api/types/thread';
import MessagesService from 'potber/services/messages';
import RendererService from 'potber/services/renderer';
import ThreadsService from 'potber/services/threads';
import RSVP from 'rsvp';

interface Params {
  TID: string;
  page: number;
}

export interface PostCreateRouteModel {
  thread: Thread;
  post: PostFormContent;
}

export default class PostCreateRoute extends Route {
  @service declare renderer: RendererService;
  @service declare messages: MessagesService;
  @service declare threads: ThreadsService;

  async model(params: Params, transition: Transition<unknown>) {
    try {
      // Retrieve the thread with its last page so we can display recent posts and other information about the thread
      const thread = await this.threads.getThread(params.TID, {
        page: params.page,
        updateBookmark: false,
      });
      this.renderer.tryResetScrollPosition();
      return RSVP.hash({
        thread,
        post: {
          title: '',
          message: '',
          icon: '0',
          convertUrls: true,
          disableBbCode: false,
          disableEmojis: false,
        },
      } as PostCreateRouteModel);
    } catch (error) {
      this.messages.showNotification(
        'Da ist etwas schiefgegangen. Bitte versuche es nochmal.',
        'error'
      );
      transition.abort();
    }
  }
}
