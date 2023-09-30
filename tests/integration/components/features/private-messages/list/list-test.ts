import { TestContext, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { privateMessageMocks } from './_mock/private-messages';

interface Context extends TestContext {
  element: HTMLElement;
}

module(
  'Integration | Component | Feature | Private messages | List',
  function (hooks) {
    setupRenderingTest(hooks);

    test('should render all inbound messages as expected', async function (this: Context, assert) {
      this.set('messages', privateMessageMocks.inbound);

      await render(
        hbs`<Features::PrivateMessages::List @messages={{this.messages}}/>`,
      );

      const messageListItems = this.element.getElementsByClassName(
        'private-messages-list-item',
      );
      assert.strictEqual(
        messageListItems.length,
        3,
        'should have 3 list items',
      );

      // First message is an unread message
      let message = messageListItems[0];
      assert
        .dom(message)
        .hasTextContaining(
          'Ungelesene Nachricht von User 1 (13:51 20.07.2023)',
        );
      assert.dom(message).hasClass('private-messages-list-item-unread');
      assert
        .dom(
          message?.getElementsByClassName(
            'private-message-unread-indicator',
          )[0],
        )
        .exists();
      assert.strictEqual(
        message?.getElementsByClassName('private-message-important-indicator')
          .length,
        0,
        'should not have an important indicator',
      );

      // Second message is a read important message
      message = messageListItems[1];
      assert
        .dom(message)
        .hasTextContaining('Wichtige Nachricht von User 2 (11:20 20.07.2023)');
      assert.dom(message).hasNoClass('private-messages-list-item-unread');
      assert.strictEqual(
        message?.getElementsByClassName('private-message-unread-indicator')
          .length,
        0,
        'should not have an unread indicator',
      );
      assert
        .dom(
          message?.getElementsByClassName(
            'private-message-important-indicator',
          )[0],
        )
        .exists();

      // Third message is a normal message that has already been read
      message = messageListItems[2];
      assert
        .dom(message)
        .hasTextContaining('Gelesene Nachricht von User 1 (00:56 02.12.2022)');
      assert.dom(message).hasNoClass('private-messages-list-item-unread');
      assert.strictEqual(
        message?.getElementsByClassName('private-message-unread-indicator')
          .length,
        0,
        'should not have an unread indicator',
      );
      assert.strictEqual(
        message?.getElementsByClassName('private-message-important-indicator')
          .length,
        0,
        'should not have an important indicator',
      );
    });
  },
);
