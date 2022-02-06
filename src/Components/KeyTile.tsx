import styled from 'styled-components';

interface KeyTileProps {
  letter: string,
  onKeyPressCustom: Function,
  guess: string[]
}



const KeyTileStyles = styled.span`
  border: 1px solid black;
  padding: .5rem;
  margin: .25rem;
`;



const KeyTile = ({letter, onKeyPressCustom, guess}: KeyTileProps) => {
  return (
    <KeyTileStyles onClick={() => onKeyPressCustom([...guess, letter])}>
      {letter}
    </KeyTileStyles>
  )
}

export default KeyTile;
