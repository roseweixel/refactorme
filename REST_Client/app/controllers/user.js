import Ember from "ember";

export default Ember.ObjectController.extend({
  newName: '',
  newDescription: '',
  userID: function() {
    return this.get("model.id");
  }.property("model.id"),

  actions: {
    createGoal: function(){
      var name = this.get('newName');
      var description = this.get('newDescription');
      var user = this.get('userID');

      var goal = this.store.createRecord('goal', {
        name: name,
        description: description,
        startDate: startDate,
        user: user
      });

      goal.save();
    }
  }
});
