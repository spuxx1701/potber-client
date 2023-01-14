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
        return `<a href="${attr}">${content || attr}</a>}`;
      },
    });
    // parser.registerTag('img', {
    //   type: 'content',
    //   replace: (attr: string, content: string) => {
    //     return `<div class="image-container">
    //     <label class="image-container-label">
    //     <input class="image-container-input" type="checkbox"/>
    //     <img src="${content}" class="image-container-img"/>
    //     </label>
    //     </div>`;
    //   },
    // });
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
}
