import { Board, BoardItem, BoardItemXml, BoardXml } from '../types/board';
import { transformLastPost, transformFirstPost } from './post';

export function transformBoard(boardXml: BoardXml) {
  const threads: BoardItem[] = [];
  for (const boardItemXml of boardXml.children[5].childNodes) {
    threads.push(transformBoardItem(boardItemXml));
  }
  return {
    id: boardXml.id,
    name: boardXml.children[0].textContent,
    description: boardXml.children[1].textContent,
    threadsCount: parseInt(boardXml.children[2].attributes.value.value),
    repliesCount: parseInt(boardXml.children[3].attributes.value.value),
    category: {
      id: boardXml.children[4].attributes.id.value,
      name: boardXml.children[4].textContent,
    },
    page: {
      page: parseInt(boardXml.children[5].attributes.page.value),
      stickiesCount: parseInt(
        boardXml.children[5].attributes['with-stickies'].value
      ),
      globalsCount: parseInt(
        boardXml.children[5].attributes['with-globals'].value
      ),
      offset: parseInt(boardXml.children[5].attributes.offset.value),
      threadsCount: parseInt(boardXml.children[5].attributes.count.value),
      threads,
    },
  } as Board;
}

export function transformBoardItem(boardItemXml: BoardItemXml) {
  return {
    id: boardItemXml.id,
    title: boardItemXml.children[0].textContent,
    subtitle: boardItemXml.children[1].textContent,
    repliesCount: parseInt(boardItemXml.children[2].attributes.value),
    hitsCount: parseInt(boardItemXml.children[3].attributes.value),
    pagesCount: parseInt(boardItemXml.children[4].attributes.value),
    isClosed:
      boardItemXml.children[5].children[0].attributes.value.value === '1',
    isSticky:
      boardItemXml.children[5].children[1].attributes.value.value === '1',
    isImportant:
      boardItemXml.children[5].children[2].attributes.value.value === '1',
    isAnnouncement:
      boardItemXml.children[5].children[3].attributes.value.value === '1',
    isGlobal:
      boardItemXml.children[5].children[4].attributes.value.value === '1',
    isHidden:
      boardItemXml.children[5].children[5].attributes.value.value === '1',
    canClose:
      boardItemXml.children[5].children[6].attributes.value.value === '1',
    canHide:
      boardItemXml.children[5].children[7].attributes.value.value === '1',
    canSticky:
      boardItemXml.children[5].children[8].attributes.value.value === '1',
    canHidePosts:
      boardItemXml.children[5].children[9].attributes.value.value === '1',
    boardId: boardItemXml.children[6].attributes.value,
    firstPost: transformFirstPost(boardItemXml.children[7]),
    lastPost: transformLastPost(boardItemXml.children[8]),
  } as BoardItem;
}
