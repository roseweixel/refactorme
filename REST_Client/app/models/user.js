import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('String'),
  twitterName: DS.attr('String'),
  joinDate: DS.attr('Date'),
  goals: DS.hasMany('goal', { async: true })
});
