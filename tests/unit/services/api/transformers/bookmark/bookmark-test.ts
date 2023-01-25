import { transformBookmarksSummary } from 'potber/services/api/transformers/bookmark';
import { BookmarksSummary } from 'potber/services/api/types/bookmark';
import { setupTest } from 'potber/tests/helpers';
import { parseXmlString } from 'potber/tests/test-utils';
import { module, test } from 'qunit';
import mockData from './mock-data';

module('Unit | Service | API | Transformer | Bookmark', function (hooks) {
  setupTest(hooks);

  test('Transforms the bookmarks summary.', function (assert) {
    const actual = parseXmlString(mockData.normal);
    const expected: BookmarksSummary = {
      userId: '123',
      count: 3,
      newPostsCount: 6,
      bookmarks: [
        {
          id: '1',
          newPostsCount: 0,
          postId: '1249805857',
          thread: {
            id: '199729',
            isClosed: false,
            pagesCount: 131,
            title: 'Der Grafikkarten-Thread',
          },
          board: {
            id: '10',
            name: 'Hardware & Netzwerk',
          },
          removeToken: '123',
        },
        {
          id: '2',
          newPostsCount: 6,
          postId: '1249820038',
          thread: {
            id: '194906',
            isClosed: false,
            pagesCount: 1287,
            title: 'Hardware-Kaufberatung',
          },
          board: {
            id: '10',
            name: 'Hardware & Netzwerk',
          },
          removeToken: '456',
        },
        {
          id: '3',
          newPostsCount: 0,
          postId: '1249782727',
          thread: {
            id: '90343',
            isClosed: false,
            pagesCount: 183,
            title: 'Hardwarekauf oder -tausch',
          },
          board: {
            id: '10',
            name: 'Hardware & Netzwerk',
          },
          removeToken: '789',
        },
      ],
    };
    assert.propEqual(
      transformBookmarksSummary(actual),
      expected,
      'User without group is transformed properly.'
    );
  });
});
