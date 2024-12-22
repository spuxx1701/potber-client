import { getFaIconHtmlString } from 'potber-client/utils/font-awesome';

/**
 * Parses [video] tags. Does not support tag nesting.
 * @param input The input string.
 * @returns The output string.
 */
export function parseVideo(input: string, location: Partial<Location>) {
  const VIDEO_REGEX = /\[video.*\](.*)\[\/video\]/gi;
  const YOUTUBE_REGEX = /(youtu\.be)|(youtube\.com)/;

  if (!VIDEO_REGEX.test(input)) return input;
  let output = input;
  const matches = input.matchAll(new RegExp(VIDEO_REGEX));
  for (const match of matches) {
    try {
      const full = match[0] as string;
      let url = match[1] as string;
      // Escape colons to prevent emojis from screwing up URLs
      url = url.replaceAll(':', '&#58;');

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
        const autoplay = full.includes('play');
        // Seek to 0.001 seconds to prevent the video from showing a black screen
        // see: https://shj.rip/article/how-to-generate-video-thumbnails-correctly-in-ios-safari.html#media-fragments-uri
        replacement += `<video src="${url}#t=0.001"${
          autoplay ? ' autoplay playsinline muted loop' : ''
        } controls></video></span>`;
        output = output.replace(match[0], replacement);
      }
    } catch (error) {
      continue;
    }
  }
  return output;
}
