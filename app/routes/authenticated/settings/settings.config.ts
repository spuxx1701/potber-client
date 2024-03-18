import {
  AvatarStyle,
  FontSize,
  Gestures,
  LandingPage,
  Settings,
  SidebarLayout,
  Theme,
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
      label: 'An',
      data: AvatarStyle.small,
    },
    {
      label: 'Aus',
      data: AvatarStyle.none,
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

  themeOptions: [
    {
      label: 'mods.de',
      data: Theme.default,
    },
    {
      label: 'mods.de (Hobelware)',
      data: Theme['default-round'],
    },
    {
      label: 'Schneemann',
      data: Theme.snowman,
    },
    {
      label: 'Discord',
      data: Theme['discord'],
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

  darkenReadPostsOptions: [
    {
      label: 'Ja',
      data: true,
    },
    {
      label: 'Nein',
      data: false,
    },
  ],

  hideGlobalAndAnnouncementThreadsOptions: [
    {
      label: 'Anzeigen',
      data: false,
    },
    { label: 'Ausblenden', data: true },
  ],

  goToBottomOfThreadPageOptions: [
    {
      label: 'Zum Seitenende springen',
      data: true,
    },
    { label: 'Auf Seitenanfang bleiben', data: false },
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

  replaceForumUrlsOptions: [
    {
      label: 'Ja',
      data: true,
    },
    {
      label: 'Nein',
      data: false,
    },
  ],

  transitionsOptions: [
    {
      label: 'Dynamisch',
      data: 'dynamic',
    },
    {
      label: 'Statisch',
      data: 'static',
    },
  ],

  gesturesOptions: [
    {
      label: 'Alle',
      data: Gestures.all,
    },
    {
      label: 'Nur Sidebar',
      data: Gestures.onlySidebar,
    },
    {
      label: 'Aus',
      data: Gestures.none,
    },
  ],

  debugOptions: [
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
