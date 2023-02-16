import { parseMod } from 'potber-client/services/content-parser/mod';
import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | ContentParser', (hooks) => {
  setupTest(hooks);

  test('Parses [mod] tags.', (assert) => {
    assert.strictEqual(parseMod('[mod]Foo[/mod]'), '<p class="mod">Foo</p>');
    assert.strictEqual(
      parseMod('[mod][b]Foo[/b]Bar[/mod]'),
      '<p class="mod">[b]Foo[/b]Bar</p>'
    );
  });
});
