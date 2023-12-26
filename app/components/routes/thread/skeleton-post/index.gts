import classNames from 'potber-client/helpers/class-names';
import Component from '@glimmer/component';
import { service } from '@ember/service';
import DeviceManagerService from 'potber-client/services/device-manager';
import SettingsService, { AvatarStyle } from 'potber-client/services/settings';
import styles from './styles.css';
import postStyles from 'potber-client/components/board/post/styles.css';
import LazyText from 'potber-client/components/common/lazy-stuff/text';
import Avatar from 'potber-client/components/common/avatar';

export default class SkeletonPost extends Component {
  @service declare deviceManager: DeviceManagerService;
  @service declare settings: SettingsService;

  get showAvatar() {
    return this.settings.getSetting('avatarStyle') === AvatarStyle.small;
  }

  get lineLength() {
    return this.deviceManager.isDesktop ? 50 : 15;
  }

  get lineLengthRandomness() {
    return this.lineLength + 10;
  }

  styles = { ...postStyles, ...styles };

  <template>
    <span class='post'>
      <span class={{classNames this 'header'}}>
        <span class={{classNames this 'details'}}>
          {{#if this.showAvatar}}
            <Avatar @src='' @showSkeleton={{true}} />
          {{/if}}
          <LazyText
            @loading={{true}}
            @length={{5}}
            @lengthRandomness={{3}}
            class={{classNames this 'author'}}
          />
          <LazyText
            @loading={{true}}
            @length={{11}}
            class={{classNames this 'date'}}
          />
        </span>
      </span>
      <span class={{classNames this 'body'}}>
        <LazyText
          @loading={{true}}
          @length={{this.lineLength}}
          @lengthRandomness={{this.lineLengthRandomness}}
          @lines={{5}}
          @linesRandomness={{4}}
          class={{classNames this 'date'}}
        />
      </span>
    </span>
  </template>
}
