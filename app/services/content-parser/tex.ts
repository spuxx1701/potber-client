/**
 * Parses [tex] tags. Does not support tag nesting.
 * @param input The input string.
 * @returns The output string.
 */
export function parseTex(input: string) {
  let output = input;
  output = output.replaceAll(/\[tex\]/g, '<p class="tex">');
  output = output.replaceAll(/\[\/tex\]/g, '</p>');
  return output;
}
