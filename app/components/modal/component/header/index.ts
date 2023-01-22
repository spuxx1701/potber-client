import Component from '@glimmer/component';

interface Signature {
  Args: {
    title: string;
    icon?: string;
    prefix?: string;
    type?: 'default' | 'success' | 'warning' | 'error';
  };
}

export default class InputModalComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get icon() {
    return this.args.icon || 'info-circle';
  }

  get prefix() {
    return this.args.prefix || 'fas';
  }

  get type() {
    return this.args.type || 'default';
  }
}
