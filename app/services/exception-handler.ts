import Service, { service } from '@ember/service';
import MessagesService from './messages';
import { Exception } from 'potber-client/exceptions';

export default class ExceptionHandler extends Service {
  @service declare messages: MessagesService;

  initialize() {
    window.onerror = this.handleError;
  }

  handleError = (
    _event: string | Event,
    _source?: string,
    _lineno?: number,
    _colno?: number,
    error?: Error,
  ) => {
    if (error?.name.endsWith('Exception')) {
      const exception = error as Exception;
      if (!exception.catchMe) return;
      this.messages.log(exception.message, { type: 'error', context: _source });
      debugger;
    }
  };
}
