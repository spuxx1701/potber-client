import Component from '@glimmer/component';

interface Signature {
  Args: {
    size: 'small' | 'large';
  };
}

export default class AvatarComponent extends Component<Signature> {
  get size() {
    return this.args.size || 'small';
  }
}
