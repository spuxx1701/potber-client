import Component from '@glimmer/component';
import classNames from 'potber-client/helpers/class-names';
import styles from './styles.module.css';
import { htmlSafe } from '@ember/template';

interface Signature {
  Element: HTMLSpanElement;
  Args: {
    loading?: any;
    length: number;
    lengthRandomness?: number;
    lines?: number;
    linesRandomness?: number;
  };
  Blocks: {
    default: [];
  };
}

interface Line {
  length: number;
}

export default class LazyText extends Component<Signature> {
  styles = styles;

  generateLineLength() {
    const lengthRandomness = this.args.lengthRandomness ?? 0;
    if (!lengthRandomness) return this.args.length;
    const min = this.args.length - lengthRandomness;
    const max = this.args.length + lengthRandomness;
    const length = Math.round(Math.random() * (max - min) + min);
    return length > 0 ? length : 0;
  }

  generateNumberOflines() {
    const baseline = this.args.lines ?? 1;
    const linesRandomness = this.args.linesRandomness ?? 0;
    if (!linesRandomness) return baseline;
    const min = baseline - linesRandomness;
    const max = baseline + linesRandomness;
    const numberOfLines = Math.round(Math.random() * (max - min) + min);
    return numberOfLines > 0 ? numberOfLines : 1;
  }

  get lines() {
    const numberOfLines = this.generateNumberOflines();
    const lines: Line[] = [];
    for (let i = 0; i < numberOfLines; i++) {
      lines.push({ length: this.generateLineLength() });
    }
    return lines;
  }

  <template>
    {{#if @loading}}
      {{#each this.lines as |line|}}
        <span
          class='skeleton-element {{classNames this "lazy-text"}}'
          style={{htmlSafe 'width: {{line.length}}rem;'}}
          ...attributes
        ><span class='skeleton-shimmer' /></span>
      {{/each}}
    {{else}}
      {{yield}}
    {{/if}}
  </template>
}
