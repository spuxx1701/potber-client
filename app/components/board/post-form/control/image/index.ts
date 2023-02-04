import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ModalService from 'potber/services/modal';
import { PostFormContent } from '../..';

interface Signature {
  Args: {
    post: PostFormContent;
  };
}

export default class PostFormControlImageComponent extends Component<Signature> {
  @service declare modal: ModalService;

  @action handleClick() {
    // implement me
  }

  @action handleSubmit() {
    // implement me
  }
}
