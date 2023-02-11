import { transformBoardOverview } from 'potber-client/services/api/transformers/board-overview';
import { BoardCategory } from 'potber-client/services/api/types/board-overview';
import { module, test } from 'qunit';
import { setupTest } from 'potber-client/tests/helpers';
import mockData from './mock-data';
import { parseXmlString } from 'potber-client/tests/test-utils';

module('Unit | Service | API | Transformer | Board Overview', function (hooks) {
  setupTest(hooks);

  test("Transforms the board overview from 'boards.php' endpoint.", function (assert) {
    const actual = transformBoardOverview(parseXmlString(mockData.full));
    const expected: BoardCategory[] = [
      {
        id: '6',
        name: 'Allgemeines',
        description: 'SeitenÃŒbergreifende Themen',
        boards: [
          {
            id: '95',
            name: '3DSupply.de',
            description: 'Alles rund um 3D Supply',
            threadsCount: 0,
            repliesCount: 0,
            categoryId: '6',
            page: undefined,
          },
          {
            id: '14',
            name: 'Public Offtopic',
            description:
              'fÃŒr das was nicht passt und sonstige geistige HÃ¶henflÃŒge',
            threadsCount: 46587,
            repliesCount: 13987787,
            categoryId: '6',
            page: undefined,
          },
        ],
      },
      {
        id: '7',
        name: 'Counter-Strike / Half-Life 2',
        description: 'Alles rund um Valves Spiele',
        boards: [
          {
            id: '18',
            name: 'Hauptforum',
            description: 'Alles rund ums Thema Counter-Strike!',
            threadsCount: 11771,
            repliesCount: 133645,
            categoryId: '7',
            page: undefined,
          },
        ],
      },
    ];
    assert.deepEqual(
      actual,
      expected,
      'Board overview is transformed properly.'
    );
  });
});
