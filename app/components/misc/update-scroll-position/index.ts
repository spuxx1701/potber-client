import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'potber-client/services/renderer';
import { sleep } from 'potber-client/utils/misc';

export default class UpdateScrollPositionComponent extends Component {
  @service declare renderer: RendererService;

  elementId = guidFor(this);

  @action updateScrollPosition() {
    // Read URL parameters
    const params = new URLSearchParams(window.location.search);
    if (params.has('PID')) {
      const anchorId = `post-${params.get('PID')}`;
      // If a PID has been provided, we're likely in a thread context and
      // need to scroll to the corresponding post
      const anchorElement = document.getElementById(anchorId);
      if (anchorElement) {
        const rect = anchorElement.getBoundingClientRect();
        const topNavHeight = (document.getElementById('top-nav') as HTMLElement)
          .clientHeight;
        this.renderer.trySetScrollPosition({
          top: rect.top - topNavHeight,
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
}
