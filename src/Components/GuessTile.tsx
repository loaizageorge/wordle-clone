import styled from 'styled-components';

interface GuessTileProps {
  letter: string
  hint?: string,
}

interface IGuessTileStyles {
  tileBorderColor: string,
}

const GuessTileStyles = styled.div<IGuessTileStyles>`
  display: inline-flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
  border: 1px solid ${props => props.tileBorderColor};
  ::before {
    content: '';
    padding-bottom: 100%;
    display: inline-block;
  }
`

export default function GuessTile({letter, hint=''}: GuessTileProps) {
  let tileBorderColor = 'black';
  if (hint === 'match') {
    tileBorderColor= 'green';
  } else if (hint ==='close') {
    tileBorderColor = 'red';
  }


  return<GuessTileStyles tileBorderColor={tileBorderColor}>
    {letter}
  </GuessTileStyles>
}