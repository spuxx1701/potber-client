import EmberRouter from '@ember/routing/router';
import config from 'potber-client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // Add route declarations here
  this.route('login');
  this.route('about');
  this.route('applog');
  this.route('changelog');
  this.route('authenticated', { path: '/' }, function () {
    this.route('home');
    this.route('board-overview');
    this.route('board');
    this.route('thread');
    this.route('settings');
    this.route('bookmarks', function () {
      this.route('threads');
      this.route('saved-posts');
    });
    this.route('post', function () {
      this.route('create');
      this.route('quote');
      this.route('edit');
    });
    this.route('private-messages', function () {
      this.route('inbound');
      this.route('outbound');
      this.route('system');
      this.route('view', { path: '/view/:id' });
    });
  });
  this.route('not-found', { path: '/*path' });
});
