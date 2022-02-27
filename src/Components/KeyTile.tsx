import React from 'react';
import styled from 'styled-components';
import { IGuessedLetters } from './Gameboard';
import {LetterPosition} from './Gameboard';

interface KeyTileProps {
  checkGuess: Function,
  letter: string,
  addLetterToGuess: Function,
  removePrevLetterFromGuess: Function,
  guessedLetters: Array<IGuessedLetters>,
}

interface IKeyTileStyles {
  letterColor: string,
}

const KeyTileStyles = styled.span<IKeyTileStyles>`
  display: inline-block;
  border: 1px solid black;
  padding: .5rem;
  margin: .25rem;
  background-color: ${(props) => props.letterColor};
`;

function KeyTile({
  letter, addLetterToGuess, checkGuess, removePrevLetterFromGuess, guessedLetters,
}: KeyTileProps) {
  function onClickHandler() {
    if (letter === 'Backspace') {
      removePrevLetterFromGuess();
    } else if (letter === 'Enter') {
      checkGuess();
    } else {
      addLetterToGuess(letter);
    }
  }

  const getKeyStyle = (key: string) => {
    const found = guessedLetters.find((guessedLetter) => guessedLetter.letter === key.toUpperCase());

    if (found) {
      console.log(found);
      switch (found.type) {
        case LetterPosition.correct:
          return 'green';
        case LetterPosition.close:
          return 'yellow';
        case LetterPosition.wrong:
          return 'grey';
        default:
          return 'white';
      }
    }
    return 'white';
  };

  const letterColor = getKeyStyle(letter);
  return (
    <KeyTileStyles letterColor={letterColor} onClick={() => onClickHandler()}>
      {letter}
    </KeyTileStyles>
  );
}

export default KeyTile;
