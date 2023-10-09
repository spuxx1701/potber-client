import {
  AvatarStyle,
  BoxStyle,
  FontSize,
  LandingPage,
  Settings,
  SidebarLayout,
} from 'potber-client/services/settings';

/**
 * Defines all available options for seach setting.
 */
export const settingsConfig: Record<
  `${keyof Settings}Options`,
  { label: string; data: any }[]
> = {
  avatarStyleOptions: [
    {
      label: 'Aus',
      data: AvatarStyle.none,
    },
    {
      label: 'An',
      data: AvatarStyle.small,
    },
  ],

  sidebarLayoutOptions: [
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
  ],

  boxStyleOptions: [
    {
      label: 'Kantholz',
      data: BoxStyle.rect,
    },
    {
      label: 'Hobelware',
      data: BoxStyle.round,
    },
  ],

  fontSizeOptions: [
    {
      label: 'Klein',
      data: FontSize.small,
    },
    {
      label: 'Normal',
      data: FontSize.medium,
    },
    {
      label: 'Groß',
      data: FontSize.large,
    },
  ],

  landingPageOptions: [
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
  ],

  autoRefreshSidebarOptions: [
    {
      label: 'An',
      data: true,
    },
    {
      label: 'Aus',
      data: false,
    },
  ],
};
