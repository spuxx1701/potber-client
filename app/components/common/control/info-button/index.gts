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

  get icon() {
    return this.args.icon ?? 'info';
  }

  handleClick = () => {
    this.modal.info({
      title: this.args.title,
      text: this.args.text,
    });
  };

  <template>
    <Button
      @icon={{this.icon}}
      @size='square'
      @variant={{@variant}}
      @onClick={{this.handleClick}}
      class='info-button'
    />
  </template>
}
