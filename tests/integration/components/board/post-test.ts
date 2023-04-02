// import { render, TestContext } from '@ember/test-helpers';
// import { hbs } from 'ember-cli-htmlbars';
// import Post from 'potber-client/models/post';
// import Thread from 'potber-client/models/thread';
// import SettingsService, { AvatarStyle } from 'potber-client/services/settings';
// import { setupRenderingTest } from 'potber-client/tests/helpers';
// import { postMocks } from 'potber-client/tests/_mock/post';
// import { threadMocks } from 'potber-client/tests/_mock/thread';
// import { module, test } from 'qunit';

// interface Context extends TestContext {
//   element: HTMLElement;
//   thread: Thread;
//   post: Post;
// }

// module('Integration | Component | Board | Post', function (hooks) {
//   setupRenderingTest(hooks);

//   hooks.beforeEach(function (this) {
//     class SettingsStub extends SettingsService {
//       get avatarStyle(): AvatarStyle {
//         return AvatarStyle.small;
//       }
//     }
//     this.owner.register('service:settings', SettingsStub);
//   });
// });
