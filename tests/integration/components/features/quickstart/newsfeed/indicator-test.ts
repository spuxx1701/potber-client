import { find, render, TestContext } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'potber-client/tests/helpers';
import NewsfeedService from 'potber-client/services/newsfeed';
import { hbs } from 'ember-cli-htmlbars';
import Bookmark from 'potber-client/models/bookmark';
import { newsfeedMocks } from './_mock/newsfeed';
import SettingsService, {
  SidebarLayout,
} from 'potber-client/services/settings';
import RendererService from 'potber-client/services/renderer';

interface Context extends TestContext {
  element: HTMLElement;
}

module('Integration | Component | Newsfeed | Indicator', function (hooks) {
  setupRenderingTest(hooks);

  test('should be hidden when there are no news', async function (this: Context, assert) {
    class NewsfeedStub extends NewsfeedService {
      unreadBookmarks: Bookmark[] = [];
    }
    this.owner.register('service:newsfeed', NewsfeedStub);
    await render(hbs`<Features::Quickstart::Newsfeed::Indicator/>`);

    assert.dom('[data-test-newsfeed-indicator]').hasStyle({ display: 'none' });
  });

  test('should be hidden when there are news, but sidebar is visible', async function (this: Context, assert) {
    class NewsfeedStub extends NewsfeedService {
      unreadBookmarks: Bookmark[] = [newsfeedMocks.unreadBookmark];
    }
    this.owner.register('service:newsfeed', NewsfeedStub);
    class RendererStub extends RendererService {
      leftSidebarExpanded = true;
    }
    this.owner.register('service:renderer', RendererStub);
    await render(hbs`<Features::Quickstart::Newsfeed::Indicator/>`);

    assert.dom('[data-test-newsfeed-indicator]').hasStyle({ display: 'none' });
  });

  test("should have class 'newsfeed-indicator-info' when there are unread bookmarks", async function (this: Context, assert) {
    class NewsfeedStub extends NewsfeedService {
      unreadBookmarks: Bookmark[] = [newsfeedMocks.unreadBookmark];
    }
    this.owner.register('service:newsfeed', NewsfeedStub);
    await render(hbs`<Features::Quickstart::Newsfeed::Indicator/>`);

    assert
      .dom('[data-test-newsfeed-indicator')
      .hasClass('newsfeed-indicator-info');
  });

  test("should have class 'newsfeed-indicator-position-right' when left-sided sidebar layout is selected", async function (this: Context, assert) {
    class SettingsStub extends SettingsService {
      get sidebarLayout() {
        return SidebarLayout.leftTop;
      }
    }
    this.owner.register('service:settings', SettingsStub);
    await render(hbs`<Features::Quickstart::Newsfeed::Indicator/>`);

    assert
      .dom('[data-test-newsfeed-indicator')
      .hasClass('newsfeed-indicator-position-right');
  });

  test("should have class 'newsfeed-indicator-position-left' when right-sided sidebar layout is selected", async function (this: Context, assert) {
    class SettingsStub extends SettingsService {
      get sidebarLayout() {
        return SidebarLayout.rightBottom;
      }
    }
    this.owner.register('service:settings', SettingsStub);
    await render(hbs`<Features::Quickstart::Newsfeed::Indicator/>`);

    assert
      .dom('[data-test-newsfeed-indicator')
      .hasClass('newsfeed-indicator-position-left');
  });
});
