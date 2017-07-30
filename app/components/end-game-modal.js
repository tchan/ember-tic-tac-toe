import Ember from 'ember';

export default Ember.Component.extend({
  outcome: null,
  actions: {
    quit() {
      // console.log('quit from component');
       this.sendAction('quit');
    },

    reset() {
      // console.log('reset from component');
      this.sendAction('reset');
    }
  }
});
