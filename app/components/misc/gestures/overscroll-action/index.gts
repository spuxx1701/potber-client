import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import Component from '@glimmer/component';
import { service } from '@ember/service';
import RendererService from 'potber-client/services/renderer';
import {
  Gesture,
  GestureEvent,
  GestureOptions,
} from 'potber-client/components/misc/gestures/types';
import GesturePane from '../pane';
import { debounce } from 'potber-client/utils/misc';

interface Signature {
  Args: {
    /**
     * The overscroll indicator that'll be used to indicate the overscrolling.
     */
    indicator: HTMLElement | string;
    /**
     * The direction of the overscroll.
     */
    direction: 'up' | 'down';
    onOverscroll: () => void;
    /**
     * The delay in miliseconds until the container will bounce back. Defaults to 500.
     */
    delay?: number;
    /**
     * The maximum overscroll in pixels. Defaults to the default control height.
     */
    maxOverscroll?: number;
    /**
     * Other gestures the pane should support.
     */
    gestures?: Array<Gesture>;
    /**
     * Optional other gestures the pane should support.
     */
    options?: GestureOptions;
  };
}

export default class OverscrollGestureAction extends Component<Signature> {
  @service declare renderer: RendererService;

  distanceThreshold = 50;

  get delay(): number {
    return this.args.delay ?? 500;
  }

  get maxOverscroll(): number {
    if (this.args.maxOverscroll) return this.args.maxOverscroll;
    const defaultControlHeight = parseInt(
      this.renderer
        .getStyleVariable('--control-default-height')
        .replaceAll(/\D/g, ''),
    );
    return defaultControlHeight;
  }

  get indicator() {
    if (typeof this.args.indicator === 'string')
      return document.getElementById(this.args.indicator) as HTMLElement;
    else return this.args.indicator;
  }

  handlePan = async ({ gesture }: GestureEvent) => {
    const { velocityY, touchMoveY } = gesture;
    if (!velocityY || !touchMoveY || touchMoveY < this.distanceThreshold)
      return;
    const overscroll = Math.min(
      Math.abs(touchMoveY - this.distanceThreshold),
      this.maxOverscroll,
    );
    const newHeight = `${overscroll}px`;
    this.indicator.style.height = newHeight;
    const debouncedBounceBack = debounce(this.bounceBack, 1000);
    debouncedBounceBack();
    if (overscroll >= this.maxOverscroll) {
      this.args.onOverscroll();
    }
  };

  bounceBack = () => {
    this.indicator.style.height = '0px';
  };

  gestures: Gesture[] = [
    {
      type: `panmove`,
      onGesture: this.handlePan,
    },
    ...(this.args.gestures ? this.args.gestures : []),
  ];

  <template>
    <span class='overscroll-gesture-action'>
      <GesturePane @gestures={{this.gestures}} @options={{@options}} />
    </span>
  </template>
}
