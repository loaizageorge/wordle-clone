import GuessTile from './GuessTile'

interface GuessProps {
  wordLength: number,
  currentGuess: string[]
}

export default function Guess({wordLength, currentGuess}: GuessProps) {
  // Apparently this is better for iterating in a react render rather than just a for loop?
  // https://stackoverflow.com/a/30651275
  const iterator =  Array(wordLength).fill(0);
  return (
    <div>
      {
        iterator.map((_: number, index: number) => {
          // We want to render out all the squares for a guess, so check
          // the guess length so we're not accidentally going out of bounds
          if (currentGuess[index] !== undefined) {
            return <GuessTile letter={currentGuess[index]} />
          }
          return <GuessTile letter={''} />
        })
      }
    </div>
  )

}