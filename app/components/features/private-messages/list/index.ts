import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import PrivateMessage from 'potber-client/models/private-message';
import ScrollObserverService, {
  ScrollPosition,
} from 'potber-client/services/scroll-observer';
import { sleep } from 'potber-client/utils/misc';

interface Signature {
  Args: {
    messages: PrivateMessage[];
  };
}

export default class PrivateMessageListComponent extends Component<Signature> {
  @service declare scrollObserver: ScrollObserverService;

  @tracked limit = 100;
  get messages() {
    this.updateLimit(this.scrollObserver.scrollPosition);
    return this.args.messages.slice(0, this.limit);
  }

  /**
   * Asynchronously updates the limit. The delay is important so we don't attempt to
   * update the limit twice within the same cycle.
   * @param scrollPosition The scroll position.
   */
  async updateLimit(scrollPosition: ScrollPosition) {
    await sleep(10);
    const { y, yMax } = scrollPosition;
    if (this.limit > this.args.messages.length) return;
    if (y > 0.8 * yMax) {
      this.limit += 10;
      console.log(this.limit);
    }
  }
}
