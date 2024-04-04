import Component from '@glimmer/component';
import PostFormMessage from '../components/message';
import PostFormPostTitle from '../components/post-title-input';
import { WritablePost } from 'potber-client/services/api/models/post';

interface Signature {
  formId: string;
  post: WritablePost;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class ReplyPostForm extends Component<Signature> {
  <template>
    <PostFormPostTitle @post={{@post}} />
    <PostFormMessage @formId={{@formId}} @post={{@post}} />
  </template>
}
