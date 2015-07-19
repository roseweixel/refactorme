import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('goals', function(){
    this.resource('goal', { path: '/:goal_id' });
  });
});

export default Router;
