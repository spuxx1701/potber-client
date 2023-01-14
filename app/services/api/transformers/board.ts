import { Board, BoardItem, BoardItemXml, BoardXml } from '../types/board';
import { transformLastPost, transformFirstPost } from './post';
import { getAttributeValue, getNode } from './utils';

export function transformBoard(boardXml: BoardXml) {
  const threads: BoardItem[] = [];
  for (const xml of boardXml.children[5].childNodes) {
    threads.push(transformBoardItem(xml));
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

export function transformBoardItem(xml: BoardItemXml) {
  return {
    id: xml.id,
    title: xml.children[0].textContent,
    subtitle: xml.children[1].textContent,
    repliesCount: parseInt(
      getAttributeValue('value', getNode('number-of-replies', xml))
    ),
    hitsCount: parseInt(
      getAttributeValue('value', getNode('number-of-hits', xml))
    ),
    pagesCount: parseInt(
      getAttributeValue('value', getNode('number-of-pages', xml))
    ),
    isClosed: xml.children[5].children[0].attributes.value.value === '1',
    isSticky: xml.children[5].children[1].attributes.value.value === '1',
    isImportant: xml.children[5].children[2].attributes.value.value === '1',
    isAnnouncement: xml.children[5].children[3].attributes.value.value === '1',
    isGlobal: xml.children[5].children[4].attributes.value.value === '1',
    isHidden: xml.children[5].children[5].attributes.value.value === '1',
    canClose: xml.children[5].children[6].attributes.value.value === '1',
    canHide: xml.children[5].children[7].attributes.value.value === '1',
    canSticky: xml.children[5].children[8].attributes.value.value === '1',
    canHidePosts: xml.children[5].children[9].attributes.value.value === '1',
    boardId: xml.children[6].attributes.value,
    firstPost: transformFirstPost(xml.children[7]),
    lastPost: transformLastPost(xml.children[8]),
  } as BoardItem;
}
