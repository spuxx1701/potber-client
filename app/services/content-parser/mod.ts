/**
 * Parses [mod] tags. Does not support tag nesting.
 * @param input The input string.
 * @returns The output string.
 */
export function parseMod(input: string) {
  let output = input;
  output = output.replaceAll(/\[mod\]/g, '<p class="mod">');
  output = output.replaceAll(/\[\/mod\]/g, '</p>');
  return output;
}
