import Component from '@glimmer/component';

interface Signature {
  Args: {
    tabs: NavHeaderTab[];
  };
}

export interface NavHeaderTab {
  title: string;
  route: string;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class NavHeaderTabsComponent extends Component<Signature> {}
