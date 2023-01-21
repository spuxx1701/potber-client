/* eslint-disable no-console */
import ENV from 'potber/config/environment';
import Service, { service } from '@ember/service';

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

export default class MessagesService extends Service {
  @service declare notifications: any;

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

  /**
   * Renders a notification.
   * @param message The notification message.
   * @param type The notification type.
   * @param options (optional) More options.
   */
  showNotification(
    message: string,
    type: 'info' | 'success' | 'warning' | 'error',
    options?: { callback?: (notification: any) => void }
  ) {
    const notificationOptions = {
      autoClear: true,
      clearDuration: 7000,
      onClick: options?.callback,
    };
    switch (type) {
      case 'success':
        this.notifications.success(message, notificationOptions);
        break;
      case 'warning':
        this.notifications.warning(message, notificationOptions);
        break;
      case 'error':
        this.notifications.error(message, notificationOptions);
        break;
      default:
        this.notifications.info(message, notificationOptions);
    }
  }

  /**
   * Removes the given notification.
   * @param notification The notification.
   */
  removeNotification(notification: any) {
    this.notifications.removeNotification(notification);
  }
}
