import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { quoteTagMocks } from './_mock/quote';
import { parseQuote } from 'potber-client/services/content-parser/quote';

module('Unit | Service | ContentParser | [quote]', (hooks) => {
  setupTest(hooks);

  test('Parses all [quote] tags.', (assert) => {
    assert.expect(quoteTagMocks.length);
    for (const mock of quoteTagMocks) {
      assert.strictEqual(
        parseQuote(mock.input, { protocol: 'https:', host: 'test.potber.de' }),
        mock.expected,
      );
    }
  });
});
