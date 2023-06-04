/**
 * Parses [list] tags.
 * @param input The input string.
 * @returns The output string.
 */
export function parseList(input: string) {
  const LIST_REGEX = /(?:(\[list\])(?:\s|\S)*?(\[\/list\]))/gi;
  if (!LIST_REGEX.test(input)) return input;
  console.log(input);
  let output = input;
  const matches = input.matchAll(new RegExp(LIST_REGEX));
  for (const match of matches) {
    try {
      const [full, openingTag, closingTag] = match;
      let replacement = full;
      replacement = replacement.replace(openingTag as string, '<ul><li>');
      replacement = replacement.replace(closingTag as string, '</li></ul>');
      const LIST_ITEM_REGEX = /\[\*\]\s?/g;
      const itemMatches = full.match(LIST_ITEM_REGEX) as RegExpMatchArray;
      itemMatches.forEach((itemMatch, index) => {
        if (index === 0) {
          // On first element, simply remove the marker
          replacement = replacement.replace(itemMatch, '');
        } else {
          // On all other elements, replace the marker with a closing and opening tag
          replacement = replacement.replace(itemMatch, '</li><li>');
        }
      });
      output = output.replace(full, replacement);
    } catch (error) {
      continue;
    }

    // let replacement = match;
    // replacement = replacement.replace(/\[list\]/, '<ul>');
    // const listItemMatches = replacement.match(/\[\*\]/g);
    // if (!listItemMatches) {
    //   // If the list does not contain any list items, add ending tag right away and return
    //   replacement = replacement.replace(/\[\/list\]/, '</ul>');
    //   output.replace(match, replacement);
    //   break;
    // } else {
    //   for (const i in listItemMatches) {
    //     if (i === '0') {
    //       // Add no ending tag before first list item
    //       replacement = replacement.replace(
    //         listItemMatches[i] as string,
    //         '<li>'
    //       );
    //     } else {
    //       // Add ending tags before all other list items
    //       replacement = replacement.replace(
    //         listItemMatches[i] as string,
    //         '</li><li>'
    //       );
    //     }
    //   }
    // }
    // replacement = replacement.replace(/\[\/list\]/, '</li></ul>');
    // output = output.replace(match, replacement);
  }
  return output;
}
