import { getOwner } from '@ember/application';
import { Owner } from '@ember/test-helpers/build-owner';
import Component from '@glimmer/component';
import Board from 'potber-client/models/board';
import BoardRoute from 'potber-client/routes/authenticated/board';

interface Signature {
  Args: {
    board: Board;
  };
}

export default class BoardPageComponent extends Component<Signature> {
  get threads() {
    return this.args.board.page.threads;
  }

  handleOverscroll = () => {
    const route = (getOwner(this) as Owner).lookup(
      'route:authenticated.board',
    ) as BoardRoute;
    route.refresh();
  };
}
