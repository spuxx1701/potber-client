import EmberRouter from '@ember/routing/router';
import config from 'potber/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // Add route declarations here
  this.route('');
  this.route('board');
  this.route('thread', { path: '/thread/:thread_id' });
  this.route('not-found', { path: '/*path' });
});
