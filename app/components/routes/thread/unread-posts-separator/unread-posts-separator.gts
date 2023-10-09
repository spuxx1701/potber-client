import Component from '@glimmer/component';
import Post from 'potber-client/models/post';

interface Signature {
  Args: {
    post: Post;
    posts: Post[];
  };
}

export default class UnreadPostsSeparator extends Component<Signature> {
  get text() {
    const { post, posts } = this.args;
    const index = posts.indexOf(post);
    if (index >= 29) {
      return 'Neue Posts auf der nächsten Seite';
    } else return 'Neue Posts';
  }

  <template>
    <span class='unread-posts-separator'>
      <hr />
      <p>{{this.text}}
      </p>
    </span>
  </template>
}
