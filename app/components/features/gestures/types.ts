import TinyGesture, { Events, Options } from 'tinygesture';

export interface GestureEvent {
  type: keyof Events;
  gesture: TinyGesture;
  nativeEvent: MouseEvent | TouchEvent;
}

export interface Gesture {
  type: keyof Events;
  // eslint-disable-next-line no-unused-vars
  onGesture: (event: GestureEvent) => void;
}

export type GestureOptions = Partial<Options>;
