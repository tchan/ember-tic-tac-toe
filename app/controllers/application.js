import Ember from 'ember';
const { get, set, computed } = Ember;

export default Ember.Controller.extend({
  showDialog: true,
  playerOne: null,
  computer: null,

  startingPlayer: computed('playerOne', function() {
    let playerOne = get(this, 'playerOne');
    return playerOne;
  }),
  //board values
  one: null,
  two: null,
  three: null,
  four: null,
  five: null,
  six: null,
  seven: null,
  eight: null,
  nine: null,

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
    },
    markBox(symbol, box) {
      set(this, box, symbol);
    }
  }
});
