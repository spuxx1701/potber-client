import Component from '@glimmer/component';
import { Posts, Threads } from 'potber-client/services/api/types';
import Textarea from 'potber-client/components/common/control/textarea';
import { on } from '@ember/modifier';
import styles from './styles.module.css';
import PostFormMessageToolbar from './toolbar';
import { t } from 'ember-intl';

interface Signature {
  Args: {
    formId: string;
    post: Posts.Write | Threads.OpeningPost;
  };
}

export default class PostFormMessage extends Component<Signature> {
  styles = styles;

  handleChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    const message = target.value;
    this.args.post.message = message;
  };

  get textarea() {
    const form = document.getElementById(this.args.formId);
    if (!form) {
      throw new Error(`Cannot find form with id ${this.args.formId}.`);
    }
    const textarea = form.querySelector('textarea');
    if (!textarea) {
      throw new Error(
        `Cannot find textarea in form with id ${this.args.formId}.`,
      );
    }
    return textarea;
  }

  <template>
    <PostFormMessageToolbar @post={{@post}} @textarea={{this.textarea}} />
    <Textarea
      @required={{true}}
      @size='max'
      @height='x-large'
      @value={{@post.message}}
      placeholder={{t 'feature.post-form.message.placeholder'}}
      maxLength='15000'
      {{on 'change' this.handleChange}}
    />
  </template>
}
