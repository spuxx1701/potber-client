import { getDateFromUnixTimestamp } from 'potber/utils/misc';
import { Board } from '../types/board';
import {
  BoardCategory,
  BoardCategoryItemXml,
  BoardOverviewXml,
} from '../types/board-category';
import { LastPostXml } from '../types/post';
import { User } from '../types/user';
import { transformLastPost } from './post';
import { transformUser } from './user';

export function transformBoardCategories(xmlDocument: XMLDocument) {
  const boardCategoriesXml = (xmlDocument as any as BoardOverviewXml)
    .children[0].childNodes;
  const boardCategories: BoardCategory[] = [];
  for (const boardCategoryXml of boardCategoriesXml) {
    const boards: Board[] = [];
    if (boardCategoryXml.children[2]) {
      for (const boardCategoryItemXml of boardCategoryXml.children[2]
        .childNodes) {
        boards.push(transformBoardCategoryItem(boardCategoryItemXml));
      }
    }
    boardCategories.push({
      id: boardCategoryXml.id,
      name: boardCategoryXml.children[0].textContent,
      description: boardCategoryXml.children[1].textContent,
      boards,
    } as BoardCategory);
  }
  return boardCategories;
}

export function transformBoardCategoryItem(
  boardCategoryItemXml: BoardCategoryItemXml
) {
  const moderators: User[] = [];
  for (const moderatorXml of boardCategoryItemXml.children[6].childNodes) {
    moderators.push(transformUser(moderatorXml));
  }
  return {
    id: boardCategoryItemXml.id,
    name: boardCategoryItemXml.children[0].textContent,
    description: boardCategoryItemXml.children[1].textContent,
    threadsCount: parseInt(
      boardCategoryItemXml.children[2].attributes.value.value
    ),
    repliesCount: parseInt(
      boardCategoryItemXml.children[3].attributes.value.value
    ),
    category: {
      id: boardCategoryItemXml.children[4].attributes.id.value,
      name: boardCategoryItemXml.children[4].textContent,
    },
    lastPost: transformLastPost(
      boardCategoryItemXml.children[5] as any as LastPostXml
    ),
    moderators,
  } as Board;
}
