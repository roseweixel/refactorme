import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', { path: '/login' });
  this.route('users');
  this.route('user', { path: '/users/:user_id' }, function(){
    this.resource('goals', function(){
      this.route('new', { path: '/new' });
      this.resource('goal', { path: '/:goal_id' });
    });
    
  }); 

});

export default Router;
