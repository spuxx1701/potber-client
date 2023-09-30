import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
  SetupTestOptions,
} from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import ModalService from 'potber-client/services/modal';

// This file exists to provide wrappers around ember-qunit's / ember-mocha's
// test setup functions. This way, you can easily extend the setup that is
// needed per test type.

interface ApplicationTestOptions extends SetupTestOptions {
  authenticate?: boolean;
}

function setupApplicationTest(
  hooks: NestedHooks,
  options?: ApplicationTestOptions,
) {
  upstreamSetupApplicationTest(hooks, options);

  hooks.beforeEach(async function () {
    if (options?.authenticate) {
      await authenticateSession();
    }
  });
  //
  // This is also a good place to call test setup functions coming
  // from other addons:
  //
  // setupIntl(hooks); // ember-intl
  // setupMirage(hooks); // ember-cli-mirage
}

interface RenderingTestOptions extends SetupTestOptions {
  includeModals?: boolean;
}

function setupRenderingTest(
  hooks: NestedHooks,
  options?: RenderingTestOptions,
) {
  upstreamSetupRenderingTest(hooks, options);

  hooks.beforeEach(async function () {
    if (options?.includeModals) {
      await render(hbs`<Modal />`);
      this.owner.register('service:modal', ModalService);
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TestOptions extends SetupTestOptions {}

function setupTest(hooks: NestedHooks, options?: TestOptions) {
  upstreamSetupTest(hooks, options);

  // hooks.beforeEach(async function () {
  //   // if (options?.authenticate) {
  //   await authenticateSession();
  //   // }
  // });
}

export { setupApplicationTest, setupRenderingTest, setupTest };
