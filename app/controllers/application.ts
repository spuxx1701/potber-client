import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked leftSidebarExpanded = false;

  @action toggleLeftSidebar() {
    this.leftSidebarExpanded = !this.leftSidebarExpanded;
    const style = document.documentElement.style;
    if (this.leftSidebarExpanded) {
      style.setProperty(
        '--sidebar-left-width',
        'var(--sidebar-expanded-width)'
      );
    } else {
      style.setProperty('--sidebar-left-width', '0px');
    }
  }
}
