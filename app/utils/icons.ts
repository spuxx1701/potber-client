import { IconName } from '@fortawesome/fontawesome-common-types';
import {
  EmojiKey,
  PostIconKey,
  emojis,
  fontAwesomeEmojiPaths,
  postIcons,
} from 'potber-client/config/icons.config';
import { isChristmasSeason } from './misc';

/**
 * Returns an icon's filename by its key. Will take the current date into account and
 * return the christmas version if required and possible.
 */
export function getPostIconFilename(key: PostIconKey): string | null {
  const postIcon = postIcons.find((postIcon) => postIcon.key === key);
  if (!postIcon) throw Error(`Cannot find postIcon with key '${key}'.`);
  return isChristmasSeason() && postIcon.christmasFilename
    ? postIcon.christmasFilename
    : postIcon.filename;
}

/**
 * Returns an emoji by its key. Will take che current date into account
 * and return thechristmas version if required and possible.
 */
export function getEmojiFilename(key: EmojiKey): string | null {
  const emoji = emojis.find((emoji) => emoji.key === key);
  if (!emoji) throw Error(`Cannot find emoji with key '${key}'.`);
  return isChristmasSeason() && emoji.christmasFilename
    ? emoji.christmasFilename
    : emoji.filename;
}

/**
 * Returns a random font awesome emoji icon path.
 * @returns A font awesome icon path.
 */
export function getRandomEmojiIcon(): IconName {
  return fontAwesomeEmojiPaths[
    Math.floor(Math.random() * fontAwesomeEmojiPaths.length)
  ] as IconName;
}
