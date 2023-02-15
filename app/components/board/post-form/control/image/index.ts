import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Post from 'potber-client/models/post';
import ModalService from 'potber-client/services/modal';

interface Signature {
  Args: {
    post: Post;
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
