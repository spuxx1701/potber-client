import { parseSimpleTags } from 'potber-client/services/content-parser/simple-tags';
import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { simpleTagMocks } from './_mock/simple-tags';

module('Unit | Service | ContentParser | Simple tags', (hooks) => {
  setupTest(hooks);

  test('Parses all simple tags.', (assert) => {
    assert.expect(simpleTagMocks.length);
    for (const mock of simpleTagMocks) {
      assert.strictEqual(parseSimpleTags(mock.input), mock.expected);
    }
  });
});
