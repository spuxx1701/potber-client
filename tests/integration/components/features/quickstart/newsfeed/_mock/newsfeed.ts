import Bookmark from 'potber-client/models/bookmark';
import PrivateMessage from 'potber-client/models/private-message';

export const newsfeedMocks = {
  unreadBookmark: new Bookmark({
    id: '123',
    newPostsCount: 5,
    postId: '123',
    thread: { id: '123', isClosed: false, pagesCount: 123, title: 'foo' },
    board: { id: '123', name: 'bar' },
  }),
  unreadPrivateMessages: new PrivateMessage({
    id: '123',
    title: 'Hello World!',
    folder: 'inbound',
    sender: {
      id: '123',
      name: 'Username',
    },
    unread: true,
  }),
};
