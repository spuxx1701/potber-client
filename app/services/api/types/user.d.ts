export interface User {
  id: string;
  groupId: string | undefined;
  name: string;
}

export interface UserXml {
  attributes: {
    id: { value: string };
    'group-id': { value: string };
  };
  childNodes: [
    {
      nodeName: '#cdata-section';
      textContent: string; // The user name
    }
  ];
}
