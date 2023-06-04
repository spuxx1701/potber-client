import ContentParserService from 'potber-client/services/content-parser';
import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | ContentParser', (hooks) => {
  setupTest(hooks);

  test('should be ok', function (assert) {
    const service = this.owner.lookup('service:contentParser');
    assert.ok(service);
  });

  test("should replace line breaks with '<br/>' tags", function (assert) {
    const service = this.owner.lookup(
      'service:contentParser'
    ) as ContentParserService;
    const input = `hello
world

foo bar`;
    const expected = `hello<br/>world<br/><br/>foo bar`;
    assert.strictEqual(service.format(input), expected);
  });
});
