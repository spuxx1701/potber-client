import Controller from '@ember/controller';
import ENV from 'potber/config/environment';
import { clean } from 'semver';

export default class AboutController extends Controller {
  get version() {
    return clean(ENV.APP['version'] as string);
  }
}
