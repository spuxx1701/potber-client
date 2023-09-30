import eq from 'ember-truth-helpers/helpers/eq';
import Component from '@glimmer/component';
import { ChangelogItem } from 'potber-client/changelog';
import { clean } from 'semver';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';

interface Signature {
  Args: {
    item: ChangelogItem;
  };
}

export default class ChangelogItemComponent extends Component<Signature> {
  get icon() {
    if (this.args.item.type === 'minor') {
      return 'star-half-stroke';
    } else {
      return 'star';
    }
  }

  get prefix() {
    if (this.args.item.type === 'major') {
      return 'fas';
    } else {
      return 'far';
    }
  }

  get title() {
    return clean(this.args.item.version);
  }

  <template>
    <div class='changelog-item'>
      <div class='changelog-item-header'>
        <FaIcon @icon={{this.icon}} @prefix={{this.prefix}} />
        {{#if (eq @item.type 'major')}}
          <h2>{{this.title}}</h2>
        {{else if (eq @item.type 'minor')}}
          <h3>{{this.title}}</h3>
        {{else}}
          <h4>{{this.title}}</h4>
        {{/if}}
      </div>
      {{#if @item.added}}
        <p class='title'>Added:</p>
        <ul>
          {{#each @item.added as |element|}}
            <li>{{element}}</li>
          {{/each}}
        </ul>
      {{/if}}
      {{#if @item.changed}}
        <p class='title'>Changed:</p>
        <ul>
          {{#each @item.changed as |element|}}
            <li>{{element}}</li>
          {{/each}}
        </ul>
      {{/if}}
      {{#if @item.removed}}
        <p class='title'>Removed:</p>
        <ul>
          {{#each @item.removed as |element|}}
            <li>{{element}}</li>
          {{/each}}
        </ul>
      {{/if}}
      {{#if @item.fixed}}
        <p class='title'>Fixed:</p>
        <ul>
          {{#each @item.fixed as |element|}}
            <li>{{element}}</li>
          {{/each}}
        </ul>
      {{/if}}
    </div>
  </template>
}
