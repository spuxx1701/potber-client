const unallowedCharacters: { input: string; replacement: string }[] = [
  {
    input: '<',
    replacement: '&lt',
  },
  {
    input: '>',
    replacement: '&gt',
  },
];

/**
 * Sanitizes the string.
 * @param input The unsanitized input.
 * @returns The sanitized output.
 */
export function sanitize(input: string): string {
  let output = input;
  for (const unallowedCharacter of unallowedCharacters) {
    output = output.replaceAll(
      unallowedCharacter.input,
      unallowedCharacter.replacement
    );
  }
  return output;
}
