import GuessTile from './GuessTile'

interface GuessRowProps {
  currentGuess: string[],
  wordLength: number,
}

export default function GuessRow({currentGuess, wordLength}: GuessRowProps) {
  const worldLengthIterator = Array(wordLength).fill(0);
  return (
    <div>
    {
       worldLengthIterator.map((_: number, index: number) => {
        // We want to render out all the squares for a guess, so check
        // the guess length so we're not accidentally going out of bound
        if (currentGuess && currentGuess[index] !== undefined) {
          return <GuessTile letter={currentGuess[index]} />
        }
        return <GuessTile letter={''} />
      })
    }
    </div>
  )
}