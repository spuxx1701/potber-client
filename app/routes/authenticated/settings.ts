import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { DropdownOption } from 'potber-client/components/common/control/dropdown';
import SettingsService, {
  AvatarStyle,
  BoxStyle,
  LandingPage,
} from 'potber-client/services/settings';
import RSVP from 'rsvp';

export default class SettingsRoute extends Route {
  @service declare settings: SettingsService;

  model() {
    return RSVP.hash({
      currentAvatarStyleOption: avatarStyleOptions.find(
        (option) => option.data === this.settings.avatarStyle
      ),
      currentBoxStyleOption: boxStyleOptions.find(
        (option) => option.data === this.settings.boxStyle
      ),
      currentLandingPageOption: landingPageOptions.find(
        (option) => option.data === this.settings.landingPage
      ),
    });
  }
}

export const avatarStyleOptions: DropdownOption[] = [
  {
    label: 'Keine',
    data: AvatarStyle.none,
  },
  {
    label: 'Klein',
    data: AvatarStyle.small,
  },
];

export const boxStyleOptions: DropdownOption[] = [
  {
    label: 'Kantholz',
    data: BoxStyle.rect,
  },
  {
    label: 'Hobelware',
    data: BoxStyle.round,
  },
];

export const landingPageOptions: DropdownOption[] = [
  {
    label: 'Forenübersicht',
    data: LandingPage.boardOverview,
  },
  {
    label: 'Public Offtopic',
    data: LandingPage.pot,
  },
];
