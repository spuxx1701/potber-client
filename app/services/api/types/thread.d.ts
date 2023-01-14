import { FirstPost, Post, PostXml } from './post';

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
  page?: ThreadPage | null;
}

export interface ThreadXml {
  id: string;
  children: {
    '0': {
      nodeName: 'title';
      textContent: string;
    };
    '1': {
      nodeName: 'subtitle';
      textContent: string;
    };
    '2': {
      nodeName: 'number-of-replies';
      attributes: { value: { value: string } };
    };
    '3': {
      nodeName: 'number-of-hits';
      attributes: { value: { value: string } };
    };
    '4': {
      nodeName: 'number-of-pages';
      attributes: { value: { value: string } };
    };
    '5': {
      nodeName: 'flags';
      innerHtml: string;
    };
    '6': {
      nodeName: 'in-board';
      attributes: { id: { value: string } };
    };
    '7': {
      nodeName: 'first-post';
      children: [PostXml];
    };
    '8': {
      nodeName: 'posts';
      attributes: {
        page: { value: string };
        offset: { value: string };
        count: { value: string };
      };
      children: PostXml[];
    };
  };
}

export interface ThreadPage {
  pageNumber: number;
  offset: number;
  postCount: number;
  posts: Post[];
}

export interface ThreadPageXml {
  attributes: {
    page: { value: string };
    offset: { value: string };
    count: { value: string };
  };
  childNodes: PostXml[];
}
