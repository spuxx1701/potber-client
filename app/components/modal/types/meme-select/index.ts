import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { parseMemeUrl } from 'potber-client/helpers/parse-meme-url';
import ModalService from 'potber-client/services/modal';
import { Meme, memeCategories } from 'potber-client/utils/memes';

export interface MemeSelectModalOptions {
  onSelect: (url: string) => void;
}

interface Signature {
  Args: {
    options: MemeSelectModalOptions;
  };
}

export default class MemeSelectModalComponent extends Component<Signature> {
  @service declare modal: ModalService;

  get memeCategories() {
    return memeCategories;
  }

  @action handleSelect(meme: Meme) {
    const url = parseMemeUrl([meme.url]);
    this.args.options.onSelect(url);
  }

  @action handleCancel() {
    this.modal.close();
  }
}
