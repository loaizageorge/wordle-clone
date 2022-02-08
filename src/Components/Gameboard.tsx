import { useState } from 'react'

import Keyboard from './Keyboard'
import Guess from './Guess'

// Each guess will render a row
// Maybe in the future we can introduce some UI elements so the user can
// set these themselves as a way of increasing / decreasing the difficulty
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

// TODO: Generate this automagically somehow.. dictionary API?
const ACTUAL_WORD = ['W','O', 'R', 'D', 'L'];

/**
 * TODO: switch this to context maybe, or just figure out a better strategy
 * for communicating between these 2 levels?
 */
const Gameboard = () => {
  const [guess, updateGuess] = useState([]);
  const [attempt, updateAttemptCount] = useState(0);
  const [prevGuesses, addGuessToPrev] = useState([[]]);

  /**
   * 1. Guess === Word => You win!
   * 2. Guess !== Word && attempt === MAX_ATTEMPTS => You lost!
   * 3. ^ && attempt < MAX_ATTEMPTS => Move onto the next guess row and render
   *      previous guesses with hint highlights
   */
  const checkGuess = () => {
    // Don't pass go, don't collect $200
    if (guess.length < WORD_LENGTH) {
      return false;
    }

    // TODO: hit the dictionary API to see if this is a real world
    const correct = guess.join('').toUpperCase() === ACTUAL_WORD.join('');

    if (correct) {
      alert('You win!');
    } else {
      // save the guess to render with hints
      if (prevGuesses[0].length) {
        addGuessToPrev([...prevGuesses, guess]);
      } else {
        addGuessToPrev([guess]);
      }

      updateGuess([]);
      // move onto the next guess
      updateAttemptCount(attempt+1);

    }
  }

  // TOOD: Maybe these 2 methods can live in the Keyboard component?
  const addLetterToGuess = (letter: string) => {
    if (guess.length < WORD_LENGTH) {
      // @ts-ignore -> TODO: wtf?
      updateGuess(guess.concat(letter.toUpperCase()));
    }
  }

  const removePrevLetterFromGuess = () => {
    if (guess.length) {
      const removed = guess.slice(0, -1);
      updateGuess(removed);
    }
  }

  return (
    <div>
      <Guess
        actualWord={ACTUAL_WORD}
        guesses={MAX_GUESSES}
        wordLength={WORD_LENGTH}
        currentGuess={guess}
        attempt={attempt}
        prevGuesses={prevGuesses}
      />
      <Keyboard
        addLetterToGuess={addLetterToGuess}
        checkGuess={checkGuess}
        removePrevLetterFromGuess={removePrevLetterFromGuess}
      />
    </div>
  )
}

export default Gameboard;