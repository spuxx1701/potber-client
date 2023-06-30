import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { codeTagMocks } from './_mock/code';
import { parseCode } from 'potber-client/services/content-parser/code';

module('Unit | Service | ContentParser | [code]', (hooks) => {
  setupTest(hooks);

  test('Parses all [code] tags.', (assert) => {
    assert.expect(codeTagMocks.length);
    for (const mock of codeTagMocks) {
      assert.strictEqual(parseCode(mock.input), mock.expected);
    }
  });
});
