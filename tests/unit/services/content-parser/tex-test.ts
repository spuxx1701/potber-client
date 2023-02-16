import { parseTex } from 'potber-client/services/content-parser/tex';
import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | ContentParser', (hooks) => {
  setupTest(hooks);

  test('Parses [tex] tags.', (assert) => {
    assert.strictEqual(parseTex('[tex]Foo[/tex]'), '<p class="tex">Foo</p>');
    assert.strictEqual(
      parseTex('[tex][b]Foo[/b]Bar[/tex]'),
      '<p class="tex">[b]Foo[/b]Bar</p>'
    );
  });
});
