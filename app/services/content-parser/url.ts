import { appConfig } from 'potber-client/config/app.config';

/**
 * Parses [url] tags. Does not support tag nesting.
 * @param input The input string.
 * @param options.replaceForumUrls (optional) Whether forum.mods.de URLs should be replaced by potber URLs.
 * @returns The output string.
 */
export function parseUrl(
  input: string,
  options?: { replaceForumUrls?: boolean },
) {
  const URL_TAG_REGEX =
    /\[url(?:=(?:"|')?([^\]]+)(?:"|')?)?\]([\s\S]*?)\[\/url\]/gi;
  const URL_REGEX = /\b([a-zA-Z]+:\/\/[^\s]+|www\.[^\s]+)\b/gi;

  const FORUM_URL_REPLACEMENTS = [
    {
      input: 'forum.mods.de/bb//thread.php',
      output: `${appConfig.hostname}/thread`,
    },
    {
      input: 'forum.mods.de/bb//board.php',
      output: `${appConfig.hostname}/board`,
    },
    {
      input: 'forum.mods.de/bb/thread.php',
      output: `${appConfig.hostname}/thread`,
    },
    {
      input: 'forum.mods.de/bb/board.php',
      output: `${appConfig.hostname}/board`,
    },
    {
      input: 'forum.mods.de/thread.php',
      output: `${appConfig.hostname}/thread`,
    },
    {
      input: 'forum.mods.de/board.php',
      output: `${appConfig.hostname}/board`,
    },
    {
      input: 'forum.mods.de//thread.php',
      output: `${appConfig.hostname}/thread`,
    },
    {
      input: 'forum.mods.de//board.php',
      output: `${appConfig.hostname}/board`,
    },
  ];

  const { replaceForumUrls } = { ...options };

  if (!URL_TAG_REGEX.test(input)) return input;
  let output = input;
  const matches = output.matchAll(new RegExp(URL_TAG_REGEX));
  for (const match of matches) {
    try {
      const [full, possibleUrl, content] = match;
      let url = possibleUrl;

      if (!content) continue;

      // We might need to extract the URL from the content
      if (!url) {
        const urlMatch = content.replace('&#58;', ':').match(URL_REGEX);

        // We found a valid URL in the content
        if (urlMatch) {
          url = urlMatch[0];
        } else {
          // The content is the URL
          url = content;
        }
      }

      if (!url) continue;

      if (replaceForumUrls && url.includes(appConfig.forumUrl)) {
        for (const replacement of FORUM_URL_REPLACEMENTS) {
          url = url.replace(replacement.input, replacement.output);
        }
      }

      // Internal links should not be opened in new tabs
      const isInternal = url.includes(appConfig.hostname);

      // Escape colons to prevent emojis from screwing up URLs
      url = url.replaceAll(':', '&#58;');

      const replacement = `<a href="${url}"${
        isInternal ? '' : ' target="_blank"'
      }>${content}</a>`;

      output = output.replace(full, replacement);
    } catch (error) {
      continue;
    }
  }
  return output;
}
