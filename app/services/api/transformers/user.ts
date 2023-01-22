import { User } from '../types/user';
import { getAttributeValue, getNodeTextContent } from './utils';

export function transformUser(userXml: Element) {
  const user = {
    id: getAttributeValue('id', userXml),
    groupId: getAttributeValue('group-id', userXml),
    name: userXml.textContent || getNodeTextContent('name', userXml),
  } as User;
  return user;
}
