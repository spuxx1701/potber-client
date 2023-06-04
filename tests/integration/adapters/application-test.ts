import ApplicationAdapter from 'potber-client/adapters/application';
import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import {
  authenticateSession,
  currentSession,
} from 'ember-simple-auth/test-support';
import { sleep } from 'potber-client/utils/misc';

module('Integration | Adapter | Application', (hooks) => {
  setupTest(hooks);

  module('headers', () => {
    test('should include authorization header when authenticated', async function (assert) {
      await authenticateSession();
      const adapter = this.owner.lookup(
        'adapter:application'
      ) as ApplicationAdapter;
      assert.deepEqual(adapter.headers, { Authorization: 'Bearer undefined' });
    });

    test('should not include authorization header when not authenticatd', function (assert) {
      const adapter = this.owner.lookup(
        'adapter:application'
      ) as ApplicationAdapter;
      assert.deepEqual(adapter.headers, {});
    });
  });

  module('handleResponse', () => {
    test('should invalidate the session when receiving a 401 response', async function (assert) {
      const adapter = this.owner.lookup(
        'adapter:application'
      ) as ApplicationAdapter;
      await authenticateSession();
      assert.true(currentSession().isAuthenticated);
      await adapter.handleResponse(401, {}, { foo: 'bar' }, {});
      assert.false(currentSession().isAuthenticated);
    });

    test('should not invalidate the session when receiving different responses', async function (assert) {
      const adapter = this.owner.lookup(
        'adapter:application'
      ) as ApplicationAdapter;
      await authenticateSession();
      await adapter.handleResponse(200, {}, { foo: 'bar' }, {});
      assert.true(currentSession().isAuthenticated);
    });
  });
});
