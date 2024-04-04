import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { IntlService } from 'ember-intl';
import t from 'ember-intl/helpers/t';
import ApiService from 'potber-client/services/api';
import MessagesService from 'potber-client/services/messages';
import { NewPrivateMessage } from 'potber-client/services/api/models/private-message';
import Input, {
  Suggestion,
} from 'potber-client/components/common/control/input';
import Textarea from 'potber-client/components/common/control/textarea';
import styles from './styles.module.css';

interface Signature {
  Args: {
    message: NewPrivateMessage;
  };
}

export default class PrivateMessageForm extends Component<Signature> {
  @service declare api: ApiService;
  @service declare messages: MessagesService;
  @service declare intl: IntlService;

  styles = styles;

  @tracked recipientSuggestions: Suggestion[] = [
    { value: 'foo', label: 'foo' },
    { value: 'bar', label: 'bar' },
  ];

  get message() {
    return this.args.message;
  }

  handleRecipientInput = async (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    const matches = await this.api.findManyUsernames(value);
    this.recipientSuggestions = matches.map((username) => ({
      value: username,
      label: username,
    }));
  };

  handleRecipientChange = async (value: string) => {
    this.message.recipientName = value;
  };

  handleTitleChange = (value: string) => {
    this.message.title = value;
  };

  handleContentChange = (value: string) => {
    this.message.content = value;
  };

  handleSubmit = async (event: Event) => {
    event.preventDefault();
    await this.message.save();
    this.messages.showNotification(
      this.intl.t('feature.private-messages.form.message-sent'),
      'success',
    );
    history.back();
  };

  <template>
    <form id='private-message-form' {{on 'submit' this.handleSubmit}}>
      <Input
        @label={{t 'feature.private-messages.form.recipient.label'}}
        @size='max'
        @value={{@message.recipientName}}
        @suggestions={{this.recipientSuggestions}}
        @onChange={{this.handleRecipientChange}}
        @required={{true}}
        {{on 'input' this.handleRecipientInput}}
        type='text'
        maxLength='255'
        form='private-message-form'
      />
      <Input
        @label={{t 'feature.private-messages.form.title.label'}}
        @size='max'
        @value={{@message.title}}
        @onChange={{this.handleTitleChange}}
        @required={{true}}
        type='text'
        maxLength='255'
        form='private-message-form'
      />
      <Textarea
        @id='textarea-private-message-form'
        @required={{true}}
        @size='max'
        @height='large'
        @value={{@message.content}}
        @onChange={{this.handleContentChange}}
        placeholder={{t 'feature.private-messages.form.content.placeholder'}}
        maxLength='15000'
      />
    </form>
  </template>
}
