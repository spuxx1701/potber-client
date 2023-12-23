import { renderToString } from 'katex';

/**
 * Parses [tex] tags into rendered LaTeX output.
 * @param input The input string.
 */
export function parseLatex(input: string) {
  const TEX_REGEX = /\[tex\](.*?)\[\/tex\]/gi;
  if (!TEX_REGEX.test(input)) return input;
  let output = input;
  const matches = input.matchAll(new RegExp(TEX_REGEX));
  for (const match of matches) {
    try {
      const [full, content] = match;
      output = output.replace(full, renderToString(content as string));
    } catch (error) {
      continue;
    }
  }
  return output;
}
