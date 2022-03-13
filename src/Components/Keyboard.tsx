import React, { useEffect } from 'react';
import styled from 'styled-components';
import KeyTile from './KeyTile';
import { IGuessedLetters } from '../utils/LetterPosition';

interface KeyBoardProps {
  checkGuess: Function,
  addLetterToGuess: Function,
  removePrevLetterFromGuess: Function,
  guessedLetters: Array<IGuessedLetters>,
  guess: string[],

}

const KeyboardStyles = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const KeyboardRowStyles = styled.div`
  display: block;
  margin: .25rem;
`;

// explicitly rendering out which keys I want in each row to keep consistency
// across all responsive sizes
const keyboardFirstRow: string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const keyboardSecondRow: string[] = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const keyboardThirdRow: string[] = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'];

const allowedKeys = [...keyboardFirstRow, ...keyboardSecondRow, ...keyboardThirdRow];

export default function Keyboard({
  addLetterToGuess,
  checkGuess,
  removePrevLetterFromGuess,
  guessedLetters,
  guess,
} : KeyBoardProps) {
  // allow the user to use the keyboard too
  useEffect(() => {
    const keyPressHandler = (event: any) => {
      const pressedKey = event.key;
      if (allowedKeys.includes(pressedKey)) {
        switch (pressedKey) {
          case 'Enter':
            return checkGuess();
          case 'Backspace':
            return removePrevLetterFromGuess();
          default:
            return addLetterToGuess(pressedKey);
        }
      }
      return null;
    };
    window.addEventListener('keydown', keyPressHandler);
    return () => window.removeEventListener('keydown', keyPressHandler);
  }, [guess]);
  const renderKeyBoardRow = (row: string[]) => (
    <KeyboardRowStyles>
      {
          row.map((key: string) => (
            <KeyTile
              key={key}
              checkGuess={checkGuess}
              addLetterToGuess={addLetterToGuess}
              removePrevLetterFromGuess={removePrevLetterFromGuess}
              guessedLetters={guessedLetters}
              letter={key}
            />
          ))
        }
    </KeyboardRowStyles>
  );

  return (
    <KeyboardStyles>
      {renderKeyBoardRow(keyboardFirstRow)}
      {renderKeyBoardRow(keyboardSecondRow)}
      {renderKeyBoardRow(keyboardThirdRow)}
    </KeyboardStyles>
  );
}
