import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Post } from 'potber/services/api/types/post';
import BbCodeParserService from 'potber/services/bbcode-parser';

interface Signature {
  Args: {
    post: Post;
  };
}

export default class PostComponent extends Component<Signature> {
  @service declare bbcodeParser: BbCodeParserService;

  declare args: Signature['Args'];

  get date() {
    return this.args.post.date.toLocaleString();
  }

  get content() {
    return this.bbcodeParser.parsePostContent(this.args.post.content);
  }

  @action handleMenuClick() {
    // do something
  }
}
