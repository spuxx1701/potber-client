import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'potber-client/services/renderer';
import SettingsService, {
  SidebarLayout,
} from 'potber-client/services/settings';
import { appConfig } from 'potber-client/config/app.config';
// TODO: Fix type import
// import TinyGesture from 'tinygesture';

export default class SidebarComponent extends Component {
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;

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

  handleGesture = (gesture: any, event: MouseEvent | TouchEvent) => {
    if (Math.abs(gesture.velocityX) > appConfig.swipeVelocityThredhold) {
      this.renderer.setStyleVariable(
        '--sidebar-transition-time',
        'var(--sidebar-transition-time-swipe)',
      );
      // Handling fast swiping gestures
      if (gesture.velocityX < 0 && this.renderer.leftSidebarExpanded) {
        this.renderer.toggleLeftSidebar(false);
      } else if (gesture.velocityX > 0 && !this.renderer.leftSidebarExpanded) {
        this.renderer.toggleLeftSidebar(true);
      }
    } else {
      // Handling slow panning gestures
      switch (event.type) {
        case 'touchstart':
        case 'mousedown': {
          this.gestureState = {
            startWidth: this.width,
            newWidth: this.width,
          };
          // Change the transition for the time of the gesture
          this.renderer.setStyleVariable(
            '--sidebar-transition-time',
            'var(--sidebar-transition-time-pan)',
          );
          break;
        }

        case 'touchmove':
        case 'mousemove': {
          const { touchMoveX } = gesture;
          const newWidth = this.gestureState.startWidth + touchMoveX;
          if (newWidth < 0) {
            this.renderer.toggleLeftSidebar(false);
          } else if (newWidth > this.maxWidth) {
            this.renderer.toggleLeftSidebar(true);
          } else {
            this.gestureState.newWidth = newWidth;
            this.renderer.setStyleVariable('--sidebar-width', `${newWidth}px`);
          }
          break;
        }

        default: {
          if (this.gestureState.newWidth > this.maxWidth * 0.5) {
            this.renderer.toggleLeftSidebar(true);
          } else {
            this.renderer.toggleLeftSidebar(false);
          }
        }
      }
    }
  };

  handleSidebarBackdropClick = () => {
    this.renderer.toggleLeftSidebar(false);
  };
}
