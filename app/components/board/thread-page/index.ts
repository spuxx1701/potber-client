import { getOwner } from '@ember/application';
import { service } from '@ember/service';
import { Owner } from '@ember/test-helpers/build-owner';
import Component from '@glimmer/component';
import Thread, { ThreadPage } from 'potber-client/models/thread';
import ThreadRoute from 'potber-client/routes/authenticated/thread';
import RendererService from 'potber-client/services/renderer';
import SettingsService, { Gestures } from 'potber-client/services/settings';

interface Signature {
  Args: {
    thread: Thread;
    reverseOrder?: boolean;
    lastReadPost?: string;
  };
}

export default class ThreadPageComponent extends Component<Signature> {
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;

  get page() {
    return this.args.thread.page as ThreadPage;
  }

  get posts() {
    if (this.args.reverseOrder) {
      return this.page.posts.reverse();
    } else {
      return this.page.posts;
    }
  }

  get disableOverscroll() {
    return (
      this.settings.getSetting('gestures') === Gestures.none ||
      this.settings.getSetting('gestures') === Gestures.onlySidebar
    );
  }

  handleOverscroll = () => {
    const route = (getOwner(this) as Owner).lookup(
      'route:authenticated.thread',
    ) as ThreadRoute;
    this.renderer.preventNextScrollReset();
    this.renderer.showLoadingIndicator();
    route.refresh().finally(() => {
      this.renderer.hideLoadingIndicator();
      this.renderer.waitAndScrollToBottom();
    });
  };
}
