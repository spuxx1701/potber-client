import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { IntlService } from 'ember-intl';
import { PostEditRouteModel } from 'potber-client/routes/authenticated/post/edit';
import ApiService from 'potber-client/services/api';
import { Posts } from 'potber-client/services/api/types';
import MessagesService from 'potber-client/services/messages';

export default class PostCreateController extends Controller {
  declare model: PostEditRouteModel;

  @service declare router: RouterService;
  @service declare messages: MessagesService;
  @service declare api: ApiService;
  @service declare intl: IntlService;
  @tracked busy = false;

  queryParams = ['TID', 'PID'];
  declare TID: string;
  declare PID: string;

  @action async handleSubmit(post: Posts.Write) {
    this.busy = true;
    try {
      const { TID, PID } = this;
      await this.model.post.save({ method: 'PUT' });
      this.router.transitionTo('authenticated.thread', {
        queryParams: {
          TID,
          PID,
        },
      });
      this.messages.showNotification(
        this.intl.t('route.post.edit.success'),
        'success',
      );
    } catch (error) {
      // In case of an error do nothing so the user can try again
    }
    this.busy = false;
  }
}
