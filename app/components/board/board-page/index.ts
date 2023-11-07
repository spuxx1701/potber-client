import { getOwner } from '@ember/application';
import { service } from '@ember/service';
import { Owner } from '@ember/test-helpers/build-owner';
import Component from '@glimmer/component';
import Board from 'potber-client/models/board';
import BoardRoute from 'potber-client/routes/authenticated/board';
import SettingsService, { Gestures } from 'potber-client/services/settings';

interface Signature {
  Args: {
    board: Board;
  };
}

export default class BoardPageComponent extends Component<Signature> {
  @service declare settings: SettingsService;

  get threads() {
    return this.args.board.page.threads;
  }

  get disableOverscroll() {
    return (
      this.settings.getSetting('gestures') === Gestures.none ||
      this.settings.getSetting('gestures') === Gestures.onlySidebar
    );
  }

  handleOverscroll = () => {
    const route = (getOwner(this) as Owner).lookup(
      'route:authenticated.board',
    ) as BoardRoute;
    route.refresh();
  };
}
