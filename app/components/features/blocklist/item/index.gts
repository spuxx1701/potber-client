import { service } from '@ember/service';
import Component from '@glimmer/component';
import SocialsService, { BlockedUser } from 'potber-client/services/socials';
import Button from 'potber-client/components/common/control/button';

export interface Signature {
  Args: {
    user: BlockedUser;
  };
}

export default class BlocklistItem extends Component<Signature> {
  @service declare socials: SocialsService;

  get text() {
    return `${this.args.user.name} (${this.args.user.id})`;
  }

  unblock = () => {
    this.socials.unblockUser(this.args.user.id);
  };

  <template>
    <Button
      @text={{this.text}}
      @icon='times'
      @onClick={{this.unblock}}
      @variant='primary-transparent'
      @size='max'
    />
  </template>
}
