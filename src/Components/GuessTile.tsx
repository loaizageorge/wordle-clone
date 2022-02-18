import styled, { css, keyframes } from 'styled-components'

interface GuessTileProps {
  letter: string
  hint?: string,
  flipRowAnimation: boolean,
  tileBorderColor ?: string
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
  border: 2px solid ${props => props.tileBorderColor};
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

export default function GuessTile({letter, hint='', flipRowAnimation}: GuessTileProps) {
  let tileBorderColor = 'grey';
  if (hint === 'match') {
    tileBorderColor= 'green';
  } else if (hint ==='close') {
    tileBorderColor = 'red';
  }

  return <GuessTileStyles letter={letter} flipRowAnimation={flipRowAnimation} tileBorderColor={tileBorderColor}>
        {letter}
    </GuessTileStyles>
}