import Component from '@glimmer/component';
import { service } from '@ember/service';
import { guidFor } from '@ember/object/internals';
import RendererService from 'potber-client/services/renderer';
import {
  Gesture,
  GestureEvent,
  GestureOptions,
} from 'potber-client/components/features/gestures/types';
import GesturesContainer from '../container';
import OverscrollIndicator from './indicator';
import { debounce } from 'potber-client/utils/misc';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    /**
     * The direction of the overscroll.
     */
    direction: 'up' | 'down';
    /**
     * The callback function.
     */
    onOverscroll: () => void;
    /**
     * The container that should support overscrolling. Can be an `HTMLElement` or an element's id. If left emtpty, `document.documentElement` will be used.
     */
    scrollContainer?: HTMLElement | string;
    /**
     * Optional id for the container. If none is provided, an id will be randomly generated.
     */
    id?: string;
    /**
     * The delay in miliseconds until the container will bounce back. Defaults to 1000 miliseconds.
     */
    delay?: number;
    /**
     * The scroll threshold that needs to be reached before an overscroll is being considered. Defaults to `0.99`.
     */
    threshold?: number;
    /**
     * Optional `GestureOptions`.
     */
    options?: GestureOptions;
  };
  Blocks: {
    default: [];
  };
}

export default class OverscrollContainer extends Component<Signature> {
  @service declare renderer: RendererService;

  get id() {
    return this.args.id ?? `${guidFor(this)}`;
  }

  get scrollContainer() {
    if (!this.args.scrollContainer)
      // return document.getElementById('page-content') as HTMLElement;
      return document.documentElement;
    else if (typeof this.args.scrollContainer === 'string')
      return document.getElementById(this.args.scrollContainer) as HTMLElement;
    else return this.args.scrollContainer;
  }

  get scrollContainerContentHeight() {
    let height = 0;
    for (const child of this.scrollContainer.children) {
      height += child.clientHeight;
    }
    return height;
  }

  get gesturesContainerId() {
    return this.args.id ?? `${this.id}-overscroll-container`;
  }

  get indicatorId() {
    return `${this.id}-overscroll-indicator`;
  }

  get indicatorHeight() {
    return parseInt(
      this.renderer
        .getStyleVariable('--control-default-height')
        .replaceAll(/\D/g, ''),
    );
  }

  get delay(): number {
    return this.args.delay ?? 1000;
  }

  get threshold() {
    if (
      typeof this.args.threshold !== 'number' ||
      this.args.threshold < 0 ||
      this.args.threshold > 1
    )
      return 0.99;
    else return this.args.threshold;
  }

  get indicator() {
    return document.getElementById(this.indicatorId) as HTMLElement;
  }

  get gestures(): Gesture[] {
    return [
      {
        type: this.args.direction === 'down' ? 'swipedown' : 'swipeup',
        onGesture: this.handleSwipe,
      },
    ];
  }

  handleSwipe = ({ type }: GestureEvent) => {
    const { scrollTop, scrollHeight } = this.scrollContainer;
    const contentHeight = this.scrollContainerContentHeight;
    if (
      type === 'swipedown' &&
      scrollTop <= (1 - this.threshold) * scrollHeight
    ) {
      this.showIndicator();
      this.args.onOverscroll();
    } else if (
      type === 'swipeup' &&
      scrollTop + contentHeight >= this.threshold * scrollHeight
    ) {
      this.showIndicator();
      this.args.onOverscroll();
    }
  };

  showIndicator = () => {
    this.indicator.style.height = 'var(--control-default-height)';
    const debouncedHideIndicator = debounce(this.hideIndicator, this.delay);
    debouncedHideIndicator();
  };

  hideIndicator = () => {
    this.indicator.style.height = '0px';
  };

  <template>
    <GesturesContainer
      @id={{this.gesturesContainerId}}
      @gestures={{this.gestures}}
    >
      <OverscrollIndicator id={{this.indicatorId}} @direction={{@direction}} />
      {{yield}}
    </GesturesContainer>
  </template>
}
