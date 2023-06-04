import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { tableTagMocks } from './_mock/table';
import { parseTable } from 'potber-client/services/content-parser/table';

module('Unit | Service | ContentParser | [table]', (hooks) => {
  setupTest(hooks);

  test('Parses all [table] tags.', (assert) => {
    assert.expect(tableTagMocks.length);
    for (const mock of tableTagMocks) {
      assert.strictEqual(parseTable(mock.input), mock.expected);
    }
  });
});
