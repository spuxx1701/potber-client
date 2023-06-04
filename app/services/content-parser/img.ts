const IMG_REGEX = /\[img\](.*)\[\/img\]/gi;

/**
 * Parses [img] tags. Does not support tag nesting.
 * @param input The input string.
 * @returns The output string.
 */
export function parseImg(input: string) {
  if (!IMG_REGEX.test(input)) return input;
  let output = input;
  const matches = input.matchAll(IMG_REGEX);
  for (const match of matches) {
    try {
      const full = match[0] as string;
      const url = match[1] as string;
      const replacement = `<img src="${url}"/>`;
      output = output.replace(full, replacement);
    } catch (error) {
      continue;
    }
  }
  return output;
}
