import styled from 'styled-components'
import GuessRow from './GuessRow'

interface GuessProps {
  attempt: number,
  currentGuess: string[],
  guesses: number,
  wordLength: number,
  prevGuesses: string[][],
  actualWord: string[]
}

const GuessRowStyles = styled.div`
`;

export default function Guess({attempt, currentGuess, wordLength, guesses, prevGuesses, actualWord}: GuessProps) {
  // Apparently this is better for iterating in a react render rather than just a for loop?
  // https://stackoverflow.com/a/30651275
  const guessRowIterator = Array(guesses).fill(0);

  return (
    <>
      {
        guessRowIterator.map((_:number, index: number) => {
          const active = index === attempt;
          return <GuessRowStyles>
            <GuessRow showHint={!active} actualWord={actualWord} guess={active ? currentGuess : prevGuesses[index]} wordLength={wordLength} />
          </GuessRowStyles>

        })
      }
    </>
  )

}