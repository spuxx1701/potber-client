import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'potber-client/services/renderer';

export default class UpdateScrollPositionComponent extends Component {
  @service declare renderer: RendererService;
  @service declare router: any;

  elementId = guidFor(this);

  @action updateScrollPosition() {
    // Read URL parameters
    const params = new URLSearchParams(window.location.search);
    if (
      params.has('PID') &&
      this.router.currentRouteName === 'authenticated.thread'
    ) {
      // If a PID has been provided and we're on /thread, we
      // need to scroll to the corresponding post
      const anchorId = `post-${params.get('PID')}`;
      const anchorElement = document.getElementById(anchorId);
      if (anchorElement) {
        const currentScrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        const rect = anchorElement.getBoundingClientRect();
        const topNavHeight = (document.getElementById('top-nav') as HTMLElement)
          .clientHeight;
        this.renderer.trySetScrollPosition({
          top: currentScrollTop + rect.top - topNavHeight,
          behavior: 'smooth',
        });
      }
    } else if (params.has('scrollToBottom')) {
      // If 'scrollToBottom' to bottom has been provided, scroll to bottom
      this.renderer.trySetScrollPosition({
        top: document.body.scrollHeight,
        behavior: 'auto',
      });
    } else {
      // By default, rscroll to top
      this.renderer.trySetScrollPosition({
        behavior: 'auto',
      });
    }
  }

  <template>
    <span
      id={{this.elementId}}
      class='hidden'
      {{didInsert this.updateScrollPosition}}
    />
  </template>
}
