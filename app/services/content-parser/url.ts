/**
 * Parses [url] tags. Does not support tag nesting.
 * @param input The input string.
 * @returns The output string.
 */
export function parseUrl(input: string) {
  const URL_REGEX = /\[url.*?\](.*?)\[\/url\]/gi;
  const URL_PATH_REGEX = /\[url=(.*?)\]/i;
  const URL_LABEL_REGEX = /\[url.*?\](.*?)\[\/url\]/i;

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
      const replacement = `<a href="${url}" target="_blank">${content}</a>`;
      output = output.replace(full, replacement);
    } catch (error) {
      continue;
    }
  }
  return output;
}

// if (!attr) attr = `"${content}"`;
// return `<a href=${attr} target="_blank">${content}</a>`;
