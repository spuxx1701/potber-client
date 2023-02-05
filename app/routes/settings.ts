import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { DropdownOption } from 'potber/components/common/control/dropdown';
import LocalStorageService from 'potber/services/local-storage';
import RSVP from 'rsvp';

export default class SettingsRoute extends Route {
  @service declare localStorage: LocalStorageService;

  model() {
    return RSVP.hash({
      currentAvatarStyleOption: avatarStyleOptions.find(
        (option) => option.data === this.localStorage.getAvatarStyle()
      ),
      currentBoxStyleOption: boxStyleOptions.find(
        (option) => option.data === this.localStorage.getBoxStyle()
      ),
      currentLandingPageOption: landingPageOptions.find(
        (option) => option.data === this.localStorage.getLandingPage()
      ),
      currentRunModeOption: runModeOptions.find(
        (option) => option.data === this.localStorage.getRunMode()
      ),
    });
  }
}

export const avatarStyleOptions: DropdownOption[] = [
  {
    label: 'Keine',
    data: 'none',
  },
  {
    label: 'Klein',
    data: 'small',
  },
];

export const boxStyleOptions: DropdownOption[] = [
  {
    label: 'Kantholz',
    data: 'rect',
  },
  {
    label: 'Hobelware',
    data: 'round',
  },
];

export const landingPageOptions: DropdownOption[] = [
  {
    label: 'Forenübersicht',
    data: 'board-overview',
  },
  {
    label: 'Public Offtopic',
    data: 'pot',
  },
];

export const runModeOptions: DropdownOption[] = [
  {
    label: 'Browser (Website-like)',
    data: 'browser',
  },
  {
    label: 'PWA (App-like)',
    data: 'pwa',
  },
];
