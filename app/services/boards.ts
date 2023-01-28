import { service } from '@ember/service';
import ApiService from './api';
import MessagesService from './messages';
import { transformBoard } from './api/transformers/board';
import { transformBoardOverview } from './api/transformers/board-overview';

export default class BoardsService extends ApiService {
  @service declare messages: MessagesService;

  /**
   * Calls 'boards.php' and returns all board categories with their boards.
   * @returns The board categories.
   */
  async getBoardCategories() {
    this.messages.log(`Retrieving board categories.`, {
      context: this.constructor.name,
    });
    const query = `boards.php`;
    const xmlDocument = await this.fetch(query);
    return transformBoardOverview(xmlDocument);
  }

  /**
   * Calls 'board.php' and returns the board.
   * @param boardId The board ID.
   * @param page (optional) The page number.
   * @returns The board.
   */
  async getBoard(boardId: string, page?: number) {
    this.messages.log(`Retrieving board '${boardId}' (page: ${page}).`, {
      context: this.constructor.name,
    });
    let query = `board.php?BID=${boardId}`;
    if (page) query += `&page=${page}`;
    const xmlDocument = await this.fetch(query);
    if (!xmlDocument.children[0]) throw new Error('not-found');
    const board = transformBoard(xmlDocument.children[0]);
    return board;
  }
}
