import GuessTile from './GuessTile'

interface GuessRowProps {
  guess: string[],
  wordLength: number,
  actualWord: string[],
  showHint: boolean,
}

export default function GuessRow({guess, wordLength, actualWord, showHint}: GuessRowProps) {
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
    <div>
    {
       worldLengthIterator.map((_: number, index: number) => {
        // We want to render out all the squares for a guess, so check
        // the guess length, so we're not accidentally going out of bounds
        if (guess && guess[index] !== undefined) {
          const hintType = returnGuessTileHint(index);
          return <GuessTile hint={hintType} letter={guess[index]} />
        }
        return <GuessTile letter='' />
      })
    }
    </div>
  )
}