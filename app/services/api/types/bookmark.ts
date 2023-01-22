export interface BookmarksSummary {
  userId: string;
  count: number;
  newPostsCount: number;
  bookmarks: Bookmark[];
}

export interface Bookmark {
  id: string;
  newPostsCount: number;
  postId: string;
  thread: {
    id: string;
    title: string;
    isClosed: boolean;
    pagesCount: number;
  };
  board: {
    id: string;
    name: string;
  };
  removeToken: string;
}
