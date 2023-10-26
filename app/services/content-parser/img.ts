/**
 * Parses [img] tags. Does not support tag nesting.
 * @param input The input string.
 * @returns The output string.
 */
export function parseImg(input: string) {
  const IMG_REGEX = /\[img\](.*?)\[\/img\]/gi;
  if (!IMG_REGEX.test(input)) return input;
  let output = input;
  const matches = input.matchAll(new RegExp(IMG_REGEX));
  for (const match of matches) {
    try {
      const full = match[0] as string;
      let url = match[1] as string;
      // Escape colons to prevent emojis from screwing up URLs
      url = url.replaceAll(':', '&#58;');
      const replacement = `<img src="${url}"/>`;
      output = output.replace(full, replacement);
    } catch (error) {
      continue;
    }
  }
  return output;
}
