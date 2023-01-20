/**
 * Parses [list] tags. Does not support tag nesting.
 * @param input The input string.
 * @returns The output string.
 */
export function parseList(input: string) {
  const regex = new RegExp(/(?:(\[list\])(.|\n)*?(\[\/list\]))/g);
  if (!regex.test(input)) return input;
  let output = input;
  const matches = input.match(regex);
  if (matches) {
    for (const match of matches) {
      let replacement = match;
      replacement = replacement.replace(/\[list\]/, '<ul>');
      const listItemMatches = replacement.match(/\[\*\]/g);
      if (!listItemMatches) {
        // If the list does not contain any list items, add ending tag right away and return
        replacement = replacement.replace(/\[\/list\]/, '</ul>');
        output.replace(match, replacement);
        break;
      } else {
        for (const i in listItemMatches) {
          if (i === '0') {
            // Add no ending tag before first list item
            replacement = replacement.replace(
              listItemMatches[i] as string,
              '<li>'
            );
          } else {
            // Add ending tags before all other list items
            replacement = replacement.replace(
              listItemMatches[i] as string,
              '</li><li>'
            );
          }
        }
      }
      replacement = replacement.replace(/\[\/list\]/, '</li></ul>');
      output = output.replace(match, replacement);
    }
  }
  return output;
}
