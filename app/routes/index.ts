import { action } from '@ember/object';
import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import ApiService from 'potber/services/api';
import LocalStorageService from 'potber/services/local-storage';
import ModalService from 'potber/services/modal';
import { sleep } from 'potber/utils/misc';

export default class IndexRoute extends Route {
  @service declare api: ApiService;
  @service declare localStorage: LocalStorageService;
  @service declare modal: ModalService;
  @service declare router: RouterService;

  async model() {
    return await this.api.getBoardCategories();
  }

  @action async didTransition() {
    const unencountedVersion = this.localStorage.getUnencountedVersion();
    if (unencountedVersion) {
      await sleep(1000);
      this.modal.confirm({
        title: 'Es gibt Neuigkeiten!',
        text: `Potber wurde auf Version ${unencountedVersion} aktualisiert. 
        Tippe auf 'OK', um mehr über die Änderungen zu erfahren.`,
        icon: 'star',
        cancelLabel: 'Geh weg!',
        onSubmit: () => {
          this.modal.close();
          this.router.transitionTo('changelog');
        },
      });
    }
    this.localStorage.setEncounteredVersion();
  }
}
