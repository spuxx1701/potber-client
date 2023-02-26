import { action } from '@ember/object';
import Component from '@glimmer/component';

interface Signature {
  Args: {
    title: string;
    subtitle?: string;
    enableBackNavigation?: boolean;
  };
}

export default class NavGenericComponent extends Component<Signature> {
  @action handleBackClick() {
    history.back();
  }
}
