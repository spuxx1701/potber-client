import Service, { service } from '@ember/service';
import { emojis } from 'potber-client/utils/icons';
import MessagesService from './messages';
import { parseVideo } from './content-parser/video';
import { parseUrl } from './content-parser/url';
import { parseSimpleTags } from './content-parser/simple-tags';
import { parseImg } from './content-parser/img';
import { parseQuote } from './content-parser/quote';
import { parseList } from './content-parser/list';
import { parseTable } from './content-parser/table';
import { sanitize } from './content-parser/sanitize';
import { parseCode } from './content-parser/code';

export default class ContentParserService extends Service {
  @service declare messages: MessagesService;

  /**
   * Parses post content to HTML and returns the result.
   * @param input The post content containing BBCode and other things.
   * @returns The HTML output.
   */
  parsePostContent(input: string) {
    let output = input;
    output = sanitize(output);
    output = parseCode(output);
    output = parseSimpleTags(output);
    output = parseImg(output);
    output = parseVideo(output, window.location);
    output = parseUrl(output);
    output = parseQuote(output, window.location);
    output = parseList(output);
    output = parseTable(output);
    output = this.parseEmojis(output);
    output = this.format(output);
    return output;
  }

  /**
   * Parses emojis.
   * @param input The input string.
   * @returns The output string.
   */
  private parseEmojis(input: string) {
    let output = input;
    for (const emoji of emojis) {
      output = output.replaceAll(
        emoji.pattern,
        `<img class="post-emoji" src="/images/post-emojis/${emoji.filename}" alt="${emoji.key}"/>`
      );
    }
    return output;
  }

  /**
   * Formats the content and parses line breaks.
   * @param input The input string.
   * @returns The output string.
   */
  format(input: string): string {
    let output = input;
    output = output.replaceAll(/\n/g, '<br/>');
    return output;
  }
}
