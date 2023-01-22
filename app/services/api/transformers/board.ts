import { Board } from '../types/board';
import { Thread } from '../types/thread';
import { transformThread } from './thread';
import { getAttributeValue, getNode, getNodeTextContent } from './utils';

export function transformBoard(boardXml: Element) {
  const threads: Thread[] = [];
  const pageNode = getNode('threads', boardXml);
  if (pageNode) {
    for (const xml of pageNode.childNodes) {
      threads.push(transformThread(xml) as unknown as Thread);
    }
  }
  const board = {
    id: boardXml.id,
    name: getNode('name', boardXml).textContent,
    description: getNodeTextContent('description', boardXml),
    threadsCount: parseInt(
      getAttributeValue('value', getNode('number-of-threads', boardXml))
    ),
    repliesCount: parseInt(
      getAttributeValue('value', getNode('number-of-replies', boardXml))
    ),
    category: {
      id: getAttributeValue('id', getNode('in-category', boardXml)),
      name: getNodeTextContent('in-category', boardXml),
    },
    page: {
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
      threads,
    },
  } as Board;
  return board;
}
