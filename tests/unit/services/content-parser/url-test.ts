import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { urlTagMocks } from './_mock/url';
import { parseUrl } from 'potber-client/services/content-parser/url';

module('Unit | Service | ContentParser | [url]', (hooks) => {
  setupTest(hooks);

  test('Parses all [url] tags.', (assert) => {
    assert.expect(urlTagMocks.normal.length);
    for (const mock of urlTagMocks.normal) {
      assert.strictEqual(parseUrl(mock.input), mock.expected);
    }
  });

  test('Parses all [url] tags while replacing forum.mods.de URLs.', (assert) => {
    assert.expect(urlTagMocks.withReplacingForumUrls.length);
    for (const mock of urlTagMocks.withReplacingForumUrls) {
      assert.strictEqual(
        parseUrl(mock.input, { replaceForumUrls: true }),
        mock.expected,
      );
    }
  });
});
