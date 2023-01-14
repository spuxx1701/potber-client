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
  return {
    author: transformUser(
      firstPostXml.children[0].children[0] as any as UserXml
    ),
    date: new Date(
      parseInt(
        firstPostXml.children[0].children[1].attributes.timestamp.value
      ) * 1000
    ),
    iconId: firstPostXml.children[0].children[2].attributes.icon.value,
    threadId: firstPostXml.children[0].children[3].attributes.id.value,
    boardId: firstPostXml.children[0].children[4].attributes.id.value,
  } as FirstPost;
}

export function transformLastPost(lastPostXml: LastPostXml) {
  if (!lastPostXml) return undefined;
  return {
    author: transformUser(
      lastPostXml.children[0].children[0] as any as UserXml
    ),
    date: new Date(
      parseInt(lastPostXml.children[0].children[1].attributes.timestamp.value) *
        1000
    ),
    threadId: lastPostXml.children[0].children[2].attributes.id.value,
    boardId: lastPostXml.children[0].children[3].attributes.id.value,
  } as LastPost;
}
