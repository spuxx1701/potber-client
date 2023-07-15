const unallowedCharacters: { input: string; replacement: string }[] = [
  {
    input: '[',
    replacement: '&lsqb;',
  },
  {
    input: ']',
    replacement: '&rsqb;',
  },
];

/**
 * Parses [code] tags. Does not support tag nesting.
 * @param input The input string.
 * @returns The output string.
 */
export function parseCode(input: string) {
  const CODE_REGEX = /\[code\]([\s|\S]*?)\[\/code\]/gi;

  if (!CODE_REGEX.test(input)) return input;
  let output = input;
  const matches = input.matchAll(new RegExp(CODE_REGEX));
  for (const match of matches) {
    try {
      const full = match[0] as string;
      let content = match[1] as string;
      // We need to escape square brackets to prevent BBCode
      // in the content from getting parsed
      for (const character of unallowedCharacters) {
        content = content.replaceAll(character.input, character.replacement);
      }
      const replacement = `<code>${content}</code>`;
      output = output.replace(full, replacement);
    } catch (error) {
      continue;
    }
  }
  return output;
}
