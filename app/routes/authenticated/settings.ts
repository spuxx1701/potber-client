import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { DropdownOption } from 'potber-client/components/common/control/dropdown';
import Session from 'potber-client/models/session';
import RendererService from 'potber-client/services/renderer';
import SessionService from 'potber-client/services/session';
import SettingsService, {
  AvatarStyle,
  BoxStyle,
  LandingPage,
  SidebarLayout,
} from 'potber-client/services/settings';
import RSVP from 'rsvp';

export interface SettingsRouteModel {
  session: Session | null;
  currentAvatarStyleOption: DropdownOption;
  currentBoxStyleOption: DropdownOption;
  currentSidebarLayoutOption: DropdownOption;
  currentLandingPageOption: DropdownOption;
  currentAutoRefreshSidebarOption: DropdownOption;
}

export default class SettingsRoute extends Route {
  @service declare session: SessionService;
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;

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
      currentSidebarLayoutOption: sidebarLayoutOptions.find(
        (option) => option.data === this.settings.sidebarLayout
      ),
      currentLandingPageOption: landingPageOptions.find(
        (option) => option.data === this.settings.landingPage
      ),
      currentAutoRefreshSidebarOption: autoRefreshSidebarOptions.find(
        (option) => option.data === this.settings.autoRefreshSidebar
      ),
    } as SettingsRouteModel);
  }

  @action didTransition() {
    this.renderer.trySetScrollPosition();
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

export const sidebarLayoutOptions: DropdownOption[] = [
  {
    label: 'Links (oben)',
    data: SidebarLayout.leftTop,
  },
  {
    label: 'Links (unten)',
    data: SidebarLayout.leftBottom,
  },
  {
    label: 'Rechts (oben)',
    data: SidebarLayout.rightTop,
  },
  {
    label: 'Rechts (unten)',
    data: SidebarLayout.rightBottom,
  },
];

export const landingPageOptions: DropdownOption[] = [
  {
    label: 'Forenübersicht',
    data: LandingPage.boardOverview,
  },
  {
    label: 'Home',
    data: LandingPage.home,
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
