import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { texTagMocks } from './_mock/tex';
import { parseTex } from 'potber-client/services/content-parser/tex';
module('Unit | Service | ContentParser | [tex]', (hooks) => {
  setupTest(hooks);

  test('Parses all [tex] tags.', (assert) => {
    assert.expect(texTagMocks.length);
    for (const mock of texTagMocks) {
      assert.strictEqual(parseTex(mock.input), mock.expected);
    }
  });
});
