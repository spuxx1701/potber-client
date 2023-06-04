import { module, skip, test } from 'qunit';
import { visit, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'potber-client/tests/helpers';
import SettingsController from 'potber-client/controllers/authenticated/settings';
import { SidebarLayout } from 'potber-client/services/settings';

module('Acceptance | Authenticated | Settings', function (hooks) {
  setupApplicationTest(hooks, {
    authenticate: true,
  });

  test('visiting /settings', async function (assert) {
    await visit('/settings');
    assert.strictEqual(currentURL(), '/settings');
  });

  skip('changing the sidebar layout to bottom-right', async function (assert) {
    await visit('/settings');
    const bottomNav = find('#bottom-nav');

    const controller = this.owner.lookup(
      'controller:authenticated.settings'
    ) as SettingsController;

    controller.handleSidebarLayoutSelect({
      label: 'R-B',
      data: SidebarLayout.rightBottom,
    });

    assert.dom('.sidebar-toggle', bottomNav as Element).exists();
  });
});
