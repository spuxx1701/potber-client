import Component from '@glimmer/component';
import { service } from '@ember/service';
import { LinkTo } from '@ember/routing';
import { on } from '@ember/modifier';
import RendererService from 'potber-client/services/renderer';

export interface Signature {
  Element: Element;
  Args: {
    route: string;
    model?: string;
    query?: Record<string, unknown>;
    size?: ControlSize;
    variant?: ControlVariant;
    disabled?: boolean;
    iconSize?: IconSize;
    onClick?: () => void;
  };
  Blocks: {
    default: [];
  };
}

export default class CommonControlLinkComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  declare args: Signature['Args'];

  handleClick = (event: MouseEvent) => {
    this.renderer.createClickRipple(event);
    if (this.args.onClick) {
      this.args.onClick();
    }
  };

  get variant() {
    return this.args.variant || 'primary-transparent';
  }

  get iconSize() {
    return this.args.iconSize || 'auto';
  }

  get query() {
    return this.args.query || {};
  }

  <template>
    {{#if @model}}
      <LinkTo
        @route={{@route}}
        @query={{this.query}}
        @model={{@model}}
        @disabled={{@disabled}}
        {{on 'click' this.handleClick}}
        class='button-link control-size-{{@size}}
          icon-size-{{this.iconSize}}
          control-variant-{{this.variant}}
          {{if @disabled "button-link-disabled"}}'
        ...attributes
      >
        {{yield}}
      </LinkTo>
    {{else}}
      <LinkTo
        @route={{@route}}
        @query={{this.query}}
        @disabled={{@disabled}}
        {{on 'click' this.handleClick}}
        class='button-link control-size-{{@size}}
          icon-size-{{this.iconSize}}
          control-variant-{{this.variant}}
          {{if @disabled "button-link-disabled"}}'
        ...attributes
      >
        {{yield}}
      </LinkTo>
    {{/if}}
  </template>
}
