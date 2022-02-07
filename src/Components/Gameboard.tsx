import Keyboard from './Keyboard'
import { useState } from 'react'
import Guess from './Guess'

// Each guess will render a row
// Maybe in the future we can introduce some UI elements so the user can
// set these themselves as a way of increasing / decreasing the difficulty
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;
const ACTUAL_WORD = 'WORDL';

/**
 * updateGuess is passed down to Keyboard which passes it down to KeyTitle
 * keyTile adds whatever key is clicked to the current guess
 * TODO: switch this to context maybe, or just figure out a better strategy
 * for communicating between these 2 levels?
 */
export default function Gameboard() {
  const [guess, updateGuess] = useState([]);
  const [attempt, updateAttemptCount] = useState(0);
  const [prevGuesses, addGuess] = useState([[]]);

  function checkGuess() {
    // TODO: hit the dictionary API to see if this is a real world
    const correct = guess.join('').toUpperCase() === ACTUAL_WORD;

    if (correct) {
      alert('You win!');
    } else {
      // save the guess to render with hints
      if (prevGuesses[0].length) {
        addGuess([...prevGuesses, guess]);
      } else {
        addGuess([guess]);
      }

      updateGuess([]);
      // move onto the next guess
      updateAttemptCount(attempt+1);

    }
  }

  console.log(prevGuesses);

  return (
    <div>
      <Guess
        guesses={MAX_GUESSES}
        wordLength={WORD_LENGTH}
        currentGuess={guess}
        attempt={attempt}
        prevGuesses={prevGuesses}
      />
      <Keyboard guess={guess} onKeyPressCustom={updateGuess} checkGuess={checkGuess} />
    </div>
  )
}