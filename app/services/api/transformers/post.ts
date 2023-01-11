import { Post, PostXml } from '../types/post';
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
