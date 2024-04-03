import { PrivateMessage } from 'potber-client/services/api/models/private-message';

export const privateMessageMocks = {
  inbound: [
    {
      id: '1',
      title: 'Ungelesene Nachricht',
      content: 'Das ist eine ungelesene Nachricht.',
      unread: true,
      date: '13:51 20.07.2023',
      sender: {
        id: '123',
        name: 'User 1',
      },
    },
    {
      id: '2',
      title: 'Wichtige Nachricht',
      content: 'Das ist eine wichtige Nachricht.',
      important: true,
      date: '11:20 20.07.2023',
      sender: {
        id: '456',
        name: 'User 2',
      },
    },
    {
      id: '3',
      title: 'Gelesene Nachricht',
      content: 'Das ist eine bereits gelesene Nachricht.',
      date: '00:56 02.12.2022',
      sender: {
        id: '123',
        name: 'User 1',
      },
    },
  ] as Partial<PrivateMessage>[],
};
