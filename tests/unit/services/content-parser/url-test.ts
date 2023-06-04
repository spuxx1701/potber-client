import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { urlTagMocks } from './_mock/url';
import { parseUrl } from 'potber-client/services/content-parser/url';

module('Unit | Service | ContentParser | [url]', (hooks) => {
  setupTest(hooks);

  test('Parses all [url] tags.', (assert) => {
    assert.expect(urlTagMocks.length);
    for (const mock of urlTagMocks) {
      assert.strictEqual(parseUrl(mock.input), mock.expected);
    }
  });
});
