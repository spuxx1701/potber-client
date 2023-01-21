import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
  @tracked authenticated = false;

  @action signIn(username: string, password: string, lifetime: number) {
    console.log(username);
    console.log(password);
    console.log(lifetime);
  }

  @action signOut() {
    console.log('implement me');
  }
}
