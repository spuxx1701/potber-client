import Component from '@glimmer/component';

interface Signature {
  Args: {
    title?: string;
    size?: 'small' | 'medium' | 'large' | 'max';
  };
}

export default class CommonContainerComponent extends Component<Signature> {
  declare args: Signature['Args'];
  get size() {
    return this.args.size || 'medium';
  }
}
