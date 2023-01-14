import { Board } from './board';
import { UserXml } from './user';

export interface BoardCategory {
  id: string;
  name: string;
  description: string;
  boards: Board[];
}

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
      childNodes: BoardCategoryItemXml[];
    };
  };
};

export type BoardOverviewXml = {
  children: {
    '0': {
      childNodes: BoardCategoryXml[];
    };
  };
};

export type BoardCategoryItemXml = {
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
