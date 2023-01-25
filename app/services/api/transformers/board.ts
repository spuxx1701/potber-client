import { Board, BoardPage } from '../types/board';
import { Thread } from '../types/thread';
import { transformThread } from './thread';
import { getAttributeValue, getNode, getNodeTextContent } from './utils';

export function transformBoard(boardXml: Element): Board {
  // Check whether the board was found and throw an error if it wasn't
  if (getNode('invalid-board', boardXml)) throw new Error('not-found');
  // Check whether we have access to the given board and throw an error if we don't
  if (boardXml.nodeName === 'no-access') throw new Error('no-access');
  let page: BoardPage | undefined;
  const threadsNode = getNode('threads', boardXml);
  if (threadsNode) {
    page = {
      page: parseInt(getAttributeValue('page', threadsNode)),
      stickiesCount: parseInt(getAttributeValue('with-stickies', threadsNode)),
      globalsCount: parseInt(getAttributeValue('with-globals', threadsNode)),
      threadsCount: parseInt(getAttributeValue('count', threadsNode)),
      threads: [],
    };
    for (const threadXml of threadsNode.childNodes) {
      page.threads.push(transformThread(threadXml) as unknown as Thread);
    }
  }
  const board = {
    id: boardXml.id,
    name: getNodeTextContent('name', boardXml),
    description: getNodeTextContent('description', boardXml),
    threadsCount: parseInt(
      getAttributeValue('value', getNode('number-of-threads', boardXml))
    ),
    repliesCount: parseInt(
      getAttributeValue('value', getNode('number-of-replies', boardXml))
    ),
    categoryId: getAttributeValue('id', getNode('in-category', boardXml)),
    page,
  } as Board;
  return board;
}
