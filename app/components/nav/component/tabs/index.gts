import { TOC } from '@ember/component/template-only';
import ButtonLink from 'potber-client/components/common/button-link';

export interface NavTab {
  title: string;
  route: string;
}

export const NavTabs: TOC<{
  Args: { tabs: NavTab[] };
}> = <template>
  <div class='nav-tabs'>
    {{#each @tabs as |tab|}}
      <ButtonLink @route={{tab.route}}>
        {{tab.title}}
      </ButtonLink>
    {{/each}}
  </div>
</template>;
