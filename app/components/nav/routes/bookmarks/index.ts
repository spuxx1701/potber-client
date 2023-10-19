import Component from '@glimmer/component';
import { NavHeaderTab } from '../../component/tabs';

export default class NavRoutesBookmarksComponent extends Component {
  tabs: NavHeaderTab[] = [
    {
      title: 'Lesezeichen',
      route: 'authenticated.bookmarks.threads',
    },
    {
      title: 'Gespeicherte Posts',
      route: 'authenticated.bookmarks.saved-posts',
    },
  ];
}
