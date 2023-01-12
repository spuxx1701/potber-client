import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class MainNavComponent extends Component {
  @action handleSidebarClick() {
    // do something
  }
}
