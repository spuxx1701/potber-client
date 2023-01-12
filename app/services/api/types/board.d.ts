import { User, UserXml } from './user';

export interface Board {
  id: string;
  name: string;
  description: string;
  numberOfThreads: number;
  numberOfReplies: number;
  category: {
    id: string;
    name: string;
  };
  lastPost: {
    author: {
      id: string;
      name: string;
    };
    date: Date;
    thread: {
      id: string;
      name: string;
    };
    board: {
      id: string;
      name: string;
    };
  };
  moderators: User[];
}

export interface BoardCategory {
  id: string;
  name: string;
  description: string;
  boards: Board[];
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
      nodeName: 'lastPost';
      children: {
        '0': {
          nodeName: 'post';
          children: {
            '0': {
              nodeName: 'user';
              textContent: string;
              attributes: {
                id: {
                  value: string;
                };
              };
            };
            '1': {
              nodeName: 'timestamp';
              attributes: {
                timestamp: {
                  value: string;
                };
              };
            };
            '2': {
              nodeName: 'in-thread';
              textContent: string;
              attributes: {
                id: {
                  value: string;
                };
              };
            };
            '3': {
              nodeName: 'in-board';
              textContent: string;
              attributes: {
                id: {
                  value: string;
                };
              };
            };
          };
        };
      };
    };
    '6': {
      nodeName: 'moderators';
      childNodes: UserXml[];
    };
  };
};

export type BoardCategoryXml = {
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
      nodeName: 'boards';
      childNodes: BoardXml[];
    };
  };
};

export type GlobalBoardXml = {
  children: {
    '0': {
      childNodes: BoardCategoryXml[];
    };
  };
};
