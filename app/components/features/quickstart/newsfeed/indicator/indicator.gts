import { service } from '@ember/service';
import Component from '@glimmer/component';
import NewsfeedService from 'potber-client/services/newsfeed';
import RendererService from 'potber-client/services/renderer';
import SettingsService, {
  SidebarLayout,
} from 'potber-client/services/settings';
import styles from './styles.module.css';
import { concat } from '@ember/helper';
import classNames from 'potber-client/helpers/class-names';

export default class NewsfeedIndicatorComponent extends Component {
  styles = styles;
  @service declare renderer: RendererService;
  @service declare newsfeed: NewsfeedService;
  @service declare settings: SettingsService;

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

  get status() {
    if (this.renderer.leftSidebarExpanded) {
      return 'none';
    } else {
      return this.newsfeed.status;
    }
  }

  <template>
    <span
      id='newsfeed-indicator'
      class='{{classNames
          this
          (concat "position-" this.position)
          (concat "status-" this.status)
        }}'
      data-test-newsfeed-indicator
    />
  </template>
}
