import { setupTest } from 'potber-client/tests/helpers';
import { module, test } from 'qunit';
import { videoTagMocks } from './_mock/video';
import { parseVideo } from 'potber-client/services/content-parser/video';

module('Unit | Service | ContentParser', (hooks) => {
  setupTest(hooks);

  test('Parses all [video] tags.', (assert) => {
    const locationMock: Partial<Location> = {
      protocol: 'https:',
      host: 'test.potber.de',
    };
    assert.expect(videoTagMocks.length);
    for (const mock of videoTagMocks) {
      assert.strictEqual(parseVideo(mock.input, locationMock), mock.expected);
    }
  });
});
