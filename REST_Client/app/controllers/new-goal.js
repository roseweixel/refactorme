import Ember from "ember";

export default Ember.ArrayController.extend({
  newName: '',
  newDescription: '',
  newThing: "thisIsCrazy",
  userID: function() {
    return this.get("model.name");
  }.property("model.name"),

  actions: {
    createGoal: function(){
      var name = this.get('newName');
      var description = this.get('newDescription');

      var goal = this.store.createRecord('goal', {
        name: name,
        description: description
      });

      goal.save();
    }
  }
});
