import Component from '@glimmer/component';
import ENV from 'potber-client/config/environment';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import { service } from '@ember/service';
import RendererService from 'potber-client/services/renderer';
import ModalService from 'potber-client/services/modal';
import RouterService from '@ember/routing/router-service';
import Thread from 'potber-client/models/thread';

export interface Signature {
  Args: {
    thread: Thread;
  };
}

export default class NavRoutesThreadComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  @service declare modal: ModalService;
  @service declare router: RouterService;
  @service declare session: any;
  declare args: Signature['Args'];

  get subtitle() {
    return `Seite ${this.currentPage} von ${this.args.thread.pagesCount}`;
  }

  get nextPageVisible() {
    return this.currentPage < this.args.thread.pagesCount;
  }

  get currentPage() {
    return this.args.thread.page?.number || 1;
  }

  get nextPage() {
    return this.currentPage + 1;
  }

  get previousPageVisible() {
    return this.currentPage > 1;
  }

  get previousPage() {
    return this.currentPage - 1;
  }

  get originalUrl() {
    return `${ENV.APP['FORUM_URL']}thread.php?TID=${this.args.thread.id}`;
  }

  get authenticated() {
    return this.session.isAuthenticated;
  }

  @action async reload() {
    this.renderer.preventNextScrollReset();
    this.renderer.showLoadingIndicator();
    (getOwner(this as unknown) as any)
      .lookup('route:authenticated.thread')
      .refresh()
      .finally(() => {
        this.renderer.hideLoadingIndicator();
        this.renderer.waitAndScrollToBottom();
      });
  }

  @action handleGoToPage() {
    this.modal.input({
      title: 'Gehe zu Seite...',
      text: `Gib eine Seite zwischen 1 und ${this.args.thread.pagesCount} ein.`,
      icon: 'arrow-right',
      label: `Seite`,
      type: 'number',
      minLength: 1,
      maxLength: 5,
      min: 1,
      max: this.args.thread.pagesCount,
      submitLabel: 'Los',
      onSubmit: (value) => {
        this.router.transitionTo('authenticated.thread', {
          queryParams: {
            TID: this.args.thread.id,
            page: value,
          },
        });
        this.modal.close();
      },
    });
  }
}
