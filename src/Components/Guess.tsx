import styled, { css, keyframes } from 'styled-components'
import GuessRow from './GuessRow'

interface GuessProps {
  attempt: number,
  currentGuess: string[],
  guesses: number,
  wordLength: number,
  prevGuesses: string[][],
  actualWord: string[],
  flipRowAnimation: boolean,
  animateRow: string,
}

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
`

interface IGuessRowStyles {
  animateError: boolean
}

const GuessRowStyles = styled.div<IGuessRowStyles>`
${props => props.animateError && css`
  animation-name: ${shake};
  animation-duration: .5s;
  animation-timing-function: linear;
`}`;

export default function Guess({attempt, currentGuess, wordLength, guesses, prevGuesses, actualWord, flipRowAnimation, animateRow}: GuessProps) {
  // Apparently this is better for iterating in a react render rather than just a for loop?
  // https://stackoverflow.com/a/30651275
  const guessRowIterator = Array(guesses).fill(0);

  return (
    <>
      {
        guessRowIterator.map((_:number, index: number) => {
          const active = index === attempt;
          const flip = flipRowAnimation && (index === attempt - 1);
          const animateError = active && animateRow === 'error';

          return <GuessRowStyles animateError={animateError} key={index}>
            <GuessRow key={index} flipRowAnimation={flip} className='guess-row'  showHint={!active} actualWord={actualWord} guess={active ? currentGuess : prevGuesses[index]} wordLength={wordLength} />
          </GuessRowStyles>

        })
      }
    </>
  )

}