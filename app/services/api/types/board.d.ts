import { FirstPost, FirstPostXml, LastPost, LastPostXml } from './post';
import { Thread } from './thread';
import { User } from './user';

export interface Board {
  id: string;
  name: string;
  description: string;
  threadsCount: number;
  repliesCount: number;
  category: {
    id: string;
    name: string;
  };
  lastPost?: LastPost;
  moderators?: User[];
  page?: BoardPage;
}

export interface BoardPage {
  page: number;
  stickiesCount: number;
  globalsCount: number;
  offset: number;
  threadsCount: number;
  threads: Thread[];
}

export interface BoardItem {
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
  isHidden: boolean;
  canClose: boolean;
  canHide: boolean;
  canSticky: boolean;
  canHidePosts: boolean;
  boardId: string;
  firstPost: FirstPost;
  lastPost?: LastPost;
}

export type BoardXml = {
  id: string;
  children: {
    '0': {
      nodeName: 'name';
      textContent: string;
    };
    '1': {
      nodeName: 'description';
      textContent: string;
    };
    '2': {
      nodeName: 'number-of-threads';
      attributes: {
        value: {
          value: string;
        };
      };
    };
    '3': {
      nodeName: 'number-of-replies';
      attributes: {
        value: {
          value: string;
        };
      };
    };
    '4': {
      nodeName: 'in-category';
      textContent: string;
      attributes: {
        id: {
          value: string;
        };
      };
    };
    '5': {
      nodeName: 'threads';
      attributes: {
        'with-stickies': {
          value: string;
        };
        'with-globals': {
          value: string;
        };
        page: {
          value: string;
        };
        offset: {
          value: string;
        };
        count: {
          value: string;
        };
      };
      childNodes: BoardItemXml[];
    };
  };
};

export interface BoardItemXml {
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
      attributes: { value: string };
    };
    '3': {
      nodeName: 'number-of-hits';
      attributes: { value: string };
    };
    '4': {
      nodeName: 'number-of-pages';
      attributes: { value: string };
    };
    '5': {
      nodeName: 'flags';
      children: {
        '0': {
          nodeName: 'is-closed';
          attributes: {
            value: { value: string };
          };
        };
        '1': {
          nodeName: 'is-sticky';
          attributes: {
            value: { value: string };
          };
        };
        '2': {
          nodeName: 'is-important';
          attributes: {
            value: { value: string };
          };
        };
        '3': {
          nodeName: 'is-announcement';
          attributes: {
            value: { value: string };
          };
        };
        '4': {
          nodeName: 'is-global';
          attributes: {
            value: { value: string };
          };
        };
        '5': {
          nodeName: 'is-hidden';
          attributes: {
            value: { value: string };
          };
        };
        '6': {
          nodeName: 'can-close';
          attributes: {
            value: { value: string };
          };
        };
        '7': {
          nodeName: 'can-hide';
          attributes: {
            value: { value: string };
          };
        };
        '8': {
          nodeName: 'can-sticky';
          attributes: {
            value: { value: string };
          };
        };
        '9': {
          nodeName: 'can-hide-posts';
          attributes: {
            value: { value: string };
          };
        };
      };
    };
    '6': {
      nodeName: 'in-board';
      attributes: { value: string };
    };
    '7': FirstPostXml;
    '8': LastPostXml;
  };
}
