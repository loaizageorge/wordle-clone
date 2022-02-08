import styled from 'styled-components';

interface GuessTileProps {
  letter: string
  hint?: string,
}

interface IGuessTileStyles {
  tileBorderColor: string,
}

const GuessTileStyles = styled.span<IGuessTileStyles>`
  display: inline-block;
  padding: 1rem;
  margin: .5rem;
  border: 1px solid ${props => props.tileBorderColor}
  }
`

export default function GuessTile({letter, hint=''}: GuessTileProps) {
  var tileBorderColor = 'black';
  console.log(hint);
  if (hint === 'match') {
    tileBorderColor= 'green';
  } else if (hint ==='close') {
    tileBorderColor = 'yellow';
  }


  return <GuessTileStyles tileBorderColor={tileBorderColor}>
    {letter}
  </GuessTileStyles>
}