import Component from '@glimmer/component';
import { IconName } from '@fortawesome/fontawesome-common-types';
import Button from 'potber-client/components/common/control/button';
import styles from '../styles.module.css';

interface Signature {
  Element: HTMLButtonElement;
  Args: {
    text: string;
    icon?: IconName;
    onClick?: () => void;
  };
}

export default class MenuButton extends Component<Signature> {
  styles = styles;

  <template>
    <Button
      @text={{@text}}
      @icon={{@icon}}
      @onClick={{@onClick}}
      @variant='secondary-transparent'
      class='menu-item'
    />
  </template>
}
