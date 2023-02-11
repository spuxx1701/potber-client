import { transformThread } from 'potber-client/services/api/transformers/thread';
import { FirstPost, Post } from 'potber-client/services/api/types/post';
import { Thread, ThreadPage } from 'potber-client/services/api/types/thread';
import { setupTest } from 'potber-client/tests/helpers';
import { parseXmlString } from 'potber-client/tests/test-utils';
import { module, test } from 'qunit';
import mockData from './mock-data';

module('Unit | Service | API | Transformer | Thread', function (hooks) {
  setupTest(hooks);

  test("Transforms a thread from '/threads.php' endpoint.", function (assert) {
    const actual = transformThread(parseXmlString(mockData.full).children[0]);
    const expected: Thread = {
      id: '219289',
      title: 'Foo',
      subtitle: 'Bar',
      repliesCount: 123,
      hitsCount: 456,
      pagesCount: 3,
      isClosed: false,
      isSticky: true,
      isImportant: false,
      isAnnouncement: true,
      isGlobal: false,
      boardId: '14',
      firstPost: {
        author: {
          id: '123',
          name: 'Ameisenfutter',
          groupId: undefined,
        },
        boardId: '14',
        date: new Date(1673732641 * 1000),
        icon: '37',
        threadId: '219289',
      } as FirstPost,
      lastPost: undefined,
      page: {
        number: 1,
        postCount: 2,
        offset: 0,
        posts: [
          {
            id: '1249813752',
            author: {
              id: '123',
              name: 'Ameisenfutter',
              groupId: '3',
            },
            date: new Date(1673732641 * 1000),
            title: 'Foo',
            icon: '37',
            content: 'Hello World!',
            editedCount: 17,
            lastEdit: {
              user: {
                id: '123',
                name: 'Ameisenfutter',
                groupId: undefined,
              },
              date: new Date(1673953573 * 1000),
            },
            avatarUrl: './avatare/upload/U1268185--small.png',
            threadId: '219289',
            boardId: '14',
          },
          {
            id: '1249813756',
            author: {
              id: '456',
              name: 'World',
              groupId: '3',
            },
            date: new Date(1673732787 * 1000),
            title: '',
            icon: undefined,
            content: 'Hello Ameisenfutter!',
            editedCount: 0,
            lastEdit: undefined,
            avatarUrl: './avatare/upload/U1268185--small.png',
            threadId: '219289',
            boardId: '14',
          },
        ] as Post[],
      } as ThreadPage,
    };
    assert.deepEqual(
      actual,
      expected,
      'Thread with page is transformed properly.'
    );
  });
});
