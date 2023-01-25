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
  const pageNode = getNode('threads', boardXml);
  if (pageNode) {
    page = {
      page: parseInt(getAttributeValue('page', getNode('page', pageNode))),
      stickiesCount: parseInt(
        getAttributeValue('with-stickies', getNode('threads', boardXml))
      ),
      globalsCount: parseInt(
        getAttributeValue('with-globals', getNode('threads', boardXml))
      ),
      threadsCount: parseInt(
        getAttributeValue('count', getNode('threads', boardXml))
      ),
      threads: [],
    };
    for (const xml of pageNode.childNodes) {
      page.threads.push(transformThread(xml) as unknown as Thread);
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
    category: {
      id: getAttributeValue('id', getNode('in-category', boardXml)),
      name: getNodeTextContent('in-category', boardXml) || undefined,
    },
    page,
  } as Board;
  return board;
}
