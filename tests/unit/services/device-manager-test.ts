import DeviceManagerService from 'potber-client/services/device-manager';
import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | DeviceManager', function (hooks) {
  setupTest(hooks);

  test('Properly recognizes all supported operating systems.', function (assert) {
    const deviceManager = this.owner.lookup(
      'service:device-manager'
    ) as DeviceManagerService;
    const iOSUserAgent =
      'Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1';
    const androidUserAgent =
      'Mozilla/5.0 (Linux; Android 12; SM-S906N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36';
    const windowsUserAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246';
    const linuxUserAgent =
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1';
    const macOSUserAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
    assert.strictEqual(deviceManager.getOperatingSystem(iOSUserAgent), 'iOS');
    assert.strictEqual(
      deviceManager.getOperatingSystem(androidUserAgent),
      'Android'
    );
    assert.strictEqual(
      deviceManager.getOperatingSystem(windowsUserAgent),
      'Windows'
    );
    assert.strictEqual(
      deviceManager.getOperatingSystem(linuxUserAgent),
      'Linux'
    );
    assert.strictEqual(
      deviceManager.getOperatingSystem(macOSUserAgent),
      'Mac OS'
    );
  });

  test('Properly recognizes all supported browsers.', function (assert) {
    const deviceManager = this.owner.lookup(
      'service:device-manager'
    ) as DeviceManagerService;
    const webKitUserAgent =
      'Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1';
    const chromeUserAgent =
      'Mozilla/5.0 (Linux; Android 12; SM-S906N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36';
    const firefoxUserAgent =
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1';
    assert.strictEqual(deviceManager.getBrowser(webKitUserAgent), 'WebKit');
    assert.strictEqual(deviceManager.getBrowser(chromeUserAgent), 'Chrome');
    assert.strictEqual(deviceManager.getBrowser(firefoxUserAgent), 'Firefox');
  });
});
