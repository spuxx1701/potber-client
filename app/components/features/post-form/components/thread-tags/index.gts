import Component from '@glimmer/component';
import { Threads } from 'potber-client/services/api/types';
import Input from 'potber-client/components/common/control/input';
import { t } from 'ember-intl';
import { isNullOrWhitespace } from 'potber-client/utils/misc';

interface Signature {
  Args: {
    thread: Threads.Create;
  };
}

export default class PostFormThreadTags extends Component<Signature> {
  get tags() {
    const tags = this.args.thread.tags;
    if (!tags) return '';
    return tags.join(' ');
  }

  handleChange = (value: string) => {
    if (isNullOrWhitespace(value)) {
      this.args.thread.tags = [];
    } else {
      this.args.thread.tags = value.split(' ');
    }
  };

  <template>
    <Input
      @label={{t 'feature.post-form.thread.tags'}}
      @size='max'
      @value={{this.tags}}
      @onChange={{this.handleChange}}
      type='text'
      maxLength='255'
    />
  </template>
}
