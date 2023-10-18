import Component from '@glimmer/component';
import User from 'potber-client/models/user';
import { appConfig } from 'potber-client/config/app.config';

interface Signature {
  Args: {
    user: User;
  };
}

export default class UserProfileComponent extends Component<Signature> {
  get originalUrl() {
    return `${appConfig.userPageUrl}/${this.args.user.id}`;
  }
}
