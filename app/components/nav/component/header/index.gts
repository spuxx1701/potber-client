import { TOC } from '@ember/component/template-only';
import LazyText from 'potber-client/components/common/lazy-stuff/text';
import or from 'ember-truth-helpers/helpers/or';

const NavHeader: TOC<{
  Args: { title: string; subtitle?: string; loading?: boolean };
  Blocks: { default: [] };
}> = <template>
  <div class='nav-header'>
    <LazyText @loading={{@loading}} @length={{10}}>
      <h4 class='title max-lines-2'>{{@title}}</h4>
    </LazyText>
    {{#if @subtitle}}
      <LazyText @loading={{@loading}} @length={{6}}>
        <p class='subtitle'>{{@subtitle}}</p>
      </LazyText>
    {{/if}}
  </div>
</template>;

export default NavHeader;
