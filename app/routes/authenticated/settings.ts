import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { DropdownOption } from 'potber-client/components/common/control/dropdown';
import Session from 'potber-client/models/session';
import SessionService from 'potber-client/services/session';
import SettingsService, {
  AvatarStyle,
  BoxStyle,
  LandingPage,
} from 'potber-client/services/settings';
import RSVP from 'rsvp';

export interface SettingsRouteModel {
  session: Session | null;
  currentAvatarStyleOption: DropdownOption;
  currentBoxStyleOption: DropdownOption;
  currentLandingPageOption: DropdownOption;
  currentAutoRefreshSidebarOption: DropdownOption;
}

export default class SettingsRoute extends Route {
  @service declare session: SessionService;
  @service declare settings: SettingsService;

  async model() {
    if (!this.session.sessionData) await this.session.update();
    return RSVP.hash({
      session: this.session.sessionData,
      currentAvatarStyleOption: avatarStyleOptions.find(
        (option) => option.data === this.settings.avatarStyle
      ),
      currentBoxStyleOption: boxStyleOptions.find(
        (option) => option.data === this.settings.boxStyle
      ),
      currentLandingPageOption: landingPageOptions.find(
        (option) => option.data === this.settings.landingPage
      ),
      currentAutoRefreshSidebarOption: autoRefreshSidebarOptions.find(
        (option) => option.data === this.settings.autoRefreshSidebar
      ),
    } as SettingsRouteModel);
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

export const autoRefreshSidebarOptions: DropdownOption[] = [
  {
    label: 'An',
    data: true,
  },
  {
    label: 'Aus',
    data: false,
  },
];
