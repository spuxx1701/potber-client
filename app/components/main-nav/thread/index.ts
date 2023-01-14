import Component from '@glimmer/component';
import { Thread } from 'potber/services/api/types/thread';

export interface Signature {
  Args: {
    thread: Thread;
    currentPage?: number;
  };
}

export default class MainNavThreadComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get nextPageVisible() {
    return true;
  }

  get currentPage() {
    return this.args.currentPage || 1;
  }

  get nextPage() {
    return this.currentPage + 1;
  }

  get previousPageVisible() {
    return this.currentPage > 1;
  }

  get previousPage() {
    return this.currentPage - 1;
  }
}
