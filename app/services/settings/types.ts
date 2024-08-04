export interface Settings {
  avatarStyle: AvatarStyle;
  theme: Theme;
  landingPage: LandingPage;
  autoRefreshSidebar: boolean;
  sidebarLayout: SidebarLayout;
  fontSize: FontSize;
  darkenReadPosts: boolean;
  hideGlobalAndAnnouncementThreads: boolean;
  replaceForumUrls: boolean;
  goToBottomOfThreadPage: boolean;
  gestures: Gestures;
  debug: boolean;
}

export enum AvatarStyle {
  none,
  small,
}

export enum Theme {
  'default',
  'mods',
  'snowman',
  'discord',
  'purple-haze',
  'tokyo-night',
}

export enum LandingPage {
  boardOverview,
  home,
  pot,
}

export enum SidebarLayout {
  leftTop,
  leftBottom,
  rightTop,
  rightBottom,
}

export enum FontSize {
  xSmall = 'x-small',
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum Gestures {
  none,
  onlySidebar,
  all,
}
