import { htmlSafe } from '@ember/template';
import bbCodeParser from 'js-bbcode-parser';

export function parsePostContent(input: string) {
  const output = bbCodeParser.parse(input);
  return htmlSafe(output);
}
