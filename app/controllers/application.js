import Ember from 'ember';
const { get, set, computed } = Ember;

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

// returns a position on the board eg: 'one'
function computerPlay(board) {

   //create vacant spaces object
   let vacantBoxes = [];
   for (var key in board) {
     if (board[key] === null) {
       vacantBoxes.push(key);
     }
   }
   if (vacantBoxes.length !==0) {
     let random = Math.floor(Math.random()*vacantBoxes.length);
     return vacantBoxes[random];
   }

}

export default Ember.Controller.extend({
  showDialog: true,
  playerOne: null,
  computer: null,

  showReset: false,
  outcome: null,

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
  computerPlayed: [],
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
      if ((get(this, 'hasQuit'))) {
        return ;
      }
      let xPlayed = get(this, 'xPlayed');
      let oPlayed = get(this, 'oPlayed');
      let winningCombo = get(this, 'winningCombo');

      if (symbol === 'X' && get(this, box) === null) {
        set(this, box, symbol);
        xPlayed.pushObject(number);
        let won = checkIfWon(winningCombo, xPlayed);
        if (won) {
          set(this, 'outcome', 'won');
          set(this, 'showReset', true);
        }
        else {

          let computerSymbol = get(this, 'computer');
          //wow this is shit...current board state
          let board = { 'one': get(this, 'one'), 'two': get(this, 'two'), 'three': get(this, 'three'),
                        'four': get(this, 'four'), 'five': get(this, 'five'), 'six': get(this, 'six'),
                        'seven': get(this, 'seven'), 'eight': get(this, 'eight'), 'nine': get(this, 'nine')
                      };

          let boardMap = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9};

          //computer fills in a random space
          let computerMarked = computerPlay(board);
          let computerPlayed = get(this, 'computerPlayed');
          computerPlayed.pushObject(boardMap[computerMarked]);
          if (computerMarked === undefined) {
            set(this, 'outcome', 'draw');
            set(this, 'showReset', true);
          }
          else {
            set(this, computerMarked, computerSymbol);
            let computerWon = checkIfWon(winningCombo, computerPlayed);
            if (computerWon) {
              set(this, 'outcome', 'lost');
              set(this, 'showReset', true);
            }
          }
        }
      }

      if (symbol === 'O' && get(this, box) === null) {
        set(this, box, symbol);
        oPlayed.pushObject(number);
        let won = checkIfWon(winningCombo, oPlayed);
        if (won) {
          set(this, 'outcome', 'won');
          set(this, 'showReset', true);
        }
        else {
          //next turn
          let computerSymbol = get(this, 'computer');
          //wow this is shit...current board state
          let board = { 'one': get(this, 'one'), 'two': get(this, 'two'), 'three': get(this, 'three'),
                        'four': get(this, 'four'), 'five': get(this, 'five'), 'six': get(this, 'six'),
                        'seven': get(this, 'seven'), 'eight': get(this, 'eight'), 'nine': get(this, 'nine')
                      };

          let boardMap = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9};

          //computer fills in a random space
          let computerMarked = computerPlay(board);
          let computerPlayed = get(this, 'computerPlayed');
          computerPlayed.pushObject(boardMap[computerMarked]);
          if (computerMarked === undefined) {
            set(this, 'outcome', 'draw');
            set(this, 'showReset', true);
          }
          else {
            set(this, computerMarked, computerSymbol);
            let computerWon = checkIfWon(winningCombo, computerPlayed);
            if (computerWon) {
              set(this, 'outcome', 'lost');
              set(this, 'showReset', true);
            }
          }
        }
      }
    },

    quit() {
      set(this, 'showReset', false);
      set(this, 'hasQuit', true);
    },

    reset() {
      set(this, 'showReset', false);
      set(this, 'outcome', null);
      set(this, 'xPlayed', Ember.A());
      set(this, 'oPlayed', Ember.A());
      set(this, 'computerPlayed', Ember.A());
      this.setProperties({ one: null, two: null, three: null, four: null, five: null, six: null, seven: null, eight: null, nine: null });
    },

  }
});
