import Controller from '@ember/controller';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { WritableThread } from 'potber-client/services/api/models/thread';

export default class CreateThreadController extends Controller {
  @service declare router: RouterService;

  handleSubmit = async (thread: WritableThread) => {
    try {
      const createdThread = await thread.save();
      this.router.transitionTo('authenticated.thread', {
        queryParams: {
          TID: createdThread.id,
        },
      });
    } catch (error) {
      // Errors have already been handled, so do nothing and allow the user to try again
    }
  };
}
