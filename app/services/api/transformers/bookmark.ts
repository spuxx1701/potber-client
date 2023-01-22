import { Bookmark, BookmarksSummary } from '../types/bookmark';
import { getAttributeValue, getNode, getNodeTextContent } from './utils';

export function transformBookmarksSummary(
  xmlDocument: XMLDocument
): BookmarksSummary | null {
  const bookmarkSummaryNode = getNode('bookmarks', xmlDocument);
  if (!bookmarkSummaryNode) return null;
  if (bookmarkSummaryNode) {
    const bookmarks: Bookmark[] = [];
    if (bookmarkSummaryNode.childNodes.length > 0) {
      for (const bookmarkNode of bookmarkSummaryNode.childNodes) {
        if (bookmarkNode.nodeName !== 'bookmark') continue;
        const bookmark: Bookmark = {
          id: getAttributeValue('BMID', bookmarkNode),
          newPostsCount: parseInt(getAttributeValue('newposts', bookmarkNode)),
          postId: getAttributeValue('PID', bookmarkNode),
          thread: {
            id: getAttributeValue('TID', getNode('thread', bookmarkNode)),
            title: getNodeTextContent('thread', bookmarkNode),
            isClosed:
              getAttributeValue('closed', getNode('thread', bookmarkNode)) ===
              '1',
            pagesCount: parseInt(
              getAttributeValue('pages', getNode('thread', bookmarkNode))
            ),
          },
          board: {
            id: getAttributeValue('BID', getNode('board', bookmarkNode)),
            name: getNodeTextContent('board', bookmarkNode),
          },
          removeToken: getAttributeValue(
            'value',
            getNode('token-removebookmark', bookmarkNode)
          ),
        };
        bookmarks.push(bookmark);
      }
    }
    const bookmarkSummary: BookmarksSummary = {
      userId: getAttributeValue('current-user-id', bookmarkSummaryNode),
      count: parseInt(getAttributeValue('count', bookmarkSummaryNode)),
      newPostsCount: parseInt(
        getAttributeValue('newposts', bookmarkSummaryNode)
      ),
      bookmarks,
    };
    return bookmarkSummary;
  } else {
    return null;
  }
}
