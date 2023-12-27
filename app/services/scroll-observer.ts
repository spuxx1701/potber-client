import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export interface ScrollPosition {
  x: number;
  y: number;
  xMax: number;
  yMax: number;
}

/**
 * `ScrollObserverService` provides access to scroll events on the viewport.
 */
export default class ScrollObserverService extends Service {
  /**
   * You may subscribe this property to get notified of changes of the scroll position.
   */
  @tracked scrollPosition: ScrollPosition = this.getScrollPosition();

  constructor(properties?: object | undefined) {
    super(properties);
    addEventListener('scroll', this.handleScroll);
  }

  /**
   * Handles scroll events and stores the last event on the
   * tracked `scrollEvent` property. You may subscribe to that
   * property if you'd like to be notified of scroll changes.
   * @param event The scroll event.
   */
  handleScroll = () => {
    this.scrollPosition = this.getScrollPosition();
  };

  getScrollPosition(): ScrollPosition {
    return {
      x: window.scrollX,
      y: window.scrollY,
      xMax: document.body.scrollWidth - window.innerWidth,
      yMax: document.body.scrollHeight - window.innerHeight,
    };
  }
}
