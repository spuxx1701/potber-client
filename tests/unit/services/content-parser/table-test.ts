import { parseTable } from 'potber/services/content-parser/table';
import { setupTest } from 'potber/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | ContentParser | Table', function (hooks) {
  setupTest(hooks);
  test('Parses a simple 2x2 table.', function (assert) {
    const input = '[table]1-1[||]1-2[--]2-1[||]2-2[/table]';
    const expectation =
      '<table><tr><td>1-1</td><td>1-2</td></tr><tr><td>2-1</td><td>2-2</td></tr></table>';
    assert.strictEqual(
      parseTable(input),
      expectation,
      'The table is being parsed properly.'
    );
  });

  test('Parses a 2x2 table that contains nested tags.', function (assert) {
    const input =
      '[table][tag-1="Foo"][/tag-1][||]1-2[--]2-1[||][tag-2]Bar[/tag-2][/table]';
    const expectation =
      '<table><tr><td>[tag-1="Foo"][/tag-1]</td><td>1-2</td></tr><tr><td>2-1</td><td>[tag-2]Bar[/tag-2]</td></tr></table>';
    assert.strictEqual(
      parseTable(input),
      expectation,
      'The table is being parsed properly.'
    );
  });

  test("Parses a table that doesn't contain any row or cell tags.", function (assert) {
    const input = '[table]Foo[/table]';
    const expectation = '<table><tr><td>Foo</td></tr></table>';
    assert.strictEqual(
      parseTable(input),
      expectation,
      'The table is being parsed properly.'
    );
  });
});
