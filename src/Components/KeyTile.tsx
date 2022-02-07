import styled from 'styled-components';

interface KeyTileProps {
  checkGuess: Function,
  letter: string,
  onKeyPressCustom: Function,
  guess: string[]
}

const KeyTileStyles = styled.span`
  display: inline-block;
  border: 1px solid black;
  padding: .5rem;
  margin: .25rem;
`;

const KeyTile = ({letter, onKeyPressCustom, guess, checkGuess}: KeyTileProps) => {
  function onClickHandler() {
    if (letter === 'Backspace') {
      // remove the last guessed letter
      const removed = guess.slice(0, -1);
      onKeyPressCustom(removed);
    } else if (letter === 'Enter') {
      checkGuess();
    } else {
      // build up the guess
      onKeyPressCustom(guess.concat(letter));
    }
  }
  return (
    <KeyTileStyles onClick={() =>onClickHandler()}>
      {letter}
    </KeyTileStyles>
  )
}

export default KeyTile;
