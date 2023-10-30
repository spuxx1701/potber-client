import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import TinyGesture, { Options } from 'tinygesture';
import { service } from '@ember/service';
import RendererService from 'potber-client/services/renderer';
import { Gesture } from 'potber-client/components/misc/gestures/types';

interface Signature {
  Args: {
    gestures: Array<Gesture> | Gesture;
    options?: Partial<Options<HTMLElement>>;
  };
}

export default class GesturePaneComponent extends Component<Signature> {
  @service declare renderer: RendererService;

  private componentId = guidFor(this);
  private _tinyGesture: TinyGesture<HTMLElement> | undefined;
  private _listeners: any[] | undefined;

  willDestroy() {
    super.willDestroy();
    for (const listener of this.listeners) {
      listener.cancel();
    }
  }

  get gesturePaneId() {
    return `${this.componentId}-gesture-pane`;
  }

  get tinyGesture() {
    if (!this._tinyGesture)
      throw new Error(
        "Attempted to access gesture-pane's TinyGesture reference before it was initialized.",
      );
    return this._tinyGesture;
  }

  get listeners() {
    if (!this._listeners)
      throw new Error(
        "Attempted to access gesture-pane's listeners reference before it was initialized.",
      );
    return this._listeners;
  }

  get gestures(): Array<Gesture> {
    if (!Array.isArray(this.args.gestures)) return [this.args.gestures];
    else return this.args.gestures;
  }

  didInsert = () => {
    const target = document.getElementById(this.gesturePaneId) as HTMLElement;
    this._tinyGesture = new TinyGesture(target, this.args.options);
    this._listeners = [];
    for (const gesture of this.gestures) {
      const listener = this.tinyGesture.on(
        gesture.type,
        (event: MouseEvent | TouchEvent) => {
          gesture.onGesture({
            type: gesture.type,
            gesture: this.tinyGesture,
            nativeEvent: event,
          });
        },
      );
      this._listeners.push(listener);
    }
  };

  <template>
    <span
      id={{this.gesturePaneId}}
      class='gesture-pane'
      aria-hidden='true'
      {{didInsert this.didInsert}}
    >
    </span>
  </template>
}
