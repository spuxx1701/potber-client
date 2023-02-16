import Post from 'potber-client/models/post';

export const postMocks = {
  simple: {
    id: '1249813825',
    author: {
      id: '3035',
      groupId: '3',
      name: '[FGS]E-RaZoR',
    },
    date: '2023-01-14T22:47:40.000Z',
    message: 'Gill Sans als Font, ich glaube es hackt. Verdana!',
    editedCount: 0,
    threadId: '219289',
    boardId: '14',
    avatarUrl: './avatare/upload/U3035--e-razor.png',
    contentHidden: false,
  } as Post,
  withOldAvatarUrl: {
    id: '1249840956',
    author: {
      id: '6379',
      groupId: '3',
      name: 'Shooter',
    },
    date: '2023-02-15T10:19:50.000Z',
    icon: '2',
    message:
      'Ich weiss, es ist mit dem Titel des aktuellen Brunches sehr schwierig im Moment, aber das hier ist tatsächlich der "Ich hab was neues" Thread.',
    editedCount: 0,
    threadId: '219254',
    boardId: '14',
    avatarUrl: 'avatare/oldb/shooter.gif',
    contentHidden: false,
  } as Post,
  withImages: {
    id: '1249840965',
    author: {
      id: '1340725',
      groupId: '3',
      name: 'Drosselmeyer',
    },
    date: '2023-02-15T10:32:11.000Z',
    icon: '37',
    message:
      '[img]https://media.tenor.com/zn_bDWVMmekAAAAC/order-speaker.gif[/img]\r\nhier fehlte noch ein beklopptes Gif \r\n---\r\n[img]https://i.imgur.com/yPffB2E.jpg[/img]\r\n2x Brunnen A3 Skizzenblock holzfrei, Geodreieck groß,\r\n3 Faber Castell Druckbleistifte, Copics Porträt(Geschenk von meiner besseren Hälfte)\r\n[img]https://i.imgur.com/6KK8jtw.jpg[/img]\r\nA3 Zeichenplatte \r\nZirkel\r\nvon Amazon',
    editedCount: 1,
    lastEdit: {
      user: {
        id: '1340725',
        name: 'Drosselmeyer',
      },
      date: '2023-02-15T16:39:33.000Z',
    },
    threadId: '219254',
    boardId: '14',
    avatarUrl: './avatare/upload/U1340725--drosselmeyer.gif',
    contentHidden: false,
  } as Post,
};
