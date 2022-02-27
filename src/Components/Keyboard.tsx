import React from 'react';
import styled from 'styled-components';
import KeyTile from './KeyTile';
import { IGuessedLetters } from './Gameboard';

interface KeyBoardProps {
  checkGuess: Function,
  addLetterToGuess: Function,
  removePrevLetterFromGuess: Function,
  guessedLetters: Array<IGuessedLetters>
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

export default function Keyboard({
  addLetterToGuess,
  checkGuess,
  removePrevLetterFromGuess,
  guessedLetters,
} : KeyBoardProps) {
  // explicitly rendering out which keys I want in each row to keep consistency
  // across all responsive sizes
  const keyboardFirstRow: string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const keyboardSecondRow: string[] = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const keyboardThirdRow: string[] = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'];

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
