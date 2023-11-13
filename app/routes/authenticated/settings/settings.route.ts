import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { DropdownOption } from 'potber-client/components/common/control/dropdown/types';
import Session from 'potber-client/models/session';
import RendererService from 'potber-client/services/renderer';
import SessionService from 'potber-client/services/session';
import SettingsService, { Settings } from 'potber-client/services/settings';
import { settingsConfig } from '../settings';

type CurrentOptions = Record<
  `current${Capitalize<keyof Settings>}Option`,
  DropdownOption
>;

export interface SettingsRouteModel extends CurrentOptions {
  session: Session | null;
}

export default class SettingsRoute extends Route {
  @service declare session: SessionService;
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;

  async model(): Promise<SettingsRouteModel> {
    if (!this.session.sessionData) await this.session.update();
    const model: SettingsRouteModel = {
      session: this.session.sessionData,
      ...(this.getEachCurrentSettingOption() as CurrentOptions),
    };
    return model;
  }

  @action didTransition() {
    this.renderer.trySetScrollPosition();
  }

  /**
   * Returns an object with the key of each setting and the currently selected option.
   */
  getEachCurrentSettingOption() {
    const optionsKeys = Object.keys(
      settingsConfig,
    ) as (keyof typeof settingsConfig)[];
    // Create the correct set of keys using `current` prefix and changing them to singular
    const keys = optionsKeys.map((key) => {
      return `current${key.charAt(0).toUpperCase()}${key.slice(
        1,
        (key as string).length - 1,
      )}`;
    });
    // Create the corresponding set of settings keys
    const settingsKeys = optionsKeys.map((key) => {
      return key.replace('Options', '');
    });
    const result: Partial<CurrentOptions> = {};
    keys.forEach((key, index) => {
      const options =
        settingsConfig[optionsKeys[index] as keyof typeof settingsConfig];
      result[key as keyof CurrentOptions] = options.find((option) => {
        const settingsKey = settingsKeys[index];
        return (
          option.data ===
          this.settings.getSettings()[settingsKey as keyof Settings]
        );
      }) as DropdownOption;
    });
    return result;
  }
}
