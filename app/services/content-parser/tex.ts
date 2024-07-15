import katex from 'katex';

/**
 * Parses [tex] tags. Does not support tag nesting.
 * @param input The input string.
 * @returns The output string.
 */
export function parseTex(input: string) {
  const TEX_REGEX = /\[tex.*\](.*)\[\/tex\]/gi;

  if (!TEX_REGEX.test(input)) return input;

  let output = input;
  const matches = input.matchAll(new RegExp(TEX_REGEX));
  for (const match of matches) {
    const [full, content] = match;
    if (!content) continue;
    const rendered = katex.renderToString(content, {
      throwOnError: false,
    });
    output = output.replace(full, rendered);
  }
  return output;
}
