import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { PostFormContent } from 'potber/components/board/post-form';
import { PostEditRouteModel } from 'potber/routes/authenticated/post/edit';
import MessagesService from 'potber/services/messages';
import PostsService from 'potber/services/posts';

export default class PostCreateController extends Controller {
  declare model: PostEditRouteModel;

  @service declare posts: PostsService;
  @service declare router: RouterService;
  @service declare messages: MessagesService;
  @tracked busy = false;

  queryParams = ['TID', 'PID'];

  @action async handleSubmit(post: PostFormContent) {
    this.busy = true;
    const success = await this.posts.editPost(post);
    this.busy = false;
    if (success) {
      this.messages.showNotification('Antwort wurde bearbeitet.', 'success');
      this.router.transitionTo('thread', {
        queryParams: {
          TID: this.model.threadId,
          PID: post.id,
        },
      });
    }
  }
}
