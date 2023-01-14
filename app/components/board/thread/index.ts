import Component from '@glimmer/component';
import { BoardItem } from 'potber/services/api/types/board';

export interface Signature {
  Args: {
    thread: BoardItem;
  };
}

export default class ThreadComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get isImportant() {
    return (
      this.args.thread.isAnnouncement ||
      this.args.thread.isGlobal ||
      this.args.thread.isImportant ||
      this.args.thread.isSticky
    );
  }

  get icon() {
    return this.args.thread.firstPost.icon || undefined;
  }
}
