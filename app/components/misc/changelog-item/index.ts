import Component from '@glimmer/component';
import { ChangelogItem } from 'potber-client/changelog';
import { clean } from 'semver';

interface Signature {
  Args: {
    item: ChangelogItem;
  };
}

export default class ChangelogItemComponent extends Component<Signature> {
  get icon() {
    if (this.args.item.type === 'minor') {
      return 'star-half-stroke';
    } else {
      return 'star';
    }
  }

  get prefix() {
    if (this.args.item.type === 'major') {
      return 'fas';
    } else {
      return 'far';
    }
  }

  get title() {
    return clean(this.args.item.version);
  }
}
