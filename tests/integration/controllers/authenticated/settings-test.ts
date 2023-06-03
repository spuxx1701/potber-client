import { setupRenderingTest } from 'potber-client/tests/helpers';
import { module, skip, test } from 'qunit';
import SettingsController from 'potber-client/controllers/authenticated/settings';
import ModalService from 'potber-client/services/modal';
import { ModalType } from 'potber-client/services/modal';
import Service from '@ember/service';
import { SidebarLayout } from 'potber-client/services/settings';
import RendererService from 'potber-client/services/renderer';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Controller | Authenticated | Settings', function (hooks) {
  setupRenderingTest(hooks, {
    includeModals: true,
  });

  // TODO: Test this, possibly within an application test
  skip('should move the sidebar toggle to bottom right', async function (assert) {
    this.owner.register('service:renderer', RendererService);
    await render(hbs`<Nav/>`);
    const bottomNav = find('#bottom-nav');
    assert.ok(bottomNav);

    const controller = this.owner.lookup(
      'controller:authenticated.settings'
    ) as SettingsController;

    controller.handleSidebarLayoutSelect({
      label: 'R-B',
      data: SidebarLayout.rightBottom,
    });

    assert.dom('.sidebar-toggle', bottomNav as Element).exists();
  });

  test('should display an information modal when changing the sidebar layout in desktop mode', async function (assert) {
    class RendererStub extends Service {
      isDesktop = true;
      updateSidebarLayout = () => {
        return;
      };
    }
    this.owner.register('service:renderer', RendererStub);
    const modal = this.owner.lookup('service:modal') as ModalService;

    const controller = this.owner.lookup(
      'controller:authenticated.settings'
    ) as SettingsController;

    controller.handleSidebarLayoutSelect({
      label: 'RightBottom',
      data: SidebarLayout.rightBottom,
    });

    assert.deepEqual(modal.activeModal.type, ModalType.confirm);
  });
});
