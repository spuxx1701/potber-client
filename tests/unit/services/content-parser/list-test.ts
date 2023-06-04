import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { listTagMocks } from './_mock/list';
import { parseList } from 'potber-client/services/content-parser/list';

module('Unit | Service | ContentParser | [list]', (hooks) => {
  setupTest(hooks);

  test('Parses all [list] tags.', (assert) => {
    assert.expect(listTagMocks.length);
    for (const mock of listTagMocks) {
      assert.strictEqual(parseList(mock.input), mock.expected);
    }
  });
});
