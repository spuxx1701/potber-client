import { action } from '@ember/object';
import Service from '@ember/service';
import { htmlSafe } from '@ember/template';
import yabbcode from 'ya-bbcode'; // https://github.com/nodecraft/ya-bbcode
import { emojis } from './bbcode/emoji';

// https://forum.mods.de/bb/thread.php?TID=206196&PID=1249082052#reply_1249082052

export default class BbCodeParserService extends Service {
  parser = this.registerCustomTags(new yabbcode());

  parsePostContent(input: string) {
    let output = this.parser.parse(input);
    output = this.parseEmojis(output);
    return htmlSafe(output);
  }

  /**
   * https://github.com/nodecraft/ya-bbcode/blob/main/ya-bbcode.js
   */
  registerCustomTags(parser: yabbcode) {
    // parser.registerTag('url', {
    //   type: 'replace',
    //   open: (attr: string) => `<a href="${attr}">`,
    //   close: '</a>',
    // });
    parser.registerTag('url', {
      type: 'content',
      replace: (attr: string, content: string) => {
        return `<a href="${attr}">${content}</a>`;
      },
    });
    parser.registerTag('video', {
      type: 'content',
      replace: this.parseVideo,
    });
    return parser;
  }

  parseEmojis(input: string) {
    let output = input;
    for (const emoji of emojis) {
      output = output.replaceAll(
        emoji.pattern,
        `<img class="post-emoji" src="post-emojis/${emoji.filename}" alt="${emoji.key}"/>`
      );
    }
    return output;
  }

  parseVideo(attr: string, content: string) {
    // YouTube links need to be embedded using their propietary player
    if (content.match(/youtu.be/g) || content.match(/youtube.com/g)) {
      const split = content.split('/');
      const videoId = split[split.length - 1];
      return `<iframe class="youtube-player" type="text/html"
          src="http://www.youtube.com/embed/${videoId}?&origin=${window.location.host}"
          frameborder="0"/>`;
    } else {
      return `<video src="${content}" controls/>`;
    }
  }
}
