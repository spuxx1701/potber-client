import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface PostFormContent {
  title: string;
  icon: string;
  message: string;
  convertUrls: boolean;
  disableBbCode: boolean;
  disableEmojis: boolean;
}

interface Signature {
  Args: {
    post: PostFormContent;
    submitLabel: string;
    onSubmit: (post: PostFormContent) => void;
  };
}

export default class PostFormComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get submitLabel() {
    return this.args.submitLabel || 'Absenden';
  }

  @action handleTitleChange(value: string) {
    this.args.post.title = value;
  }

  @action handleMessageChange(event: InputEvent) {
    this.args.post.message = (event.target as HTMLInputElement).value;
  }

  @action handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (this.args.onSubmit) {
      this.args.onSubmit(this.args.post);
    }
  }
}
