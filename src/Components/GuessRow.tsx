import GuessTile, { hintEnum } from './GuessTile'
import styled from 'styled-components'

interface GuessRowProps {
  guess: string[],
  wordLength: number,
  actualWord: string[],
  showHint: boolean,
  className: string,
  flipRowAnimation: boolean,
}

const GuessRowStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1.5rem;
`

export default function GuessRow({guess, wordLength, actualWord, showHint, flipRowAnimation}: GuessRowProps) {
  const worldLengthIterator = Array(wordLength).fill(0);

  function returnGuessTileHint(index: number) {
    if (!showHint) {
      return hintEnum.inactive;
    }

    if (guess[index] === actualWord[index]) {
      return hintEnum.match;
    } else if (actualWord.includes(guess[index])) {
      return hintEnum.close;
    }
    return hintEnum.wrong;
  }

  return (
    <GuessRowStyles>
    {
       worldLengthIterator.map((_: number, index: number) => {
        // We want to render out all the squares for a guess, so check
        // the guess length, so we're not accidentally going out of bounds
        if (guess && guess[index] !== undefined) {
          const hintType = returnGuessTileHint(index);
          return <GuessTile flipRowAnimation={flipRowAnimation} hint={hintType} letter={guess[index]} />
        }
        return <GuessTile hint={hintEnum.inactive} flipRowAnimation={false} letter='' />
      })
    }
    </GuessRowStyles>
  )
}