import { State } from 'ember-resources/util/function';

export type TrackedState<T> = State<Promise<T>>;
