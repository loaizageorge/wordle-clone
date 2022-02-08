import styled from 'styled-components';

interface KeyTileProps {
  checkGuess: Function,
  letter: string,
  addLetterToGuess: Function,
  removePrevLetterFromGuess: Function,
}

const KeyTileStyles = styled.span`
  display: inline-block;
  border: 1px solid black;
  padding: .5rem;
  margin: .25rem;
`;

const KeyTile = ({letter, addLetterToGuess, checkGuess, removePrevLetterFromGuess}: KeyTileProps) => {
  function onClickHandler() {
    if (letter === 'Backspace') {
      removePrevLetterFromGuess();
    } else if (letter === 'Enter') {
        checkGuess();
    } else {
      addLetterToGuess(letter);
    }
  }
  return (
    <KeyTileStyles onClick={() => onClickHandler()}>
      {letter}
    </KeyTileStyles>
  )
}

export default KeyTile;
