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
  const URL_REGEX = /\[url.*?\]([\s|\S]*?)\[\/url\]/gi;
  const URL_PATH_REGEX = /\[url=(.*?)\]/i;
  const URL_LABEL_REGEX = /\[url.*?\]([\s|\S]*?)\[\/url\]/i;
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
  ];

  const { replaceForumUrls } = { ...options };

  if (!URL_REGEX.test(input)) return input;
  let output = input;
  const matches = output.matchAll(new RegExp(URL_REGEX));
  for (const match of matches) {
    try {
      const full = match[0] as string;
      const urlMatches = full.match(URL_PATH_REGEX);
      const contentMatches = full.match(URL_LABEL_REGEX);
      const content = (contentMatches as RegExpMatchArray)[1];
      let url = content;
      if (urlMatches) {
        url = urlMatches[1];
      }
      if (!url) continue;
      if (replaceForumUrls && url.includes(appConfig.forumUrl)) {
        for (const replacement of FORUM_URL_REPLACEMENTS) {
          url = url.replace(replacement.input, replacement.output);
        }
      }

      // Internal links should not be opened in new tabs
      const isInternal = url.includes(appConfig.hostname);

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
