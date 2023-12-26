import Component from '@glimmer/component';
import classNames from 'potber-client/helpers/class-names';
import styles from './styles.css';

interface Signature {
  Element: HTMLSpanElement;
  Args: {
    src: string;
    size?: 'small' | 'large';
    showSkeleton?: boolean;
  };
}

export default class Avatar extends Component<Signature> {
  styles = styles;

  get size() {
    return this.args.size || 'small';
  }

  <template>
    <span
      class='avatar
        {{classNames this this.size (if this.args.showSkeleton "loading" "")}}'
      ...attributes
    >
      {{#unless this.args.showSkeleton}}
        <img src={{@src}} alt={{@src}} />
      {{else}}
        <span class='skeleton-element'>
          <span class='skeleton-shimmer' />
        </span>
      {{/unless}}
    </span>
  </template>
}
