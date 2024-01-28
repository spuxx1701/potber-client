/* eslint-disable no-console */
import Service, { service } from '@ember/service';
import SettingsService, { Settings } from './settings';

export type MessageType = 'info' | 'success' | 'warning' | 'error';

export interface Message {
  date: Date;
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
  @service declare settings: SettingsService;

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
      date: new Date(),
      context: options?.context || this.constructor.name,
    });
    if (this.settings.getSetting('debug')) {
      const message = `[${options?.context || this.constructor.name}] [${
        options?.type || 'info'
      }] ${text}`;
      if (options?.type === 'error') {
        console.error(message);
      } else if (options?.type === 'warning') {
        console.warn(message);
      } else {
        console.debug(message);
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
    type: MessageType,
    options?: { callback?: (notification: any) => void },
  ) {
    const notificationOptions = {
      autoClear: true,
      clearDuration: 5000,
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
   * Logs an error and notifies the user.
   * @param text The notification text.
   * @param error The error.
   * @param context The calling context.
   */
  logErrorAndNotify(text: string, error: any, context: any) {
    this.log(error, {
      type: 'error',
      context: context,
    });
    this.showNotification(text, 'error');
  }

  /**
   * Removes the given notification.
   * @param notification The notification.
   */
  removeNotification(notification: any) {
    this.notifications.removeNotification(notification);
  }
}
