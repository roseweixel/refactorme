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
      .then(function(res){
        var user = goal.get('user');
        controller.set('editing', false);
        controller.transitionToRoute('goal', user, goal);
      });
    },
    deleteGoal: function(goal){
      var controller = this;
      var user = goal.get('user');
      // debugger;
      goal.destroyRecord().then(function() {
        debugger;
        controller.transitionToRoute('user', user);
      });
    },
  }
});
