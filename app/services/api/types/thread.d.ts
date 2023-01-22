import { FirstPost, LastPost, Post } from './post';

export interface Thread {
  id: string;
  title: string;
  subtitle: string;
  repliesCount: number;
  hitsCount: number;
  pagesCount: number;
  isClosed: boolean;
  isSticky: boolean;
  isImportant: boolean;
  isAnnouncement: boolean;
  isGlobal: boolean;
  boardId: string;
  firstPost?: FirstPost;
  lastPost?: LastPost;
  page?: ThreadPage;
}

export interface ThreadPage {
  pageNumber: number;
  postCount: number;
  offset: number;
  posts: Post[];
}
