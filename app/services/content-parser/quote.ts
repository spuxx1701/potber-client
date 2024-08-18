/**
 * Parses [quote] tags.
 * @param input The input string.
 * @returns The output string.
 */
export function parseQuote(input: string, location: Partial<Location>) {
  const QUOTE_OPEN_REGEX = /(?:\[quote\]|\[quote(?:.*?)"\])/gi;
  const QUOTE_CLOSE_REGEX = /\[\/quote\]/gi;
  const AUTHOR_REGEX = /(\d*),(\d*),"(.*?)"/;

  if (!QUOTE_OPEN_REGEX.test(input)) return input;
  let output = input;
  const openingTagMatches = input.match(new RegExp(QUOTE_OPEN_REGEX));
  const closingTagMatches = input.match(QUOTE_CLOSE_REGEX);
  if (!openingTagMatches || !closingTagMatches) return input;
  openingTagMatches.forEach((openingTag, index) => {
    const authorMatches = openingTag.match(AUTHOR_REGEX);
    if (authorMatches && authorMatches.length === 4) {
      // If the opening tag contains valid author details, we will need to parse those
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_full, threadId, postId, authorName] = authorMatches;
      const url = `${location.protocol}//${location.host}/thread?TID=${threadId}&PID=${postId}`;
      const replacement = `<span class="quote" data-author-name="${authorName}"><a class="quote-header" href="${url}"><p>${authorName}</p></a><blockquote>`;
      output = output.replace(openingTag, replacement);
    } else {
      // Else, we simply replace the tag
      output = output.replace(openingTag, `<span class="quote"><blockquote>`);
    }
    // For each opening tag we will replace one closing tag starting at the end
    const correspondingClosingTag =
      closingTagMatches[closingTagMatches.length - index - 1];
    if (correspondingClosingTag) {
      output = output.replace(correspondingClosingTag, `</blockquote></span>`);
    }
  });
  return output;
}
