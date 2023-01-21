import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { set } from '@ember/object';
import ApiService from 'potber/services/api';
import MessagesService from 'potber/services/messages';
import SessionService from 'potber/services/session';
import { sleep } from 'potber/utils/misc';

export default class IndexRoute extends Route {
  @service declare router: RouterService;
  @service declare session: SessionService;
  @service declare messages: MessagesService;
  @service declare api: ApiService;

  async beforeModel() {
    if (!this.session.authenticated) {
      this.messages.showNotification(
        'Du bist nicht angemeldet. Tippe hier, um Dich anzumelden.',
        'info',
        {
          callback: (notification: any) => {
            this.router.transitionTo('login');
            this.messages.removeNotification(notification);
          },
        }
      );
    }
  }

  async model() {
    return await this.api.getBoardCategories();
  }
}
