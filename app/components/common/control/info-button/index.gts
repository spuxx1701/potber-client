import Component from '@glimmer/component';
import Button from 'potber-client/components/common/control/button';

interface Signature {
  Element: HTMLButtonElement;
  title: string;
  text: string;
}

export default class InfoButtonComponent extends Component<Signature> {
  handleClick = () => {
    console.log('click');
  };

  <template>
    <Button @icon='info' @size='square' @onClick={{this.handleClick}} />
  </template>
}
