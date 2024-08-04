import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'potber-client/services/renderer';
import NewsfeedService from 'potber-client/services/newsfeed';
import SettingsService, {
  Gestures,
  SidebarLayout,
} from 'potber-client/services/settings';
import {
  Gesture,
  GestureEvent,
} from 'potber-client/components/features/gestures/types';

export default class SidebarComponent extends Component {
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;
  @service declare newsfeed: NewsfeedService;

  maxWidth = parseInt(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--sidebar-expanded-width')
      .replace(/\D/g, ''),
  );

  gestureState = {
    startWidth: 0,
    newWidth: 0,
  };

  get navVerticalPosition(): 'top' | 'bottom' {
    if (
      (this.settings.sidebarLayout === SidebarLayout.leftBottom ||
        this.settings.sidebarLayout === SidebarLayout.rightBottom) &&
      !this.renderer.isDesktop
    ) {
      return 'bottom';
    }
    return 'top';
  }

  get width(): number {
    const width = parseInt(
      this.renderer.getStyleVariable('--sidebar-width').replace(/\D/g, ''),
    );
    return width;
  }

  get side(): 'left' | 'right' {
    const side =
      this.renderer.getStyleVariable('--sidebar-right') === 'unset'
        ? 'left'
        : 'right';
    return side;
  }

  get enableGestures() {
    return this.settings.getSetting('gestures');
  }

  handleSidebarBackdropClick = () => {
    this.renderer.toggleLeftSidebar(false);
  };

  refreshNewsfeed = () => {
    this.newsfeed.refresh();
  };

  handleSwipeInner = ({ gesture }: GestureEvent) => {
    if (!gesture.velocityX) return;
    this.renderer.toggleLeftSidebar(false);
  };
  handleSwipeOuter = ({ gesture }: GestureEvent) => {
    if (!gesture.velocityX) return;
    this.renderer.toggleLeftSidebar(true);
  };

  handlePanmoveInner = ({ gesture }: GestureEvent) => {
    if (
      !gesture.touchMoveX ||
      (this.settings.isRightSidebar() && gesture.touchMoveX < 0) ||
      (!this.settings.isRightSidebar() && gesture.touchMoveX > 0) ||
      (gesture.touchMoveX && Math.abs(gesture.touchMoveX) > this.maxWidth)
    ) {
      return;
    }

    this.renderer.dragLeftSidebar(
      this.maxWidth - Math.abs(gesture.touchMoveX),
      this.width / this.maxWidth,
    );

    gesture.on('panend', () => {
      // Update the sidebar depending on whether the user has dragged
      // the sidebar 50% of the way open or not.
      this.renderer.toggleLeftSidebar(this.width > this.maxWidth / 2);
    });
  };

  handlePanmoveOuter = ({ gesture }: GestureEvent) => {
    if (
      !gesture.touchMoveX ||
      (this.settings.isRightSidebar() && gesture.touchMoveX > 0) ||
      (!this.settings.isRightSidebar() && gesture.touchMoveX < 0) ||
      (gesture.touchMoveX && Math.abs(gesture.touchMoveX) > this.maxWidth)
    ) {
      return;
    }

    this.renderer.dragLeftSidebar(
      Math.abs(gesture.touchMoveX),
      this.width / this.maxWidth,
    );

    gesture.on('panend', () => {
      // Update the sidebar depending on whether the user has dragged
      // the sidebar 50% of the way open or not.
      this.renderer.toggleLeftSidebar(this.width > this.maxWidth / 2);
    });
  };

  gestures: Record<string, Gesture[]> = {
    inner: [
      {
        type: 'swipeleft',
        onGesture: this.handleSwipeInner,
      },
      {
        type: 'panmove',
        onGesture: this.handlePanmoveInner,
      },
    ],
    outer: [
      {
        type: 'swiperight',
        onGesture: this.handleSwipeOuter,
      },
      {
        type: 'swipeleft',
        onGesture: this.handleSwipeOuter,
      },
      {
        type: 'panmove',
        onGesture: this.handlePanmoveOuter,
      },
    ],
  };

  get disableGestures() {
    return this.settings.getSetting('gestures') === Gestures.none;
  }
}
