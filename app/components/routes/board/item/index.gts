import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import RendererService from 'potber-client/services/renderer';
import SettingsService from 'potber-client/services/settings';
import BookmarkStore from 'potber-client/services/stores/bookmark';
import ButtonLink from 'potber-client/components/common/button-link';
import BoardIcon from 'potber-client/components/board/icon';
import classNames from 'potber-client/helpers/class-names';
import styles from './styles.module.css';
import { Posts, Threads } from 'potber-client/services/api/types';

export interface Signature {
  Args: {
    thread: Threads.Read;
  };
}

export default class BoardItem extends Component<Signature> {
  @service declare renderer: RendererService;
  @service declare settings: SettingsService;
  @service('stores/bookmark') declare bookmarkStore: BookmarkStore;

  styles = styles;

  get hideThread() {
    return (
      (this.args.thread.isAnnouncement || this.args.thread.isGlobal) &&
      this.settings.getSetting('hideGlobalAndAnnouncementThreads')
    );
  }

  get isImportant() {
    return (
      this.args.thread.isAnnouncement ||
      this.args.thread.isGlobal ||
      this.args.thread.isImportant ||
      this.args.thread.isSticky
    );
  }

  get bookmark() {
    return this.bookmarkStore.all?.find(
      (bookmark) => bookmark.thread?.id === this.args.thread.id,
    );
  }

  get unread() {
    return (
      this.bookmarkStore.unread?.find(
        (bookmark) => bookmark.thread?.id === this.args.thread.id,
      ) ?? false
    );
  }

  get icon() {
    return this.args.thread.firstPost?.icon || undefined;
  }

  get subtitle() {
    return this.args.thread.subtitle || '';
  }

  get pagesLabel() {
    if (this.args.thread.pagesCount > 1) {
      return `${this.args.thread.pagesCount} Seiten`;
    } else if (this.args.thread.pagesCount === 1) {
      return '1 Seite';
    } else return undefined;
  }

  get lastPostLabel() {
    let post: Posts.Preview;
    const { lastPost, firstPost } = this.args.thread;
    if (lastPost) {
      post = lastPost;
    } else if (firstPost) {
      post = firstPost;
    } else return undefined;
    return htmlSafe(
      `<b>${post.author.name}</b> am ${new Date(post.date).toLocaleString()}`,
    );
  }

  <template>
    {{#unless this.hideThread}}
      <ButtonLink
        class={{classNames
          this
          'item'
          (if this.isImportant 'important' '')
          (if this.unread 'unread' '')
        }}
        @route='authenticated.thread'
        @query={{hash
          TID=@thread.id
          page=@thread.pagesCount
          position='bottom'
          PID=undefined
          lastReadPost=undefined
        }}
      >
        <div class={{classNames this 'header'}}>
          <div class='title'>
            {{#if this.bookmark}}
              <FaIcon @icon='bookmark' />
            {{/if}}
            {{#if this.icon}}
              <BoardIcon @icon={{this.icon}} />
            {{/if}}
            <p>{{@thread.title}}</p>
          </div>
          <div class={{classNames this 'flags'}}>
            {{#if @thread.isAnnouncement}}
              <FaIcon @icon='bullhorn' />
            {{/if}}
            {{#if @thread.isImportant}}
              <FaIcon @icon='circle-exclamation' />
            {{/if}}
            {{#if @thread.isSticky}}
              <FaIcon @icon='thumbtack' />
            {{/if}}
            {{#if @thread.isGlobal}}
              <FaIcon @icon='globe' />
            {{/if}}
            {{#if @thread.isClosed}}
              <FaIcon @icon='lock' />
            {{/if}}
          </div>
        </div>
        {{#if @thread.subtitle}}
          <p class='subtitle'>{{@thread.subtitle}}</p>
        {{/if}}
        <div class={{classNames this 'activity-details'}}>
          <p class='subtitle'>
            {{this.lastPostLabel}}
          </p>
          <p class='subtitle'>
            {{this.pagesLabel}}
          </p>
        </div>
      </ButtonLink>
    {{/unless}}
  </template>
}
