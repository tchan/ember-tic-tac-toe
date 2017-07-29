import Ember from 'ember';
const { get, set, computed } = Ember;

function sortNumber(a,b) {
    return a - b;
}

function checkIfWon(combo, symbol) {
  for (var i=0; i<combo.length; i++) {
    //loop through each array winning combo
    var count = 0;
    for (var j=0; j<symbol.length; j++) {
      if (combo[i].includes(symbol[j])) {
        count +=1;
      }
    }

    if (count === 3) {
      return true;
    }
  }
  return false;
}

export default Ember.Controller.extend({
  showDialog: true,
  playerOne: null,
  computer: null,

  showReset: false,

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

  winningCombo: [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7]
  ],

  xPlayed: [],
  oPlayed: [],
  //xPlayed: Ember.A([]),

  // sortedXCombos: computed('xPlayed.[]', function() {
  //   let xPlayed = get(this, 'xPlayed');
  //   //duplicate array for no reason at all besidese testing
  //   let sorted = xPlayed.slice();
  //   sorted = sorted.sort(sortNumber);
  //   return sorted;
  // }),

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

    markBox(symbol, box, number) {
      // console.log('number', number);

      set(this, box, symbol);
      let xPlayed = get(this, 'xPlayed');
      let oPlayed = get(this, 'oPlayed');
      let winningCombo = get(this, 'winningCombo');

      if (symbol === 'X') {
        xPlayed.pushObject(number);
        let won = checkIfWon(winningCombo, xPlayed);
        if (won) {
          set(this, 'showReset', true);
        }
      }

      if (symbol === 'O') {
        oPlayed.pushObject(number);
        let won = checkIfWon(winningCombo, oPlayed);
        if (won) {
          set(this, 'showReset', true);
        }
      }
    },

    quit() {
      console.log('quit');
    },

    reset() {
      console.log('reset');
    }

  }
});
