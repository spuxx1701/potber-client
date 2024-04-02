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
  transitions: Transitions;
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

export const Transitions = {
  dynamic: 'dynamic',
  static: 'static',
} as const;

export type Transitions = (typeof Transitions)[keyof typeof Transitions];
