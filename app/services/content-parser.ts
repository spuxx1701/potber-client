import Service, { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import { emojis } from 'potber-client/utils/icons';
import MessagesService from './messages';
import { parseVideo } from './content-parser/video';
import { parseUrl } from './content-parser/url';
import { parseSimpleTags } from './content-parser/simple-tags';
import { parseImg } from './content-parser/img';
import { parseQuote } from './content-parser/quote';
import { parseList } from './content-parser/list';

export default class ContentParserService extends Service {
  @service declare messages: MessagesService;

  /**
   * Parses post content to HTML and returns the result.
   * @param input The post content containing BBCode and other things.
   * @returns The HTML output.
   */
  parsePostContent(input: string) {
    let output = input;
    output = parseSimpleTags(output);
    output = parseImg(output);
    output = parseVideo(output, window.location);
    output = parseUrl(output);
    output = parseQuote(output, window.location);
    output = parseList(output);
    output = this.parseTable(output);
    output = this.parseEmojis(output);
    output = this.format(output);
    return htmlSafe(output);
  }

  /**
   * Parses [table] tags. Does not support tag nesting.
   * @param input The input string.
   * @returns The output string.
   */
  parseTable(input: string) {
    if (!new RegExp(/\[table\]/).test(input)) return input;
    let output = input;
    output = output.replaceAll(
      /\[table\]/g,
      '<div class="table-container"><table><tr><td>'
    );
    output = output.replaceAll(/\[\|\|\]/g, '</td><td>');
    output = output.replaceAll(/\[--\]/g, '</td></tr><tr><td>');
    output = output.replaceAll(/\[\/table\]/g, '</td></tr></table></div>');
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
