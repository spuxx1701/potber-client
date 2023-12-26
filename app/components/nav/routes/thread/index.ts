import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { service } from '@ember/service';
import RendererService from 'potber-client/services/renderer';
import ModalService from 'potber-client/services/modal';
import RouterService from '@ember/routing/router-service';
import CustomSession from 'potber-client/services/custom-session';
import { appConfig } from 'potber-client/config/app.config';
import MessagesService from 'potber-client/services/messages';
import ApiService from 'potber-client/services/api';
import { IntlService } from 'ember-intl';
import { trackedFunction } from 'ember-resources/util/function';
import { ThreadResource } from 'potber-client/routes/authenticated/thread';

export interface Signature {
  Args: {
    threadId: string;
    threadResource: ThreadResource;
  };
}

export default class NavRoutesThreadComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  @service declare modal: ModalService;
  @service declare router: RouterService;
  @service declare session: CustomSession;
  @service declare messages: MessagesService;
  @service declare api: ApiService;
  @service declare intl: IntlService;
  declare args: Signature['Args'];

  get thread() {
    return this.args.threadResource.value;
  }

  get title() {
    return this.thread?.title;
  }

  get subtitle() {
    return `Seite ${this.currentPage} von ${this.thread?.pagesCount}`;
  }

  get nextPageVisible() {
    return this.thread && this.currentPage < this.thread.pagesCount;
  }

  get currentPage() {
    return this.thread?.page?.number ?? 1;
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

  get lastPage() {
    return this.thread?.pagesCount;
  }

  get originalUrl() {
    return `${appConfig.forumUrl}thread.php?TID=${this.thread?.id}`;
  }

  get authenticated() {
    return this.session.isAuthenticated;
  }

  bookmarkResource = trackedFunction(this, () =>
    this.api.findBookmarkByThreadId(this.args.threadId),
  );

  get bookmark() {
    return this.bookmarkResource.value && !this.bookmarkResource.value.isDeleted
      ? this.bookmarkResource.value
      : undefined;
  }

  deleteBookmark = async () => {
    if (!this.bookmark) return;
    await this.bookmark.delete();
    this.messages.showNotification(
      this.intl.t('route.thread.delete-bookmark-success'),
      'success',
    );
  };

  reload = async () => {
    this.renderer.preventNextScrollReset();
    this.renderer.showLoadingIndicator();
    (getOwner(this as unknown) as any)
      .lookup('route:authenticated.thread')
      .refresh()
      .finally(() => {
        this.renderer.hideLoadingIndicator();
        this.renderer.waitAndScrollToBottom();
      });
  };

  handleGoToPage = () => {
    this.modal.input({
      title: 'Gehe zu Seite...',
      text: `Gib eine Seite zwischen 1 und ${this.thread?.pagesCount} ein.`,
      icon: 'arrow-right',
      label: `Seite`,
      type: 'number',
      minLength: 1,
      maxLength: 5,
      min: 1,
      max: this.thread?.pagesCount,
      submitLabel: 'Los',
      onSubmit: (value) => {
        this.router.transitionTo('authenticated.thread', {
          queryParams: {
            TID: this.args.threadId,
            page: value,
          },
        });
        this.modal.close();
      },
    });
  };

  handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  handleGoToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };
}
