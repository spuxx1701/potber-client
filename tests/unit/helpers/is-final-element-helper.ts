import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { isFinalElement } from 'potber-client/helpers/is-final-element';

module('Unit | Helper | is-final-element', function (hooks) {
  setupTest(hooks);

  test('returns true if given element is the final element', function (assert) {
    assert.true(isFinalElement([3, [1, 2, 3]]));
  });

  test('returns false if given element is not the final element', function (assert) {
    assert.true(isFinalElement([3, [1, 2, 3, 4]]));
  });

  test('throws an exception if helper is not being used properly', function (assert) {
    assert.throws(() => {
      isFinalElement([undefined, [1, 2, 3, 4]]);
    });
    assert.throws(() => {
      isFinalElement([3, undefined as unknown as any[]]);
    });
    assert.throws(() => {
      isFinalElement([3, 'foo' as unknown as any[]]);
    });
  });
});
