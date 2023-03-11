import Bookmark from 'potber-client/models/bookmark';

export const newsfeedMocks = {
  unreadBookmark: new Bookmark({
    id: '123',
    newPostsCount: 5,
    postId: '123',
    thread: { id: '123', isClosed: false, pagesCount: 123, title: 'foo' },
    board: { id: '123', name: 'bar' },
  }),
};
