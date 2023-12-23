import Component from '@glimmer/component';
import {
  postIcons,
  PostIcon,
  PostIconKey,
  emojis,
  Emoji,
  EmojiKey,
} from 'potber-client/config/icons.config';
import { isChristmasSeason } from 'potber-client/utils/misc';

interface Signature {
  Args: {
    icon: PostIconKey | EmojiKey;
    directory: 'post-icons' | 'post-emojis';
  };
}

export default class BoardIcon extends Component<Signature> {
  get icon(): PostIcon | Emoji {
    const icon =
      postIcons.find((postIcon) => postIcon.key === this.args.icon) ??
      emojis.find((emoji) => emoji.key === this.args.icon);
    if (!icon)
      throw new Error(`Invalid post icon or emoji key: ${this.args.icon}`);
    return icon;
  }

  get directory() {
    return (this.icon as Emoji).pattern ? 'post-emojis' : 'post-icons';
  }

  get isEmpty() {
    return this.args.icon === '0' || !this.args.icon;
  }

  get filename() {
    return isChristmasSeason() && this.icon.christmasFilename
      ? this.icon.christmasFilename
      : this.icon.filename;
  }

  <template>
    {{#unless this.isEmpty}}
      <img
        class='post-icon'
        src='/images/{{this.directory}}/{{this.filename}}'
        alt={{this.icon.key}}
      />
    {{/unless}}
  </template>
}
