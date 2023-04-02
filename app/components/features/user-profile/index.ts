import Component from '@glimmer/component';
import User from 'potber-client/models/user';
import ENV from 'potber-client/config/environment';

interface Signature {
  Args: {
    user: User;
  };
}

export default class UserProfileComponent extends Component<Signature> {
  get originalUrl() {
    return `${ENV.APP['USER_PAGE_URL']}/${this.args.user.id}`;
  }
}
