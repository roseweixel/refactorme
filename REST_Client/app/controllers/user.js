import Ember from "ember";

export default Ember.ObjectController.extend({
  newName: '',
  newDescription: '',
  userID: function() {
    return this.get("model.id");
  }.property("model.id"),
  user: function() {
    return this.get("model");
  }.property("model"),

  actions: {
    createGoal: function(){
      var name = this.get('newName');
      var description = this.get('newDescription');
      var userID = this.get('userID');
      var startDate = new Date();

      var goal = this.store.createRecord('goal', {
        name: name,
        description: description,
        user: userID,
        startDate: startDate
      });
      this.get('user').get('goals').addObject(goal);
      goal.save();
    }
  }
});
