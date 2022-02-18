import { useState } from 'react'

import Keyboard from './Keyboard'
import Guess from './Guess'
import request from '../utils/request'
import styled from 'styled-components'

// Each guess will render a row
// Maybe in the future we can introduce some UI elements so the user can
// set these themselves as a way of increasing / decreasing the difficulty
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

// TODO: Generate this automagically somehow.. dictionary API?
const ACTUAL_WORD = ['W','O', 'R', 'D', 'L'];

const GameboardStyles = styled.div`
  display: grid;
  grid-gap: 1rem;
  max-width: 520px;
  margin: 0 auto;
`;

/**
 * TODO: switch this to context maybe, or just figure out a better strategy
 * for communicating between these 2 levels?
 */
const Gameboard = () => {
  const [guess, updateGuess] = useState([]);
  const [attempt, updateAttemptCount] = useState(0);
  const [prevGuesses, addGuessToPrev] = useState([[]]);
  const [flipRowAnimation, setFlipRowAnimation] = useState(false);

  /**
   * 1. Guess === Word => You win!
   * 2. Guess !== Word && attempt === MAX_ATTEMPTS => You lost!
   * 3. Guess !== Word && attempt < MAX_ATTEMPTS => guess gets hints and player moves
   * onto the next row
   */
  const checkGuess = async () => {
    // Don't pass go, don't collect $200
    if (guess.length < WORD_LENGTH) {
      return false;
    }

    const realWord = await checkIfGuessIsRealWord();
    if (!realWord) {
      alert('The word you have guessed has been deemed fake by Merriam')
      // TODO: Fail / shake tile animation
      return false;
    }
    // save the guess to render with hints
    if (prevGuesses[0].length) {
      addGuessToPrev([...prevGuesses, guess]);
    } else {
      addGuessToPrev([guess]);
    }

    // The word will be checked on componentDidUpdate so we can apply animations
    // to the guess on the previous row, along with styled guess tiles
    updateGuess([]);
    updateAttemptCount(attempt+1);
    setFlipRowAnimation(true);


  }

  // TODO: move this to useEffect on prevGuesses change
  const checkGuess2 =() => {
    const correct = guess.join('').toUpperCase() === ACTUAL_WORD.join('');
  }

  const checkIfGuessIsRealWord = async () => {
    return true;
    const response = await request(guess.join(''));
    return response.some((item: any) => typeof(item) === 'object');
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
    <GameboardStyles>
      <Guess
        actualWord={ACTUAL_WORD}
        guesses={MAX_GUESSES}
        wordLength={WORD_LENGTH}
        currentGuess={guess}
        attempt={attempt}
        prevGuesses={prevGuesses}
        flipRowAnimation={flipRowAnimation}
      />
      <Keyboard
        addLetterToGuess={addLetterToGuess}
        checkGuess={checkGuess}
        removePrevLetterFromGuess={removePrevLetterFromGuess}
      />
    </GameboardStyles>
  )
}

export default Gameboard;