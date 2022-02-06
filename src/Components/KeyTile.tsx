import styled from 'styled-components';

interface KeyTileProps {
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



const KeyTile = ({letter, onKeyPressCustom, guess}: KeyTileProps) => {
  function onClickHandler() {
    if (letter === 'Backspace') {
      // remove the last guessed letter
      const removed = guess.slice(0, -1);
      console.log(guess);
      console.log(removed);
      onKeyPressCustom(removed);
    } else if (letter === 'Enter') {
      // TODO
      console.log('enter');
    } else {
      onKeyPressCustom([...guess, letter]);
    }
  }
  return (
    <KeyTileStyles onClick={() =>onClickHandler()}>
      {letter}
    </KeyTileStyles>
  )
}

export default KeyTile;
