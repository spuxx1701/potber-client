import ApplicationSerializer from './application';

export default class SessionSerializer extends ApplicationSerializer {
  primaryKey = 'userId';
}
