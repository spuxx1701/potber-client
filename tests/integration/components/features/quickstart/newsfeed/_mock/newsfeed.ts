import { Bookmark } from 'potber-client/services/api/models/bookmark';
import { PrivateMessage } from 'potber-client/services/api/models/private-message';

export const newsfeedMocks = {
  unreadBookmark: new Bookmark(
    {
      id: '123',
      newPostsCount: 5,
      postId: '123',
      thread: { id: '123', isClosed: false, pagesCount: 123, title: 'foo' },
      board: { id: '123', name: 'bar' },
    },
    {} as any,
  ),
  unreadPrivateMessages: new PrivateMessage(
    {
      id: '123',
      title: 'Hello World!',
      date: '17:21 01.01.2021',
      folder: 'inbound',
      important: false,
      unread: true,
      sender: {
        id: '123',
        name: 'Username',
      },
    },
    {} as any,
  ),
};
