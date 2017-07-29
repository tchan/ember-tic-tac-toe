import Ember from 'ember';
const { get, set } = Ember;

export default Ember.Controller.extend({
  showDialog: true,
  playerOne: null,
  computer: null,

  actions: {
    closeDialog() {
      set(this, 'showDialog', false);
    },
    selectSymbol(symbol) {
      // console.log('symbol selected: ', symbol);
      set(this, 'playerOne', symbol);
      if (symbol === 'X') {
        set(this, 'computer', 'O');
      }
      else {
        set(this, 'computer', 'X');
      }
      set(this, 'showDialog', false);
    }
  }
});
