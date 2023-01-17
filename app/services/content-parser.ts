import Service from '@ember/service';
import { htmlSafe } from '@ember/template';
// import yabbcode from 'ya-bbcode';
import yabbcode from './bbcode/ya-bbcode';
import { emojis } from './bbcode/emoji';

export default class ContentParserService extends Service {
  parser = this.registerCustomTags(new yabbcode());

  /**
   * Parses post content to HTML and returns the result.
   * @param input The post content containing BBCode and other things.
   * @returns The HTML output.
   */
  parsePostContent(input: string) {
    let output = input;
    // if (output.match(/Admiral Bohm/g))
    // output = output.replaceAll(/Admiral Bohm/g, 'Admiral_Bohm');
    // if (output.match(/Admiral Bohm/g)) debugger;
    output = this.parser.parse(output);
    output = this.parseEmojis(output);
    return htmlSafe(output);
  }

  /**
   * Registers custom tags for yabbcode parser. Default tags can be found here:
   * https://github.com/nodecraft/ya-bbcode/blob/main/ya-bbcode.js
   * The parser is documented at https://github.com/nodecraft/ya-bbcode.
   * @param parser The yabbcode parser instance.
   * @returns The modified yabbcode parser instance.
   */
  private registerCustomTags(parser: yabbcode) {
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
        `<img class="post-emoji" src="post-emojis/${emoji.filename}" alt="${emoji.key}"/>`
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
          src="https://www.youtube.com/embed/${videoId}?&origin=${window.location.host}"
          frameborder="0"/>`;
    } else {
      return `<video src="${content}" controls/>`;
    }
  }

  private parseQuote(attr: string, content: string) {
    if (!attr) {
      return `<span class="quote"><blockquote>${content}</blockquote></span>`;
    }
    const userNameMatches = attr.match(/(?<=")(.*)(?=")/);
    let userName = '';
    if (userNameMatches && userNameMatches.length > 0) {
      userName = userNameMatches[0];
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
}
