import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { DropdownOption } from 'potber-client/components/common/control/dropdown';
import CustomSession from 'potber-client/services/custom-session';
import RSVP from 'rsvp';

export interface LoginRouteModel {
  username: string;
  password: string;
  lifetimeOption: DropdownOption;
}

export const LOGIN_LIFETIME_OPTIONS: DropdownOption[] = [
  { label: 'Ein Jahr', data: 31536000 },
  { label: 'Ein Monat', data: 604800 },
  { label: 'Ein Tag', data: 86400 },
  { label: 'Eine Stunde', data: 3600 },
];

export default class LoginRoute extends Route {
  @service declare session: CustomSession;
  @service declare router: RouterService;

  model() {
    return RSVP.hash({
      username: '',
      password: '',
      lifetimeOption: LOGIN_LIFETIME_OPTIONS[0],
    } as LoginRouteModel);
  }
}
