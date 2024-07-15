import classNames from 'potber-client/helpers/class-names';
import Component from '@glimmer/component';
import styles from './styles.module.css';
import { on } from '@ember/modifier';
import eq from 'ember-truth-helpers/helpers/eq';

interface Signature {
  Args: {
    title: string;
    placement?: 'left' | 'right';
    default?: boolean;
    disabled?: boolean;
    onChange: (value: boolean) => void;
  };
}

export class ToggleSwitch extends Component<Signature> {
  styles = styles;

  get placement() {
    return this.args.placement || 'left';
  }

  handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.args.onChange(target.checked);
  };

  <template>
    <label class='toggle-switch'>
      {{#if (eq this.placement 'right')}}
        <p class={{classNames this 'label-left'}}>{{@title}}</p>
      {{/if}}
      <div class={{classNames this 'control'}}>
        <input
          type='checkbox'
          checked={{@default}}
          disabled={{@disabled}}
          {{on 'change' this.handleChange}}
        />
        <span class={{classNames this 'slider'}}></span>
      </div>
      {{#if (eq this.placement 'left')}}
        <p class={{classNames this 'label-right'}}>{{@title}}</p>
      {{/if}}
    </label>
  </template>
}
