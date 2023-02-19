import { module, test } from 'qunit';
import { setupRenderingTest } from 'potber-client/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | date', function (hooks) {
  setupRenderingTest(hooks);

  test('Properly displays a date in local format.', async function (assert) {
    const date = new Date();
    const localeString = date.toLocaleString();
    this.set('inputValue', date);

    await render(hbs`{{date this.inputValue}}`);

    assert.dom(this.element).hasText(localeString);
  });
});
