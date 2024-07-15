import Component from '@glimmer/component';
import { TrackedState } from 'ember-resources';
import { Threads } from 'potber-client/services/api/types';

interface Signature {
  Args: {
    threadState: TrackedState<Threads.Read>;
  };
}

export default class RecentPosts extends Component<Signature> {
  get thread() {
    return this.args.threadState.value;
  }

  get posts() {
    console.log(this.thread?.page?.posts.reverse());
    return this.thread?.page?.posts.reverse();
  }
}
