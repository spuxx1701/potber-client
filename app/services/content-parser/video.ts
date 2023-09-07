import { getFaIconHtmlString } from 'potber-client/utils/font-awesome';

/**
 * Parses [video] tags. Does not support tag nesting.
 * @param input The input string.
 * @returns The output string.
 */
export function parseVideo(input: string, location: Partial<Location>) {
  const VIDEO_REGEX = /\[video\](.*)\[\/video\]/gi;
  const YOUTUBE_REGEX = /(youtu\.be)|(youtube\.com)/;

  if (!VIDEO_REGEX.test(input)) return input;
  let output = input;
  const matches = input.matchAll(new RegExp(VIDEO_REGEX));
  for (const match of matches) {
    try {
      const full = match[0] as string;
      const url = match[1] as string;

      const linkIcon = getFaIconHtmlString({ prefix: 'fas', iconName: 'link' });
      let replacement = `<span class="video-container"><a class="video-container-header" href="${url}" target="_blank"><p>Video</p>${linkIcon}</a>`;
      if (full.match(YOUTUBE_REGEX)) {
        // YouTube links need to be embedded using their propietary player
        const split = url.split('/');
        const path = split[split.length - 1] as string;
        let videoId = '';
        if (/v=/.test(path)) {
          const idMatches = path.match(/v=((\w|-)*)/) as RegExpMatchArray;
          videoId = idMatches[1] as string;
        } else {
          videoId = path.split('?')[0] as string;
        }
        // Build the query
        let query = '';
        if (/t=/.test(path)) {
          const timecodeMatches = path.match(/t=(\d*)/) as RegExpMatchArray;
          query += timecodeMatches[0];
        }
        if (query) query += '&';
        query += `origin=${location.protocol}//${location.host}`;
        replacement += `<iframe class="youtube-player" type="text/html" src="https://www.youtube.com/embed/${videoId}?${query}" frameborder="0" allow="fullscreen;"></iframe></span>`;
        output = output.replace(match[0], replacement);
      } else {
        // Other links can be embedded using the <video> tag
        replacement += `<video src="${url}" controls></video></span>`;
        output = output.replace(match[0], replacement);
      }
    } catch (error) {
      continue;
    }
  }
  return output;
}
