import styled, { css, keyframes } from 'styled-components'

export const enum hintEnum {
  inactive = 'inactive',
  close = 'close',
  match = 'match',
  wrong = 'wrong'
}

interface GuessTileProps {
  letter: string
  hint: hintEnum,
  flipRowAnimation: boolean,
  tileColor ?: string,
}

const rotate = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  
  25% {
    transform: rotateX(-90deg);
  }

  50% {
    transform: rotateX(-90deg);
  }

  100% {
    transform: rotateX(0deg);
  }
`;

const GuessTileStyles = styled.div<GuessTileProps>`
  display: inline-flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
  border: 2px solid ${props => props.tileColor === 'white' ? 'grey' : 'black'};
  background-color: ${props => props.tileColor};
  color: ${props => props.tileColor === 'white' ? 'black' : 'white'};
  ${props => props.tileColor !== 'white' && css`
    text-shadow: 2px 2px 4px #000000;;
  `}
  
  width: 100%;
  height: 100%;
  ${props => props.flipRowAnimation && css`
    animation-name: ${rotate};
    animation-duration: .75s;
    animation-timing-function: linear;
  `}
  
  ::before {
    content: '';
    padding-bottom: 100%;
    display: inline-block;
  }
`;

export default function GuessTile({letter, hint, flipRowAnimation}: GuessTileProps) {
  const getColorTileFromHint = (hint: hintEnum) => {
    switch (hint) {
      case hintEnum.match:
        return 'green';
      case hintEnum.close:
        return 'yellow';
      case hintEnum.wrong:
        return 'red';
      case hintEnum.inactive:
        return 'white';
    }

  }

  const tileColor = getColorTileFromHint(hint);

  return <GuessTileStyles hint={hint} letter={letter} flipRowAnimation={flipRowAnimation} tileColor={tileColor}>
        {letter}
    </GuessTileStyles>
}