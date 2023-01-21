import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

interface Signature {
  Args: {
    title?: string;
    size?: ControlSize;
  };
}

export default class CommonInputComponent extends Component<Signature> {
  declare args: Signature['Args'];
  componentId = 'input-' + guidFor(this);

  get size() {
    return this.args.size || 'medium';
  }
}
