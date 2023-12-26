import { getOwner } from '@ember/application';
import { service } from '@ember/service';
import { Owner } from '@ember/test-helpers/build-owner';
import Component from '@glimmer/component';
import ThreadRoute, {
  ThreadResource,
} from 'potber-client/routes/authenticated/thread';
import DeviceManagerService from 'potber-client/services/device-manager';
import RendererService from 'potber-client/services/renderer';
import SettingsService, { Gestures } from 'potber-client/services/settings';

interface Signature {
  Args: {
    threadResource: ThreadResource;
    lastReadPost?: string;
  };
}

export default class ThreadPage extends Component<Signature> {
  @service declare deviceManager: DeviceManagerService;
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;

  get isDesktop() {
    return this.deviceManager.isDesktop;
  }

  get isLoading() {
    return this.args.threadResource.isLoading;
  }

  get thread() {
    return this.args.threadResource.value;
  }

  get posts() {
    return this.thread?.page?.posts;
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
