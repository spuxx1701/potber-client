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
  'snowman',
  'default-round',
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
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum Gestures {
  none,
  onlySidebar,
  all,
}
