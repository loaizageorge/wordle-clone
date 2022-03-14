import styled, { css, keyframes } from 'styled-components';
import React from 'react';
import GuessTile from './GuessTile';
import { LetterPositionEnum } from '../utils/LetterPosition';
import { ACTUAL_WORD } from '../utils/constants';

const shake = keyframes`
  0% {
    transform: translateX(5px);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(5px);
  }
`;

interface RowProps {
  guess: string[],
  showHint: boolean,
  flipRowAnimation: boolean,
  animateError: boolean
}

interface IRowStyles {
  animateError: boolean
}

const RowStyles = styled.div<IRowStyles>`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: .25rem;
  ${(props) => props.animateError && css`
    animation-name: ${shake};
    animation-duration: .5s;
    animation-timing-function: linear;
  `}
`;

export default function Row({
  guess, showHint, flipRowAnimation, animateError,
}: RowProps) {
  const worldLengthIterator = [0, 1, 2, 3, 4];

  function returnGuessTileHint(index: number) {
    if (!showHint) {
      return LetterPositionEnum.inactive;
    }

    if (guess[index] === ACTUAL_WORD[index]) {
      return LetterPositionEnum.correct;
    } if (ACTUAL_WORD.includes(guess[index])) {
      return LetterPositionEnum.close;
    }
    return LetterPositionEnum.wrong;
  }

  return (
    <RowStyles animateError={animateError}>
      {
       worldLengthIterator.map((_: number, index: number) => {
         // We want to render out all the squares for a guess, so check
         // the guess length, so we're not accidentally going out of bounds
         if (guess && guess[index] !== undefined) {
           const hintType = returnGuessTileHint(index);
           return (
             <GuessTile
               key={`tile_${_}`}
               flipRowAnimation={flipRowAnimation}
               hint={hintType}
               letter={guess[index]}
             />
           );
         }
         return <GuessTile key={`tile_${_}`} hint={LetterPositionEnum.inactive} flipRowAnimation={false} letter="" />;
       })
    }
    </RowStyles>
  );
}
