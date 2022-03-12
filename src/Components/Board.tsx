import React from 'react';
import GuessRow from './GuessRow';

interface GuessProps {
  attempt: number,
  currentGuess: string[],
  prevGuesses: string[][],
  actualWord: string[],
  flipRowAnimation: boolean,
  animateRow: string,
}

export default function Board({
  attempt, currentGuess, prevGuesses, actualWord, flipRowAnimation, animateRow,
}: GuessProps) {
  // Apparently this is better for iterating in a react render rather than just a for loop?
  // https://stackoverflow.com/a/30651275
  const guessRowIterator = [0, 1, 2, 3, 4];

  return (
    <>
      {
        guessRowIterator.map((_:number, index: number) => {
          const active = index === attempt;
          const flip = flipRowAnimation && (index === attempt - 1);
          const animateError = active && animateRow === 'error';

          return (
            <GuessRow
              key={`row_${_}`}
              flipRowAnimation={flip}
              showHint={!active}
              actualWord={actualWord}
              guess={active ? currentGuess : prevGuesses[index]}
              animateError={animateError}
            />
          );
        })
      }
    </>
  );
}
