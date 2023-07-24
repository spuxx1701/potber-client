import Component from '@glimmer/component';
import { NavHeaderTab } from '../../../component/tabs';

export default class NavRoutesPrivateMessagesComponent extends Component {
  tabs: NavHeaderTab[] = [
    {
      title: 'Eingang',
      route: 'authenticated.private-messages.inbound',
    },
    {
      title: 'Ausgang',
      route: 'authenticated.private-messages.outbound',
    },
    {
      title: 'System',
      route: 'authenticated.private-messages.system',
    },
  ];
}
