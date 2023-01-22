import { FirstPost, LastPost, Post } from '../types/post';
import { transformUser } from './user';
import { getAttributeValue, getNode, getNodeTextContent } from './utils';

export function transformPost(postXml: Element) {
  const post = {
    id: getAttributeValue('id', postXml),
    author: transformUser(getNode('user', postXml)),
    date: new Date(
      parseInt(getAttributeValue('timestamp', getNode('date', postXml))) * 1000
    ),
    title: getNodeTextContent('title', getNode('message', postXml)),
    icon: getAttributeValue('id', getNode('icon', postXml)),
    content: getNodeTextContent('content', getNode('message', postXml)),
    editedCount: parseInt(
      getAttributeValue('count', getNode('edited', getNode('message', postXml)))
    ),
    lastEdit: transformLastEdit(getNode('message', postXml)),
    threadId: getAttributeValue('id', getNode('in-thread', postXml)),
    boardId: getAttributeValue('id', getNode('in-board', postXml)),
    avatarUrl: getNodeTextContent('avatar', postXml),
  } as Post;
  return post;
}

export function transformFirstPost(firstPostXml: Element) {
  const postXml = firstPostXml.children[0];
  return {
    author: transformUser(getNode('user', postXml)),
    date: new Date(
      parseInt(getAttributeValue('timestamp', getNode('date', postXml))) * 1000
    ),
    icon: getAttributeValue('id', getNode('icon', postXml)),
    threadId: getAttributeValue('id', getNode('in-thread', postXml)),
    boardId: getAttributeValue('id', getNode('in-board', postXml)),
  } as FirstPost;
}

export function transformLastPost(lastPostXml: Element) {
  if (!lastPostXml) return undefined;
  const postXml = lastPostXml.children[0];
  return {
    author: transformUser(getNode('user', postXml)),
    date: new Date(
      parseInt(getAttributeValue('timestamp', getNode('date', postXml))) * 1000
    ),
    threadId: getAttributeValue('id', getNode('in-thread', postXml)),
    boardId: getAttributeValue('id', getNode('in-board', postXml)),
  } as LastPost;
}

function transformLastEdit(messageXml: Element) {
  const editedNode = getNode('edited', messageXml);
  if (editedNode) {
    const lastEditNode = getNode('lastedit', editedNode);
    if (lastEditNode) {
      return {
        user: transformUser(getNode('user', lastEditNode)),
        date: new Date(
          parseInt(
            getAttributeValue('timestamp', getNode('date', lastEditNode))
          ) * 1000
        ),
      };
    }
  }
  return undefined;
}
