import { render, TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Post from 'potber-client/models/post';
import Thread from 'potber-client/models/thread';
import { setupRenderingTest } from 'potber-client/tests/helpers';
import { postMocks } from 'potber-client/tests/_mock/post';
import { threadMocks } from 'potber-client/tests/_mock/thread';
import { module, test } from 'qunit';

interface Context extends TestContext {
  element: HTMLElement;
  thread: Thread;
  post: Post;
}

module('Integration | Component | Board | Post', function (hooks) {
  setupRenderingTest(hooks);

  test('Properly transforms old and new avatar URLs.', async function (this: Context, assert) {
    this.thread = threadMocks.potber;
    this.post = postMocks.simple;
    await render(hbs`<Board::Post
      @post={{this.post}}
      @thread={{this.thread}}
      @avatarStyle="small"
    />`);

    assert.strictEqual(
      this.element
        .getElementsByClassName('post-avatar-small')[0]
        ?.children[0]?.getAttribute('src'),
      'https://forum.mods.de/bb/avatare/upload/U3035--e-razor.png'
    );

    this.post = postMocks.withOldAvatarUrl;
    await render(hbs`<Board::Post
      @post={{this.post}}
      @thread={{this.thread}}
      @avatarStyle="small"
    />`);

    assert.strictEqual(
      this.element
        .getElementsByClassName('post-avatar-small')[0]
        ?.children[0]?.getAttribute('src'),
      'https://forum.mods.de/bb/avatare/oldb/shooter.gif'
    );
  });
});
