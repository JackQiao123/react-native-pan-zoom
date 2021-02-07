import React from 'react';
import {
  G,
  Line
} from 'react-native-svg';

export default function GuideVerticalStreak({width, height, guide}) {
  let step = guide.properties.step;
  let colors;

  colors = guide.properties.colors;

  let rendered = [];
  let i = 0;
  for (let x = 0; x <= width; x += step) {
    let color = colors[1];
    i++;
    rendered.push(<Line key={x} x1={x} y1="0" x2={x} y2={height} strokeWidth="1" stroke={color}/>);
  }

  return (<G>{rendered}</G>);
}
