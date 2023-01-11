import { User, UserXml } from '../types/user';

export function transformUser(userXml: UserXml) {
  return {
    id: userXml.attributes.id.value,
    groupId: userXml.attributes['group-id'].value,
    name: userXml.childNodes[0].textContent,
  } as User;
}
