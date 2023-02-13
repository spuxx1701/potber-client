import EmberRouter from '@ember/routing/router';
import config from 'potber-client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // Add route declarations here
  this.route('home');
  this.route('login');
  this.route('about');
  this.route('applog');
  this.route('changelog');
  this.route('authenticated', { path: '/' }, function () {
    this.route('board-overview');
    this.route('session');
    this.route('board');
    this.route('thread');
    this.route('settings');
    this.route('bookmarks');
    this.route('post', function () {
      this.route('create');
      this.route('edit');
    });
  });
  this.route('not-found', { path: '/*path' });
});
