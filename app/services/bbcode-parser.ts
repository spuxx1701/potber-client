import Service from '@ember/service';
import { htmlSafe } from '@ember/template';
import yabbcode from 'ya-bbcode'; // https://github.com/nodecraft/ya-bbcode
import { v4 as uuidv4 } from 'uuid';

// https://forum.mods.de/bb/thread.php?TID=206196&PID=1249082052#reply_1249082052

export default class BbCodeParserService extends Service {
  parser = this.registerCustomTags(new yabbcode());

  parsePostContent(input: string) {
    const output = this.parser.parse(input);
    return htmlSafe(output);
  }

  /**
   * https://github.com/nodecraft/ya-bbcode/blob/main/ya-bbcode.js
   * @param parser
   * @returns
   */
  registerCustomTags(parser: yabbcode) {
    parser.registerTag('img', {
      type: 'content',
      replace: (attr: string, content: string) => {
        return `<div class="image-container">
        <label class="image-container-label">
        <input class="image-container-input" type="checkbox"/>
        <img src="${content}" class="image-container-img"/>
        </label>
        </div>`;
      },
    });
    return parser;
  }
}
