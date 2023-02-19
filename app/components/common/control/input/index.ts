import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

interface Signature {
  Args: {
    value: string;
    label?: string;
    size?: ControlSize;
    required?: boolean;
    selectAllOnFocus?: boolean;
    onChange?: (value: string, event: InputEvent) => void;
  };
}

export default class CommonInputComponent extends Component<Signature> {
  declare args: Signature['Args'];
  componentId = 'input-' + guidFor(this);

  get value() {
    return this.args.value;
  }

  get size() {
    return this.args.size || 'medium';
  }

  get label() {
    return this.args.label;
  }

  @action handleFocus(event: FocusEvent) {
    if (this.args.selectAllOnFocus) {
      const input = event.target as HTMLInputElement;
      input.setSelectionRange(0, input.value.length);
    }
  }

  @action handleChange(event: InputEvent) {
    const value = (event.currentTarget as HTMLInputElement).value;
    if (this.args.onChange) {
      this.args.onChange(value, event);
    }
  }
}
