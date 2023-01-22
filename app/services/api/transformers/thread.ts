import { Thread, ThreadPage } from '../types/thread';
import { transformFirstPost, transformLastPost, transformPost } from './post';
import { getAttributeValue, getNode, getNodeTextContent } from './utils';

export function transformThread(threadXml: any) {
  const thread = {
    id: getAttributeValue('id', threadXml),
    title: getNodeTextContent('title', threadXml),
    subtitle: getNodeTextContent('subtitle', threadXml),
    repliesCount: parseInt(
      getAttributeValue('value', getNode('number-of-replies', threadXml))
    ),
    hitsCount: parseInt(
      getAttributeValue('value', getNode('number-of-hits', threadXml))
    ),
    pagesCount: parseInt(
      getAttributeValue('value', getNode('number-of-pages', threadXml))
    ),
    isClosed: getPostFlag('is-closed', threadXml),
    isSticky: getPostFlag('is-sticky', threadXml),
    isImportant: getPostFlag('is-important', threadXml),
    isAnnouncement: getPostFlag('is-announcement', threadXml),
    isGlobal: getPostFlag('is-global', threadXml),
    boardId: getAttributeValue('id', getNode('in-board', threadXml)),
    firstPost: transformFirstPost(getNode('firstpost', threadXml)),
    lastPost: transformLastPost(getNode('lastpost', threadXml)),
    page: transformThreadPage(getNode('posts', threadXml)),
  } as Thread;
  return thread;
}

function transformThreadPage(threadPageXml: Element) {
  if (!threadPageXml) return undefined;
  const posts = [];
  for (const postXml of threadPageXml.childNodes) {
    posts.push(transformPost(postXml as Element));
  }
  return {
    pageNumber: parseInt(getAttributeValue('page', threadPageXml)),
    offset: parseInt(getAttributeValue('offset', threadPageXml)),
    postCount: parseInt(getAttributeValue('count', threadPageXml)),
    posts,
  } as ThreadPage;
}

function getPostFlag(flag: string, threadXml: Element) {
  const flagsNode = getNode('flags', threadXml);
  if (flagsNode && flagsNode.childNodes?.length > 0) {
    const flagValue = getAttributeValue('value', getNode(flag, flagsNode));
    if (flagValue) return flagValue === '1';
  }
  return undefined;
}
