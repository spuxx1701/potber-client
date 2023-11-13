import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';

interface Signature {
  Element: HTMLInputElement;
  Args: {
    value: string;
    label?: string;
    size?: ControlSize;
    required?: boolean;
    selectAllOnFocus?: boolean;
    onChange?: (value: string, event: Event) => void;
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

  handleFocus = (event: FocusEvent) => {
    if (this.args.selectAllOnFocus) {
      const input = event.target as HTMLInputElement;
      input.setSelectionRange(0, input.value.length);
    }
  };

  handleChange = (event: Event) => {
    const value = (event.currentTarget as HTMLInputElement).value;
    if (this.args.onChange) {
      this.args.onChange(value, event);
    }
  };

  <template>
    <div
      id={{this.componentId}}
      class='input-container control-size-{{this.size}}'
    >
      <input
        id='{{this.componentId}}-input'
        value={{@value}}
        placeholder=' '
        aria-placeholder={{this.label}}
        required={{@required}}
        {{on 'change' this.handleChange}}
        {{on 'focus' this.handleFocus}}
        ...attributes
      />
      <label for='{{this.componentId}}-input'>{{this.label}}</label>
    </div>
  </template>
}
