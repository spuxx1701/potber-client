import EmberRouter from '@ember/routing/router';
import config from 'potber/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // Add route declarations here
  this.route('/');
  this.route('board');
  this.route('thread');
  this.route('create-thread');
  this.route('settings');
  this.route('changelog');
  this.route('about');
  this.route('not-found', { path: '/*path' });
});
