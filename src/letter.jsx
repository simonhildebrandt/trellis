import React from 'react';
import styled from 'styled-components';


const OuterCircle = styled.circle`
position: relative;
`

const InnerCircle = styled.circle`
position: relative;
`

const Text = styled.text`
font-family: Martian Mono;
text-anchor: middle;
dominant-baseline: middle;
font-weight: bold;
fill: #778;
`


export function Letter({x, y, letter}) {
  return <g style={{transform: `translate(${x}px, ${y}px)`}}>
    <InnerCircle r={22} fill="#FFF"/>
    <Text x={0} y="0.1em">{letter.toUpperCase()}</Text>
  </g>
}

export function LetterBackground({x, y}) {
  return <g style={{transform: `translate(${x}px, ${y}px)`}}>
    <OuterCircle r={30} fill="#BBB"/>
  </g>
}
