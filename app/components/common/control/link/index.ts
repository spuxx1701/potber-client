import { action } from '@ember/object';
import Component from '@glimmer/component';

export interface Signature {
  Args: {
    route: string;
    query?: object;
  };
}

export default class CommonControlLinkComponent extends Component<Signature> {
  declare args: Signature['Args'];

  @action handleClick() {
    console.log('click');
  }

  get query() {
    return this.args.query || {};
  }
}
