import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { DropdownOption } from 'potber/components/common/control/dropdown';
import LocalStorageService from 'potber/services/local-storage';
import RSVP from 'rsvp';

export default class SettingsRoute extends Route {
  @service declare localStorage: LocalStorageService;

  model() {
    return RSVP.hash({
      currentNavPositionOption: navPositionOptions.find(
        (option) => option.data === this.localStorage.getMainNavPosition()
      ),
      currentBendersOption: benderOptions.find(
        (option) => option.data === this.localStorage.getBenders()
      ),
      currentBoxStyleOption: boxStyleOptions.find(
        (option) => option.data === this.localStorage.getBoxStyle()
      ),
    });
  }
}

export const navPositionOptions = [
  { label: 'Oben', data: 'top' },
  { label: 'Unten', data: 'bottom' },
] as DropdownOption[];

export const benderOptions = [
  {
    label: 'Keine',
    data: 'none',
  },
  {
    label: 'Klein',
    data: 'small',
  },
  {
    label: 'Groß',
    data: 'large',
  },
] as DropdownOption[];

export const boxStyleOptions = [
  {
    label: 'Sehr kantig.',
    data: 'rect',
  },
  {
    label: 'Gar nicht!',
    data: 'round',
  },
] as DropdownOption[];
