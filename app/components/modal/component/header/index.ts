import Component from '@glimmer/component';

interface Signature {
  Args: {
    title: string;
    icon?: string;
    prefix?: string;
    variant?: ModalVariant;
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

  get variant() {
    return this.args.variant || 'default';
  }
}
