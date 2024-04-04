import { render, TestContext } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'potber-client/tests/helpers';
import { newsfeedMocks } from './_mock/newsfeed';
import SettingsService, {
  SidebarLayout,
} from 'potber-client/services/settings';
import RendererService from 'potber-client/services/renderer';
import NewsfeedIndicatorComponent from 'potber-client/components/features/quickstart/newsfeed/indicator';
import styles from 'potber-client/components/features/quickstart/newsfeed/indicator/styles.module.css';
import NewsfeedService from 'potber-client/services/newsfeed';

interface Context extends TestContext {
  element: HTMLElement;
}

module(
  'Integration | Component | Feature | Quickstart | Newsfeed | Indicator',
  function (hooks) {
    setupRenderingTest(hooks);

    test('should be hidden when there are no news', async function (this: Context, assert) {
      class NewsfeedStub extends NewsfeedService {
        get unreadBookmarks() {
          return [];
        }
      }
      this.owner.register('service:newsfeed', NewsfeedStub);
      await render(<template><NewsfeedIndicatorComponent /></template>);

      assert.dom('[data-test-newsfeed-indicator]').hasStyle({ scale: '0' });
    });

    test('should be hidden when there are news, but sidebar is visible', async function (this: Context, assert) {
      class NewsfeedStub extends NewsfeedService {
        get unreadBookmarks() {
          return [newsfeedMocks.unreadBookmark];
        }
      }
      this.owner.register('service:newsfeed', NewsfeedStub);
      class RendererStub extends RendererService {
        leftSidebarExpanded = true;
      }
      this.owner.register('service:renderer', RendererStub);
      await render(<template><NewsfeedIndicatorComponent /></template>);

      assert.dom('[data-test-newsfeed-indicator]').hasStyle({ scale: '0' });
    });

    test("should have class 'status-important' when there are unread private messages", async function (this: Context, assert) {
      class NewsfeedStub extends NewsfeedService {
        get unreadPrivateMessages() {
          return [newsfeedMocks.unreadPrivateMessages];
        }
      }
      this.owner.register('service:newsfeed', NewsfeedStub);
      await render(<template><NewsfeedIndicatorComponent /></template>);
      assert
        .dom('[data-test-newsfeed-indicator]')
        .hasClass(styles['status-important'] as string);
    });

    test("should have class 'status-info' when there are unread bookmarks", async function (this: Context, assert) {
      class NewsfeedStub extends NewsfeedService {
        get unreadBookmarks() {
          return [newsfeedMocks.unreadBookmark];
        }
      }
      this.owner.register('service:newsfeed', NewsfeedStub);
      await render(<template><NewsfeedIndicatorComponent /></template>);

      assert
        .dom('[data-test-newsfeed-indicator]')
        .hasClass(styles['status-info'] as string);
    });

    test("should have class 'status-important' when there are both unread private messages and unread bookmarks", async function (this: Context, assert) {
      class NewsfeedStub extends NewsfeedService {
        get unreadPrivateMessages() {
          return [newsfeedMocks.unreadPrivateMessages];
        }
        get unreadBookmarks() {
          return [newsfeedMocks.unreadBookmark];
        }
      }
      this.owner.register('service:newsfeed', NewsfeedStub);
      await render(<template><NewsfeedIndicatorComponent /></template>);

      assert
        .dom('[data-test-newsfeed-indicator]')
        .hasClass(styles['status-important'] as string);
    });

    test("should have class 'position-right' when left-sided sidebar layout is selected", async function (this: Context, assert) {
      class SettingsStub extends SettingsService {
        get sidebarLayout() {
          return SidebarLayout.leftTop;
        }
      }
      this.owner.register('service:settings', SettingsStub);
      await render(<template><NewsfeedIndicatorComponent /></template>);

      assert
        .dom('[data-test-newsfeed-indicator]')
        .hasClass(styles['position-right'] as string);
    });

    test("should have class 'position-left' when right-sided sidebar layout is selected", async function (this: Context, assert) {
      class SettingsStub extends SettingsService {
        get sidebarLayout() {
          return SidebarLayout.rightBottom;
        }
      }
      this.owner.register('service:settings', SettingsStub);
      await render(<template><NewsfeedIndicatorComponent /></template>);

      assert
        .dom('[data-test-newsfeed-indicator]')
        .hasClass(styles['position-left'] as string);
    });
  },
);
