import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Threads } from 'potber-client/services/api/types';
import DeviceManagerService from 'potber-client/services/device-manager';
import RendererService from 'potber-client/services/renderer';
import SettingsService, { Gestures } from 'potber-client/services/settings';
import ThreadStore from 'potber-client/services/stores/thread';

interface Signature {
  Args: {
    thread: Threads.Read | null;
    page: Threads.Page | null;
    lastReadPost?: string;
    loading?: boolean;
  };
}

export default class ThreadPage extends Component<Signature> {
  @service declare deviceManager: DeviceManagerService;
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;
  @service('stores/thread') declare threadStore: ThreadStore;

  get isDesktop() {
    return this.deviceManager.isDesktop;
  }

  get thread() {
    return this.args.thread;
  }

  get posts() {
    return this.args.page?.posts;
  }

  get disableOverscroll() {
    return (
      this.settings.getSetting('gestures') === Gestures.none ||
      this.settings.getSetting('gestures') === Gestures.onlySidebar
    );
  }

  handleOverscroll = () => {
    this.renderer.preventNextScrollReset();
    this.renderer.showLoadingIndicator();
    this.threadStore.reload()?.finally(() => {
      this.renderer.hideLoadingIndicator();
      this.renderer.waitAndScrollToBottom();
    });
  };
}
