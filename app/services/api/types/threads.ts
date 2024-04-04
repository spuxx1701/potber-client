import * as Posts from './posts';

export interface Page {
  number: number;
  postCount: number;
  offset: number;
  posts: Posts.Read[];
}

export interface Read {
  id: string;
  title: string;
  subtitle?: string;
  boardId: string;
  repliesCount: number;
  hitsCount: number;
  pagesCount: number;
  isClosed: boolean;
  isSticky: boolean;
  isImportant: boolean;
  isAnnouncement: boolean;
  isGlobal: boolean;
  firstPost?: Posts.Preview;
  lastPost?: Posts.Preview;
  page?: Page;
}

export interface Create {
  boardId: string;
  title: string;
  tags?: string[];
  openingPost: OpeningPost;
}

export interface OpeningPost {
  title?: string;
  icon?: string;
  message: string;
  convertUrls?: boolean;
  disableBbCode?: boolean;
  disableEmojis?: boolean;
}
