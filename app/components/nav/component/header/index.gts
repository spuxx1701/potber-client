import { TOC } from '@ember/component/template-only';

const NavHeader: TOC<{
  Args: { title: string; subtitle?: string };
  Blocks: { default: [] };
}> = <template>
  <div class='nav-header'>
    <h4 class='title max-lines-2'>{{@title}}</h4>
    {{#if @subtitle}}
      <p class='subtitle'>{{@subtitle}}</p>
    {{/if}}
  </div>
</template>;

export default NavHeader;
