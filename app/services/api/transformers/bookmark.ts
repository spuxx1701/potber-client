import { Bookmark } from '../types/bookmark';
import { getNode } from './utils';

export function parseBookmarks(xmlDocument: XMLDocument): Bookmark[] | null {
  console.log(xmlDocument.children);
  if (getNode('not-logged-in', xmlDocument)) {
    return null;
  } else {
    return [];
  }
}
