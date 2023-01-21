import Route from '@ember/routing/route';

export interface LoginRouteModel {
  username: string;
  password: string;
}

export default class LoginRoute extends Route {
  model() {
    return {
      username: '',
      password: '',
    } as LoginRouteModel;
  }
}
