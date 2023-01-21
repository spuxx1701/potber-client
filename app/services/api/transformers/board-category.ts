import { Board } from '../types/board';
import {
  BoardCategory,
  BoardCategoryItemXml,
  BoardOverviewXml,
} from '../types/board-category';
import { User } from '../types/user';
import { transformLastPost } from './post';
import { transformUser } from './user';
import { getNode } from './utils';

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
  const moderatorNode = getNode('moderators', boardCategoryItemXml);
  if (moderatorNode) {
    for (const moderatorXml of moderatorNode.childNodes) {
      moderators.push(transformUser(moderatorXml));
    }
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
    lastPost: transformLastPost(getNode('lastpost', boardCategoryItemXml)),
    moderators,
  } as Board;
}
