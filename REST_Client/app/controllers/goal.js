import Ember from "ember";

export default Ember.Controller.extend({
  editing: false,
  actions: {
    startEdit: function(){
      this.set('editing', true);
    },
    saveGoal: function(){
      var goal = this.get('model');
      var name = this.get('model.name');
      var description = this.get('model.description');

      goal.set("name", name);
      goal.set("description", description);

      var controller = this;
      goal.save()
      .then(function(){
        controller.set('editing', false);
      });
    },
    deleteGoal: function(){
      var goal = this.get('model');
      goal.destroyRecord();
    }
  }
});
