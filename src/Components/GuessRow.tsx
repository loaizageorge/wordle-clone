import GuessTile from './GuessTile'
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
      return '';
    }

    if (guess[index] === actualWord[index]) {
      return 'match';
    } else if (actualWord.includes(guess[index])) {
      return 'close'
    }
    return '';
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
        return <GuessTile flipRowAnimation={false} letter='' />
      })
    }
    </GuessRowStyles>
  )
}