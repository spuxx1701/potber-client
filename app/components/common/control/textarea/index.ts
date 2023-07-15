import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

interface Signature {
  Args: {
    value: string;
    id?: string;
    textarea?: string;
    size?: ControlSize;
    required?: boolean;
    selectAllOnFocus?: boolean;
    height?: 'small' | 'medium' | 'large';
    onChange?: (value: string, event: InputEvent) => void;
  };
}

export default class CommonTextareaComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get componentId() {
    return this.args.id ? this.args.id : `textarea-${guidFor(this)}`;
  }

  get value() {
    return this.args.value;
  }

  get size() {
    return this.args.size || 'medium';
  }

  get textarea() {
    return this.args.textarea;
  }

  get height() {
    return this.args.height || 'small';
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
