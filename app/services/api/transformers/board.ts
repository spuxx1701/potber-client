import {
  Board,
  BoardCategory,
  BoardCategoryXml,
  BoardXml,
  GlobalBoardXml,
} from '../types/board';
import { Post } from '../types/post';
import { transformUser } from './user';
import { transformPost } from './post';
import { User } from '../types/user';
import { getDateFromUnixTimestamp } from 'potber/utils/misc';

export function transformBoardCategories(xmlDocument: XMLDocument) {
  const boardCategoriesXml = (xmlDocument as any as GlobalBoardXml).children[0]
    .childNodes;
  const boardCategories: BoardCategory[] = [];
  for (const boardCategoryXml of boardCategoriesXml) {
    const boards: Board[] = [];
    if (boardCategoryXml.children[2]) {
      for (const boardXml of boardCategoryXml.children[2].childNodes) {
        boards.push(transformBoard(boardXml));
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

export function transformBoard(boardXml: BoardXml) {
  const moderators: User[] = [];
  for (const moderatorXml of boardXml.children[6].childNodes) {
    moderators.push(transformUser(moderatorXml));
  }
  return {
    id: boardXml.id,
    name: boardXml.children[0].textContent,
    description: boardXml.children[1].textContent,
    numberOfThreads: parseInt(boardXml.children[2].attributes.value.value),
    numberOfReplies: parseInt(boardXml.children[3].attributes.value.value),
    category: {
      id: boardXml.children[4].attributes.id.value,
      name: boardXml.children[4].textContent,
    },
    lastPost: {
      author: {
        id: boardXml.children[5].children[0].children[0].attributes.id.value,
        name: boardXml.children[5].children[0].children[0].textContent,
      },
      date: getDateFromUnixTimestamp(
        boardXml.children[5].children[0].children[1].attributes.timestamp.value
      ),
      board: {
        id: boardXml.children[5].children[0].children[2].attributes.id.value,
        name: boardXml.children[5].children[0].children[2].textContent,
      },
      thread: {
        id: boardXml.children[5].children[0].children[3].attributes.id.value,
        name: boardXml.children[5].children[0].children[3].textContent,
      },
    },
    moderators,
  } as Board;
}
