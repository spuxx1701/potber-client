import Service, { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
// import yabbcode from 'ya-bbcode';
import yabbcode from './bbcode/ya-bbcode';
import { emojis } from 'potber-client/utils/icons';
import MessagesService from './messages';
import { parseMod } from './content-parser/mod';
import { parseTex } from './content-parser/tex';

export default class ContentParserService extends Service {
  @service declare messages: MessagesService;
  parser = this.registerCustomTags(new yabbcode());

  /**
   * Parses post content to HTML and returns the result.
   * @param input The post content containing BBCode and other things.
   * @returns The HTML output.
   */
  parsePostContent(input: string) {
    let output = input;
    // Simple formatting tags
    output = parseMod(output);
    output = parseTex(output);
    output = this.parseTable(output);
    output = this.parseList(output);
    output = this.parseQuoteUsernames(output);
    output = this.parser.parse(output);
    output = this.parseEmojis(output);
    output = this.cleanup(output);
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
    output = output.replaceAll(/\[table\]/g, '<table><tr><td>');
    output = output.replaceAll(/\[\|\|\]/g, '</td><td>');
    output = output.replaceAll(/\[--\]/g, '</td></tr><tr><td>');
    output = output.replaceAll(/\[\/table\]/g, '</td></tr></table>');
    return output;
  }

  /**
   * Parses [list] tags. Does not support tag nesting.
   * @param input The input string.
   * @returns The output string.
   */
  parseList(input: string) {
    const regex = new RegExp(/(?:(\[list\])(.|\n)*?(\[\/list\]))/g);
    if (!regex.test(input)) return input;
    let output = input;
    const matches = input.match(regex);
    if (matches) {
      for (const match of matches) {
        let replacement = match;
        replacement = replacement.replace(/\[list\]/, '<ul>');
        const listItemMatches = replacement.match(/\[\*\]/g);
        if (!listItemMatches) {
          // If the list does not contain any list items, add ending tag right away and return
          replacement = replacement.replace(/\[\/list\]/, '</ul>');
          output.replace(match, replacement);
          break;
        } else {
          for (const i in listItemMatches) {
            if (i === '0') {
              // Add no ending tag before first list item
              replacement = replacement.replace(
                listItemMatches[i] as string,
                '<li>'
              );
            } else {
              // Add ending tags before all other list items
              replacement = replacement.replace(
                listItemMatches[i] as string,
                '</li><li>'
              );
            }
          }
        }
        replacement = replacement.replace(/\[\/list\]/, '</li></ul>');
        output = output.replace(match, replacement);
      }
    }
    return output;
  }

  /**
   * Registers custom tags for yabbcode parser. Default tags can be found here:
   * https://github.com/nodecraft/ya-bbcode/blob/main/ya-bbcode.js
   * The parser is documented at https://github.com/nodecraft/ya-bbcode.
   * @param parser The yabbcode parser instance.
   * @returns The modified yabbcode parser instance.
   */
  private registerCustomTags(parser: yabbcode) {
    parser.registerTag('table', {
      type: 'ignore',
    });
    parser.registerTag('list', {
      type: 'ignore',
    });
    parser.registerTag('quote', {
      type: 'content',
      replace: this.parseQuote,
    });
    parser.registerTag('s', {
      type: 'replace',
      open: '<s>',
      close: '</s>',
    });
    parser.registerTag('url', {
      type: 'content',
      replace: this.parseUrl,
    });
    parser.registerTag('spoiler', {
      type: 'replace',
      open: '<label class="spoiler"><input class="spoiler-input" type="checkbox"/><p class="spoiler-header">👀 Spoiler anzeigen</p><span class="spoiler-content">',
      close: '</span></label>',
    });
    parser.registerTag('video', {
      type: 'content',
      replace: this.parseVideo,
    });
    return parser;
  }

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

  private parseUrl(attr: string, content: string) {
    if (!attr) attr = `"${content}"`;
    return `<a href=${attr} target="_blank">${content}</a>`;
  }

  private parseVideo(attr: string, content: string) {
    // YouTube links need to be embedded using their propietary player
    if (content.match(/youtu.be/g) || content.match(/youtube.com/g)) {
      const split = content.split('/');
      const videoId = split[split.length - 1];
      return `<iframe class="youtube-player" type="text/html"
          src="https://www.youtube.com/embed/${videoId}?&origin=${window.location.protocol}//${window.location.host}"
          frameborder="0"/>`;
    } else {
      return `<video src="${content}" controls/>`;
    }
  }

  /**
   * Quotes can contain usernames which again can contain square brackets, which
   * will make yabbcode misinterpret the end of the opening tag. We will need
   * to prepare those so that yabbcode will have a easier time parsing them.
   */
  private parseQuoteUsernames(input: string) {
    // eslint-disable-next-line no-useless-escape
    const quoteAttributesRegex = RegExp(/(?:(\")(.*)(\"))/g);
    const matches = input.match(quoteAttributesRegex);
    if (!matches || matches.length === 0) return input;
    let output = input;
    for (const match of matches) {
      const replacement = match.replace('[', '<SQBO>').replace(']', '<SQBC>');
      output = output.replace(match, replacement);
    }
    return output;
  }

  private parseQuote(attr: string, content: string) {
    if (!attr) {
      return `<span class="quote"><blockquote>${content}</blockquote></span>`;
    }
    const userNameMatches = attr.match(/(?:[\\"](.*)[\\"])/);
    let userName = '';
    if (userNameMatches && userNameMatches.length > 1) {
      userName = userNameMatches[1] as string;
    } else {
      userName = 'Unknown';
    }
    const ids = attr.replace(/[^0-9,]/g, '').split(',');
    if (ids.length >= 2) {
      const threadId = ids[0];
      const postId = ids[1];
      const url = `${window.location.protocol}//${window.location.host}/thread?TID=${threadId}&PID=${postId}#reply_${postId}`;
      return `<span class="quote"><a class="quote-header" href="${url}"><p>${userName}</p></a><blockquote>${content}</blockquote></span>`;
    }
    return `<span class="quote"><span class="quote-header"><p>${userName}</p></span><blockquote>${content}</blockquote></span>`;
  }

  cleanup(input: string) {
    let output = input;
    output = output.replaceAll('<SQBO>', '[').replaceAll('<SQBC>', ']');
    return output;
  }
}
