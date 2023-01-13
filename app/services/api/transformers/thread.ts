import { Thread, ThreadPage, ThreadPageXml, ThreadXml } from '../types/thread';
import { transformPost } from './post';

export function transformThread(xmlDocument: XMLDocument) {
  const threadXml = xmlDocument.children[0] as any as ThreadXml;
  const thread = {
    id: threadXml.id,
    title: threadXml.children[0].textContent,
    subtitle: threadXml.children[1].textContent,
    numberOfReplies: parseInt(threadXml.children[2].attributes.value),
    numberOfHits: parseInt(threadXml.children[3].attributes.value),
    numberOfPages: parseInt(threadXml.children[4].attributes.value),
    isClosed: false,
    isSticky: false,
    isImportant: false,
    isAnnouncement: false,
    isGlobal: false,
    boardId: threadXml.children[6].attributes.value,
    page: transformThreadPage(threadXml.children[8] as any as ThreadPageXml),
  } as Thread;
  return thread;
}

export function transformThreadPage(threadPageXml: ThreadPageXml) {
  const posts = [];
  for (const postXml of threadPageXml.childNodes) {
    posts.push(transformPost(postXml));
  }
  return {
    pageNumber: parseInt(threadPageXml.attributes.page.value),
    offset: parseInt(threadPageXml.attributes.offset.value),
    postCount: parseInt(threadPageXml.attributes.count.value),
    posts,
  } as ThreadPage;
}
