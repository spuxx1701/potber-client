/**
 * Parses [table] tags.
 * @param input The input string.
 * @returns The output string.
 */
export function parseTable(input: string) {
  const TABLE_REGEX = /(?:(\[table\]\s*)(?:\s|\S)*?(\s*\[\/table\]))/gi;
  if (!TABLE_REGEX.test(input)) return input;

  let output = input;
  const matches = input.matchAll(new RegExp(TABLE_REGEX));
  for (const match of matches) {
    try {
      const [full, openingTag, closingTag] = match;
      let replacement = full;
      replacement = replacement.replace(
        openingTag as string,
        '<table><tr><td>'
      );
      replacement = replacement.replace(
        closingTag as string,
        '</td></tr></table>'
      );
      replacement = replacement.replaceAll(/\s*\[\|\|\]\s*/g, '</td><td>');
      replacement = replacement.replaceAll(
        /\s*\[--\]\s*/g,
        '</td></tr><tr><td>'
      );
      output = output.replace(full, replacement);
    } catch (error) {
      continue;
    }
  }
  return output;
}

// if (!new RegExp(/\[table\]/).test(input)) return input;
// let output = input;
// output = output.replaceAll(
//   /\[table\]/g,
//   '<div class="table-container"><table><tr><td>'
// );
// output = output.replaceAll(/\[\|\|\]/g, '</td><td>');
// output = output.replaceAll(/\[--\]/g, '</td></tr><tr><td>');
// output = output.replaceAll(/\[\/table\]/g, '</td></tr></table></div>');
// return output;
