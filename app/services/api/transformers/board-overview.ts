import { Board } from '../types/board';
import { BoardCategory } from '../types/board-overview';
import { transformBoard } from './board';
import { getNode, getNodeTextContent } from './utils';

/**
 * Transforms the result of the 'boards.php' endpoint and returns an array
 * of baord categories.
 * @param xmlDocument The xml document.
 * @returns The board categories.
 */
export function transformBoardOverview(xmlDocument: XMLDocument) {
  const boardCategoriesXml = getNode('categories', xmlDocument) as Element;
  const boardCategories: BoardCategory[] = [];
  for (const boardCategoryXml of boardCategoriesXml.childNodes) {
    const boards: Board[] = [];
    const boardsNode = getNode('boards', boardCategoryXml);
    if (boardsNode) {
      for (const boardCategoryItemXml of boardsNode.childNodes) {
        boards.push(transformBoard(boardCategoryItemXml));
      }
    }
    boardCategories.push({
      id: (boardCategoryXml as Element).id,
      name: getNodeTextContent('name', boardCategoryXml),
      description: getNodeTextContent('description', boardCategoryXml),
      boards,
    } as BoardCategory);
  }
  return boardCategories;
}
