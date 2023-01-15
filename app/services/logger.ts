/* eslint-disable no-console */
import ENV from 'potber/config/environment';
import Service from '@ember/service';

export type MessageType = 'info' | 'success' | 'warning' | 'error';

export interface Message {
  timestamp: string;
  type: MessageType;
  text: string;
  context?: string;
}

export interface LogOptions {
  type?: MessageType;
  context?: string;
}

export default class LoggerService extends Service {
  messages: Message[] = [];

  /**
   * Logs the given message.
   * @param text The message text to log.
   * @param options An optional options object.
   */
  log(text: string, options?: LogOptions) {
    this.messages.push({
      text,
      type: options?.type || 'info',
      timestamp: new Date().toISOString(),
      context: options?.context || this.constructor.name,
    });
    if (ENV.APP['DEBUG']) {
      const message = `[${options?.context || this.constructor.name}] [${
        options?.type || 'info'
      }] ${text}`;
      if (options?.type === 'error') {
        console.error(message);
      } else if (options?.type === 'warning') {
        console.warn(message);
      } else {
        console.log(message);
      }
    }
  }
}
