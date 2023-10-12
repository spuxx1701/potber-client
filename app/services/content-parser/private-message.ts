/**
 * Parses the contents of privat messages.
 * @param input The input string.
 * @returns The output.
 */
export function parsePrivateMessageHtml(input: string) {
  const EMOJI_LOCATION_REPLACEMENT = {
    input: '/bb/pm/img/smilies/',
    output: '/images/private-message-emojis/',
  };

  let output = input;
  output = output.replaceAll(
    EMOJI_LOCATION_REPLACEMENT.input,
    EMOJI_LOCATION_REPLACEMENT.output,
  );
  output = output.replaceAll(/<br \/>/g, '');
  return output;
}
