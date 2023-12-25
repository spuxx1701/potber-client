import LocalStorageService from 'potber-client/services/local-storage';
import SettingsService, {
  AvatarStyle,
  FontSize,
  Gestures,
  LandingPage,
  Settings,
  SidebarLayout,
  Theme,
} from 'potber-client/services/settings';
import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';

const mockedSettings: Settings = {
  avatarStyle: AvatarStyle.small,
  theme: Theme.default,
  landingPage: LandingPage.pot,
  autoRefreshSidebar: false,
  sidebarLayout: SidebarLayout.leftTop,
  fontSize: FontSize.medium,
  replaceForumUrls: true,
  darkenReadPosts: false,
  hideGlobalAndAnnouncementThreads: false,
  goToBottomOfThreadPage: true,
  gestures: Gestures.none,
  debug: false,
};

module('Unit | Service | Settings', function (hooks) {
  setupTest(hooks);

  test('Loads settings.', function (assert) {
    // Stub LocalStorage service
    class LocalStorageStub extends LocalStorageService {
      readSettings(): Settings | null {
        return { ...mockedSettings };
      }
    }
    this.owner.register('service:local-storage', LocalStorageStub);

    const settings = this.owner.lookup(
      'service:settings',
    ) as unknown as SettingsService;

    const actual = settings.getSettings();
    const expected: Settings = { ...settings.default, ...mockedSettings };
    assert.deepEqual(actual, expected);
  });

  test('Resorts to using default values in case of empty or corrupt storage.', function (assert) {
    class LocalStorageStub extends LocalStorageService {
      readSettings(): Settings | null {
        return null;
      }
    }
    this.owner.register('service:local-storage', LocalStorageStub);

    const settings = this.owner.lookup(
      'service:settings',
    ) as unknown as SettingsService;

    const actual = settings.getSettings();
    const expected: Settings = { ...settings.default };
    assert.deepEqual(actual, expected);
  });

  test('Saves the active settings to localStorage', function (assert) {
    assert.expect(1);

    const actual = { ...mockedSettings };

    class LocalStorageStub extends LocalStorageService {
      readSettings(): Settings | null {
        return { ...mockedSettings };
      }

      writeSettings(settings: Settings) {
        assert.deepEqual(settings, actual);
      }
    }
    this.owner.register('service:local-storage', LocalStorageStub);

    const settings = this.owner.lookup(
      'service:settings',
    ) as unknown as SettingsService;

    settings.save();
  });
});
