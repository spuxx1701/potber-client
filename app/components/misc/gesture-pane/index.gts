import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
// ts-ignore
import TinyGesture, { Options, Events } from 'tinygesture';
import { service } from '@ember/service';
import RendererService from 'potber-client/services/renderer';

interface Signature {
  Args: {
    types: Array<keyof Events> | keyof Events;
    onGesture: (
      // eslint-disable-next-line no-unused-vars
      gesture: TinyGesture<HTMLElement>,
      // eslint-disable-next-line no-unused-vars
      event: MouseEvent | TouchEvent,
    ) => void;
    options?: Partial<Options<HTMLElement>>;
  };
}

export default class GesturePaneComponent extends Component<Signature> {
  @service declare renderer: RendererService;

  private componentId = guidFor(this);
  private _gesture: TinyGesture<HTMLElement> | undefined;
  private _listeners: any[] | undefined;

  get gesturePaneId() {
    return `${this.componentId}-gesture-pane`;
  }

  get gesture() {
    if (!this._gesture)
      throw new Error(
        "Attempted to access gesture-pane's gesture reference before it was initialized.",
      );
    return this._gesture;
  }

  get listener() {
    if (!this._listeners)
      throw new Error(
        "Attempted to access gesture-pane's listeners reference before it was initialized.",
      );
    return this._listeners;
  }

  get types() {
    if (!Array.isArray(this.args.types)) return [this.args.types];
    else return this.args.types;
  }

  didInsert = () => {
    const target = document.getElementById(this.gesturePaneId) as HTMLElement;
    this._gesture = new TinyGesture(target, this.args.options);
    this._listeners = [];
    console.log(this.types);
    for (const type of this.types) {
      const listener = this.gesture.on(type, this.handleGesture);
      this._listeners.push(listener);
    }
  };

  handleGesture = (event: MouseEvent | TouchEvent) => {
    this.args.onGesture(this.gesture, event);
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
