import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { imgTagMocks } from './_mock/img';
import { parseImg } from 'potber-client/services/content-parser/img';

module('Unit | Service | ContentParser | [img]', (hooks) => {
  setupTest(hooks);

  test('Parses all [img] tags.', (assert) => {
    assert.expect(imgTagMocks.length);
    for (const mock of imgTagMocks) {
      assert.strictEqual(parseImg(mock.input), mock.expected);
    }
  });
});
