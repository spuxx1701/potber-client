import Service, { service } from '@ember/service';
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
import { parsePrivateMessageHtml } from './content-parser/private-message';
import SettingsService from './settings';
import { parsePrivilegedTags } from './content-parser/privileged-tags';
import { appConfig } from 'potber-client/config/app.config';
import { emojis } from 'potber-client/config/icons.config';
import { getEmojiFilename } from 'potber-client/utils/icons';
import { parseTex } from './content-parser/tex';

export default class ContentParserService extends Service {
  @service declare messages: MessagesService;
  @service declare settings: SettingsService;

  /**
   * Parses post content to HTML and returns the result.
   * @param input The post content containing BBCode and other things.
   * @param options.privileged (optional) Whether the author is considered privileged.
   * Will be used to decide whether specific tags should be parsed at all (e.g. `[mod]`).
   * @returns The HTML output.
   */
  parsePostContent(input: string, options?: { privileged?: boolean }) {
    const { privileged } = { ...options };
    let output = input;
    output = sanitize(output);
    output = parseCode(output);
    output = parseSimpleTags(output);
    output = parseTex(output);
    output = parsePrivilegedTags(output, privileged);
    output = parseImg(output);
    output = parseVideo(output, window.location);
    output = parseUrl(output, {
      replaceForumUrls: this.settings.getSetting('replaceForumUrls'),
    });
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
        `<img class="post-emoji" src="/images/post-emojis/${getEmojiFilename(
          emoji.key,
        )}" alt="${emoji.key}"/>`,
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
    output = output.replaceAll(/\r\n/g, '<br/>');
    output = output.replaceAll(/\n/g, '<br/>');
    return output;
  }

  /**
   * Parses the content of private messages.
   * @param input The input string.
   * @returns The output string.
   */
  parsePrivateMessageContent(input: string): string {
    let output = parsePrivateMessageHtml(input);
    output = this.format(output);
    return output;
  }
}
