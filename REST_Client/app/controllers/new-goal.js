import Ember from "ember";

export default Ember.ArrayController.extend({
  newName: '',
  newDescription: '',
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
