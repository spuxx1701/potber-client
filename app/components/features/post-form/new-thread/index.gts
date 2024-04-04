import Component from '@glimmer/component';
import { WritableThread } from 'potber-client/services/api/models/thread';
import PostFormMessage from '../components/message';
import PostFormPostTitle from '../components/post-title-input';
import PostFormThreadTags from '../components/thread-tags';
import PostFormThreadTitle from '../components/thread-title-input';

interface Signature {
  formId: string;
  thread: WritableThread;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class NewThreadPostForm extends Component<Signature> {
  <template>
    <PostFormThreadTitle @thread={{@thread}} />
    <PostFormThreadTags @thread={{@thread}} />
    <PostFormPostTitle @post={{@thread.openingPost}} />
    <PostFormMessage @formId={{@formId}} @post={{@thread.openingPost}} />
  </template>
}
