import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('String'),
  startDate: DS.attr('Date'),
  endDate: DS.attr('Date'),
  description: DS.attr('String'),
  user: DS.belongsTo('user', { async: true })
});
