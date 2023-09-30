import { click, render, TestContext } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'potber-client/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';

interface Context extends TestContext {
  element: HTMLElement;
}

module(
  'Integration | Component | Common | Control | Accordion',
  function (hooks) {
    setupRenderingTest(hooks);

    test('properly hides and expands its content', async function (this: Context, assert) {
      await render(
        hbs`<Common::Control::Accordion>Hello World</Common::Control::Accordion>`,
      );

      // Content is initially hidden
      assert.dom('[data-test-accordion-content]').hasNoText();

      // click the toggle
      await click('[data-test-accordion-toggle]');

      // Content is now visible
      assert.dom('[data-test-accordion-content]').hasText('Hello World');
    });
  },
);
