import Component from '@glimmer/component';
import { Threads } from 'potber-client/services/api/types';
import Input from 'potber-client/components/common/control/input';
import { t } from 'ember-intl';

interface Signature {
  Args: {
    thread: Threads.Create;
  };
}

export default class PostFormThreadTitle extends Component<Signature> {
  handleChange = (value: string) => {
    this.args.thread.title = value;
  };

  <template>
    <Input
      @label={{t 'feature.post-form.thread.title'}}
      @size='max'
      @value={{@thread.title}}
      @onChange={{this.handleChange}}
      @required={{true}}
      type='text'
      maxLength='255'
    />
  </template>
}
