import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Post from 'potber-client/models/post';
import { PostEditRouteModel } from 'potber-client/routes/authenticated/post/edit';
import CustomStore from 'potber-client/services/custom-store';
import MessagesService from 'potber-client/services/messages';

export default class PostCreateController extends Controller {
  declare model: PostEditRouteModel;

  @service declare store: CustomStore;
  @service declare router: RouterService;
  @service declare messages: MessagesService;
  @tracked busy = false;

  queryParams = ['TID', 'PID'];

  @action async handleSubmit(post: Post) {
    this.busy = true;
    try {
      await post.save();
      this.messages.showNotification('Antwort wurde bearbeitet.', 'success');
      this.router.transitionTo('authenticated.thread', {
        queryParams: {
          TID: post.threadId,
          PID: post.id,
        },
      });
    } catch (error) {
      this.messages.logErrorAndNotify(
        'Da ist leider etwas schiefgegangen. Probiere es nochmal.',
        error,
        this.constructor.name
      );
    }
    this.busy = false;
  }
}
