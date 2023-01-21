import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface Signature {
  Args: {
    value: string;
    title?: string;
    size?: ControlSize;
    onChange?: (value: string) => void;
  };
}

export default class CommonInputComponent extends Component<Signature> {
  declare args: Signature['Args'];
  componentId = 'input-' + guidFor(this);

  @tracked value = this.args.value;

  get size() {
    return this.args.size || 'medium';
  }

  @action handleChange(event: InputEvent) {
    this.value = (event.target as HTMLInputElement).value;
    if (this.args.onChange) {
      this.args.onChange(this.value);
    }
  }
}
