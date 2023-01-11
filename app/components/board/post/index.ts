import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { Post } from 'potber/services/api/types/post';
import { parsePostContent } from 'potber/utils/bbcode';

interface Signature {
  Args: {
    post: Post;
  };
}

export default class PostComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get date() {
    return this.args.post.date.toLocaleString();
  }

  get content() {
    return parsePostContent(this.args.post.content);
  }

  @action handleMenuClick() {
    // do something
  }
}
