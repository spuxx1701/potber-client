import Controller from '@ember/controller';
import { appConfig } from 'potber-client/config/app.config';
import { clean } from 'semver';

export default class AboutController extends Controller {
  get version() {
    return clean(appConfig.version);
  }
}
