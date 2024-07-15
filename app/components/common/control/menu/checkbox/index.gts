import Component from '@glimmer/component';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import Button from 'potber-client/components/common/control/button';
import styles from '../styles.module.css';
import { tracked } from '@glimmer/tracking';

interface Signature {
  Element: HTMLButtonElement;
  Args: {
    text: string;
    default?: boolean;
    onChange: (value: boolean) => void;
  };
}

export default class MenuCheckbox extends Component<Signature> {
  styles = styles;
  @tracked state: boolean = this.args.default ?? false;

  get icon(): IconName {
    return this.state ? 'check-square' : 'square';
  }

  get prefix(): IconPrefix {
    return this.state ? 'fas' : 'far';
  }

  handleChange = () => {
    this.state = !this.state;
    this.args.onChange(this.state);
  };

  <template>
    <Button
      @text={{@text}}
      @icon={{this.icon}}
      @prefix={{this.prefix}}
      @onClick={{this.handleChange}}
      @variant='secondary-transparent'
      class='menu-item'
    />
  </template>
}
