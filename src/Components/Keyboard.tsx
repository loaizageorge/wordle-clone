import KeyTile from './KeyTile';
import styled from 'styled-components';

interface KeyBoardProps {
  checkGuess: Function,
  onKeyPressCustom: Function,
  guess: string[],
}

const KeyboardStyles = styled.div`
  display: flex;
  flex-direction: column;
`
const KeyboardRowStyles = styled.div`
  display: block;
  margin: .25rem;
`

export default function Keyboard({onKeyPressCustom, guess, checkGuess}: KeyBoardProps) {
  // explicitly rendering out which keys I want in each row to keep consistency
  // across all responsive sizes
  const keyboardFirstRow: string[] = ['q','w','e','r','t','y','u','i','o','p',];
  const keyboardSecondRow: string[] = ['a','s','d','f','g','h','j','k','l'];
  const keyboardThirdRow: string[] = ['Enter', 'z','x','c','v','b','n','m', 'Backspace'];

  const renderKeyBoardRow = (row: string[]) => {
    return (
      <KeyboardRowStyles>
        {
          row.map((key) => {
            return <KeyTile
              checkGuess={checkGuess}
              guess={guess}
              onKeyPressCustom={onKeyPressCustom}
              letter={key}
            />
          })
        }
    </KeyboardRowStyles>
    )
  }

  return (
    <KeyboardStyles>
      {renderKeyBoardRow(keyboardFirstRow)}
      {renderKeyBoardRow(keyboardSecondRow)}
      {renderKeyBoardRow(keyboardThirdRow)}
    </KeyboardStyles>
  )
}