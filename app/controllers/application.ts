import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import NewsFeedService from 'potber-client/services/news-feed';
import RendererService from 'potber-client/services/renderer';
import SettingsService from 'potber-client/services/settings';

export default class ApplicationController extends Controller {
  @service declare renderer: RendererService;
  @service declare session: any;
  @service declare newsFeed: NewsFeedService;
  @service declare settings: SettingsService;

  get leftSidebarExpanded() {
    return this.renderer.leftSidebarExpanded;
  }

  get authenticated() {
    return this.session.isAuthenticated;
  }

  @action toggleLeftSidebar() {
    this.renderer.toggleLeftSidebar();
    if (this.renderer.leftSidebarExpanded && this.settings.autoRefreshSidebar) {
      this.newsFeed.refresh();
    }
  }
}
