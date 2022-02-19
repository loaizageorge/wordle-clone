import styled from 'styled-components'
import GuessRow from './GuessRow'

interface GuessProps {
  attempt: number,
  currentGuess: string[],
  guesses: number,
  wordLength: number,
  prevGuesses: string[][],
  actualWord: string[],
  flipRowAnimation: boolean,
}

const GuessRowStyles = styled.div`
`;

export default function Guess({attempt, currentGuess, wordLength, guesses, prevGuesses, actualWord, flipRowAnimation}: GuessProps) {
  // Apparently this is better for iterating in a react render rather than just a for loop?
  // https://stackoverflow.com/a/30651275
  const guessRowIterator = Array(guesses).fill(0);

  return (
    <>
      {
        guessRowIterator.map((_:number, index: number) => {
          const active = index === attempt;
          const flip = flipRowAnimation && (index === attempt - 1);

          return <GuessRowStyles key={index}>
            <GuessRow key={index} flipRowAnimation={flip} className='guess-row'  showHint={!active} actualWord={actualWord} guess={active ? currentGuess : prevGuesses[index]} wordLength={wordLength} />
          </GuessRowStyles>

        })
      }
    </>
  )

}