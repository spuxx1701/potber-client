import { service } from '@ember/service';
import Component from '@glimmer/component';
import NewsfeedService from 'potber-client/services/newsfeed';
import RendererService from 'potber-client/services/renderer';
import SettingsService, {
  SidebarLayout,
} from 'potber-client/services/settings';

export default class NewsfeedIndicatorComponent extends Component {
  @service declare renderer: RendererService;
  @service declare newsfeed: NewsfeedService;
  @service declare settings: SettingsService;

  get status(): 'none' | 'info' | 'important' {
    if (!this.renderer.leftSidebarExpanded) {
      if (
        this.newsfeed.unreadBookmarks &&
        this.newsfeed.unreadBookmarks.length > 0
      ) {
        return 'info';
      }
    }
    return 'none';
  }

  get position(): 'left' | 'right' {
    if (
      this.settings.sidebarLayout === SidebarLayout.rightTop ||
      this.settings.sidebarLayout === SidebarLayout.rightBottom
    ) {
      return 'left';
    } else {
      return 'right';
    }
  }
}
