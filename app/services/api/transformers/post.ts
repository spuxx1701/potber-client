import {
  FirstPost,
  FirstPostXml,
  LastPost,
  LastPostXml,
  Post,
  PostXml,
} from '../types/post';
import { UserXml } from '../types/user';
import { transformUser } from './user';
import { getAttributeValue, getNode } from './utils';

export function transformPost(postXml: PostXml) {
  return {
    id: postXml.attributes.id.value,
    author: transformUser(postXml.children[0] as any as UserXml),
    date: new Date(
      parseInt(postXml.children[1].attributes.timestamp.value) * 1000
    ),
    title: postXml.children[2].children[2].textContent,
    content: postXml.children[2].children[1].textContent,
    editedCount: parseInt(
      postXml.children[2].children[0].attributes.count.value
    ),
    threadId: postXml.children[4].attributes.id.value,
    boardId: postXml.children[5].attributes.id.value,
  } as Post;
}

export function transformFirstPost(firstPostXml: FirstPostXml) {
  const post = firstPostXml.children[0];
  return {
    author: transformUser(
      firstPostXml.children[0].children[0] as any as UserXml
    ),
    date: new Date(
      parseInt(
        firstPostXml.children[0].children[1].attributes.timestamp.value
      ) * 1000
    ),
    icon: getAttributeValue('id', getNode('icon', post)),
    threadId: getAttributeValue('id', getNode('in-thread', post)),
    boardId: getAttributeValue('id', getNode('in-board', post)),
  } as FirstPost;
}

export function transformLastPost(lastPostXml: LastPostXml) {
  if (!lastPostXml) return undefined;
  const post = lastPostXml.children[0];
  return {
    author: transformUser(
      lastPostXml.children[0].children[0] as any as UserXml
    ),
    date: new Date(
      parseInt(lastPostXml.children[0].children[1].attributes.timestamp.value) *
        1000
    ),
    threadId: getAttributeValue('id', getNode('in-thread', post)),
    boardId: getAttributeValue('id', getNode('in-board', post)),
  } as LastPost;
}
