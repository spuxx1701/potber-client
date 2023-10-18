import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { parsePrivilegedTags } from 'potber-client/services/content-parser/privileged-tags';
import { privilegedTagMocks } from './_mock/privileged-tags';

module('Unit | Service | ContentParser | Privileged tags', (hooks) => {
  setupTest(hooks);

  test('Parses all simple tags for a privileged user.', (assert) => {
    assert.expect(privilegedTagMocks.privileged.length);
    for (const mock of privilegedTagMocks.privileged) {
      assert.strictEqual(parsePrivilegedTags(mock.input, '6'), mock.expected);
    }
  });
  test('Parses all simple tags for an unprivileged user.', (assert) => {
    assert.expect(privilegedTagMocks.unprivileged.length);
    for (const mock of privilegedTagMocks.unprivileged) {
      assert.strictEqual(parsePrivilegedTags(mock.input, '3'), mock.expected);
    }
  });
});
