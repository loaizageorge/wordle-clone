import Keyboard from './Keyboard'
import { useState } from 'react'
import Guess from './Guess'

// Each guess will render a row
// Maybe in the future we can introduce some UI elements so the user can
// set these themselves as a way of increasing / decreasing the difficulty
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

/**
 * updateGuess is passed down to Keyboard which passes it down to KeyTitle
 * keyTile adds whatever key is clicked to the current guess
 * TODO: switch this to context maybe, or just figure out a better strategy
 * for communicating between these 2 levels?
 */
export default function Gameboard() {
  const [guess, updateGuess] = useState([]);

  return (
    <div>
      <Guess wordLength={WORD_LENGTH} currentGuess={guess}/>
      <Keyboard guess={guess} onKeyPressCustom={updateGuess}/>
    </div>
  )
}