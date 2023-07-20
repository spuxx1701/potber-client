export function parsePrivateMessageHtml(input: string) {
  let output = input;
  output = output.replaceAll(/<br \/>/g, '');
  return output;
}
