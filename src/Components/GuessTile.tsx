import styled from 'styled-components';

interface GuessTileProps {
  letter: string
}

const GuessTileStyles = styled.span`
  border: 1px solid black;
  padding: 1rem;
  margin: .5rem;
`

export default function GuessTile({letter}: GuessTileProps) {
  return <GuessTileStyles>
    {letter}
  </GuessTileStyles>
}