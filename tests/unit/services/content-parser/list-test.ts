import { parseList } from 'potber/services/content-parser/list';
import { setupTest } from 'potber/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | ContentParser | List', function (hooks) {
  setupTest(hooks);

  test('Parses a simple list.', function (assert) {
    const input = `[list][*]Foo[*]Bar[/list]`;
    const expectation = `<ul><li>Foo</li><li>Bar</li></ul>`;
    assert.strictEqual(
      parseList(input),
      expectation,
      'The list tag is being parsed as expected.'
    );
  });

  test('Parses a list tag with nested tags.', function (assert) {
    const input = `[list][*][tag-1="Foo"]Foo[/tag-2][*][tag-2]Bar[/tag-2][/list]`;
    const expectation = `<ul><li>[tag-1="Foo"]Foo[/tag-2]</li><li>[tag-2]Bar[/tag-2]</li></ul>`;
    assert.strictEqual(
      parseList(input),
      expectation,
      'The list tag is being parsed as expected.'
    );
  });

  test("Doesn't parse a list that doesn't contain any list elements.", function (assert) {
    const input = '[list]Foo[/list]';
    assert.strictEqual(
      parseList(input),
      input,
      'The list tag is not being parsed.'
    );
  });
});
