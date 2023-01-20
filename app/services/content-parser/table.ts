/**
 * Pares [table] tags. Does not support tag nesting.
 * @param input The input string.
 * @returns The output string.
 */

export function parseTable(input: string) {
  if (!new RegExp(/\[table\]/).test(input)) return input;
  let output = input;
  output = output.replaceAll(/\[table\]/g, '<table><tr><td>');
  output = output.replaceAll(/\[\|\|\]/g, '</td><td>');
  output = output.replaceAll(/\[--\]/g, '</td></tr><tr><td>');
  output = output.replaceAll(/\[\/table\]/g, '</td></tr></table>');
  return output;
}
