import React, { useState } from 'react';
import styled from 'styled-components';
import Keyboard from './Keyboard';
import Board from './Board';
import request from '../utils/request';
import { IGuessedLetters, LetterPositionEnum } from '../utils/LetterPosition';
import { ACTUAL_WORD, WORD_LENGTH } from '../utils/constants';
import Modal, { ModalType } from './Modal';

// Each guess will render a row
// Maybe in the future we can introduce some UI elements so the user can
// set these themselves as a way of increasing / decreasing the difficulty
// const MAX_GUESSES = 6;
const GameStyles = styled.div`
  display: grid;
  grid-gap: 1rem;
  max-width: 520px;
  margin: 0 auto;
`;
/**
 * TODO: switch this to context maybe, or just figure out a better strategy
 * for communicating between these 2 levels?
 */
function Game() {
  const [guess, updateGuess] = useState([]);
  const [attempt, updateAttemptCount] = useState(0);
  const [prevGuesses, addGuessToPrev] = useState([[]]);
  const [flipRowAnimation, setFlipRowAnimation] = useState(false);
  const [animateRow, setAnimateRow] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<IGuessedLetters[]>([]);
  // modal
  const [showModal, updateShowModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gameState, updateGameState] = useState({ active: true, type: 'active' });

  const checkIfGuessIsRealWord = async () => {
    // TODO: Remove when done testing, save dem api calls
    return true;
    const response = await request(guess.join(''));
    return response.some((item: any) => typeof (item) === 'object');
  };

  /**
   * 1. Board === Word => You win!
   * 2. Board !== Word && attempt === MAX_ATTEMPTS => You lost!
   * 3. Board !== Word && attempt < MAX_ATTEMPTS => guess gets hints and player moves
   * onto the next row
   */
  const checkGuess = async () => {
    // Don't pass go, don't collect $200
    if (guess.length < WORD_LENGTH) {
      return false;
    }

    const realWord = await checkIfGuessIsRealWord();
    if (!realWord) {
      // alert('The word you have guessed has been deemed fake by Merriam')
      setAnimateRow('error');
      return false;
    }

    // clear the error animation if it has been set previously
    if (animateRow) {
      setAnimateRow('');
    }
    // save the guess to render with hints
    if (prevGuesses[0].length) {
      addGuessToPrev([...prevGuesses, guess]);
    } else {
      addGuessToPrev([guess]);
    }

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    determineGuessedLetterType();

    // determine win or lose state

    // The word will be checked on componentDidUpdate so we can apply animations
    // to the guess on the previous row, along with styled guess tiles
    updateGuess([]);
    updateAttemptCount(attempt + 1);
    setFlipRowAnimation(true);
    return true;
  };

  // TOOD: Maybe these 2 methods can live in the Keyboard component?
  const addLetterToGuess = (letter: string) => {
    if (guess.length < WORD_LENGTH) {
      // @ts-ignore -> TODO: wtf?
      updateGuess(guess.concat(letter.toUpperCase()));
    }
  };

  // when backspace is entered
  const removePrevLetterFromGuess = () => {
    if (guess.length) {
      const removed = guess.slice(0, -1);
      updateGuess(removed);
    }
  };

  // eslint-disable-next-line max-len
  const checkIfLetterInGuessedLetters = (guessedLetter: string) => guessedLetters.some((obj: IGuessedLetters) => guessedLetter === obj.letter);

  // update guessedLetters so we can provide hints on the keyboard
  const determineGuessedLetterType = () => {
    const updatesToGuessedLetters = guessedLetters;
    guess.forEach((guessedLetter: string, index: number) => {
      // letter not in guess, add if not already
      if (!ACTUAL_WORD.includes(guessedLetter) && !checkIfLetterInGuessedLetters(guessedLetter)) {
        updatesToGuessedLetters.push(
          { letter: guessedLetter, type: LetterPositionEnum.wrong },
        );
      }
      // letter is in guess
      if (ACTUAL_WORD.includes(guessedLetter)) {
        // letter is in correct spot
        if (ACTUAL_WORD.indexOf(guessedLetter) === index) {
          const exists = checkIfLetterInGuessedLetters(guessedLetter);
          if (!exists) {
            updatesToGuessedLetters.push(
              { letter: guessedLetter, type: LetterPositionEnum.correct },
            );
          } else {
            // letter exists already as correct or close, update close to correct or ignore
            // eslint-disable-next-line max-len
            const existingLetterIndex = guessedLetters.findIndex((iterate:IGuessedLetters) => iterate.letter === guessedLetter);
            if (updatesToGuessedLetters[existingLetterIndex].type === LetterPositionEnum.close) {
              updatesToGuessedLetters[existingLetterIndex].type = LetterPositionEnum.correct;
            }
          }
          // letter is close, add if not there already
        } else if (!checkIfLetterInGuessedLetters(guessedLetter)) {
          updatesToGuessedLetters.push(
            { letter: guessedLetter, type: LetterPositionEnum.close },
          );
        }
      }
    });
    setGuessedLetters(updatesToGuessedLetters);
  };

  return (
    <GameStyles>
      <button type="button" onClick={() => updateShowModal(true)}>Show Modal</button>
      {showModal && <Modal type={ModalType.winner} updateShowModal={updateShowModal} />}
      <Board
        currentGuess={guess}
        attempt={attempt}
        prevGuesses={prevGuesses}
        flipRowAnimation={flipRowAnimation}
        animateRow={animateRow}
      />
      <Keyboard
        guess={guess}
        guessedLetters={guessedLetters}
        addLetterToGuess={addLetterToGuess}
        checkGuess={checkGuess}
        removePrevLetterFromGuess={removePrevLetterFromGuess}
      />
    </GameStyles>
  );
}

export default Game;