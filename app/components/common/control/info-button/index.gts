import Component from '@glimmer/component';
import Button from 'potber-client/components/common/control/button';
import { service } from '@ember/service';
import ModalService from 'potber-client/services/modal';
import { Info } from './types';

interface Signature {
  Element: HTMLButtonElement;
  Args: Info;
}

export default class InfoButtonComponent extends Component<Signature> {
  @service declare modal: ModalService;
  handleClick = () => {
    this.modal.info({
      title: this.args.title,
      text: this.args.text,
    });
  };

  <template>
    <Button
      @icon='info'
      @size='square'
      @variant={{@variant}}
      @onClick={{this.handleClick}}
      class='info-button'
    />
  </template>
}
