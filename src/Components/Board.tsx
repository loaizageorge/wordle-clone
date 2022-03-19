import React from 'react';
import styled from 'styled-components';
import Row from './Row';

interface BoardProps {
  attempt: number,
  currentGuess: string[],
  prevGuesses: string[][],
  flipRowAnimation: boolean,
  animateRow: string,
}

const BoardStyles = styled.div`
  display: grid;
  row-gap: .25rem;
  padding: 2rem;
`;

/**
 * The board renders rows and it is in charge of juggling the different states
 * that the rows take. Active and Inactive. Inactive rows are either rows that
 * have or haven't been guessed yet. Based on these states it also handles the
 * animation state (if applicable)
 */
export default function Board({
  attempt, currentGuess, prevGuesses, flipRowAnimation, animateRow,
}: BoardProps) {
  // Apparently this is better for iterating in a react render rather than just a for loop?
  // https://stackoverflow.com/a/30651275
  const guessRowIterator = [0, 1, 2, 3, 4, 5];

  return (
    <BoardStyles>
      {
        guessRowIterator.map((_:number, index: number) => {
          const active = index === attempt - 1;
          const flip = flipRowAnimation && (index === attempt - 2);
          const animateError = active && animateRow === 'error';

          return (
            <Row
              key={`row_${_}`}
              flipRowAnimation={flip}
              showHint={!active}
              guess={active ? currentGuess : prevGuesses[index]}
              animateError={animateError}
            />
          );
        })
      }
    </BoardStyles>
  );
}
