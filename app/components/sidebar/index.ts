import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'potber-client/services/renderer';
import NewsfeedService from 'potber-client/services/newsfeed';
import SettingsService, {
  SidebarLayout,
} from 'potber-client/services/settings';
import {
  Gesture,
  GestureEvent,
} from 'potber-client/components/misc/gestures/types';

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
    return this.settings.getSetting('enableGestures');
  }

  handleSidebarBackdropClick = () => {
    this.renderer.toggleLeftSidebar(false);
  };

  handleSwipeHorzontal = ({ gesture, type }: GestureEvent) => {
    if (!gesture.velocityX) return;
    this.renderer.setStyleVariable(
      '--sidebar-transition-time',
      'var(--sidebar-transition-time-swipe)',
    );
    if (type === 'swipeleft' && this.renderer.leftSidebarExpanded) {
      this.renderer.toggleLeftSidebar(false);
    } else if (type === 'swiperight' && !this.renderer.leftSidebarExpanded) {
      this.renderer.toggleLeftSidebar(true);
    }
  };

  gestures: Gesture[] = [
    {
      type: 'swiperight',
      onGesture: this.handleSwipeHorzontal,
    },
    {
      type: 'swipeleft',
      onGesture: this.handleSwipeHorzontal,
    },
  ];

  refreshNewsfeed = () => {
    this.newsfeed.refresh();
  };
}
