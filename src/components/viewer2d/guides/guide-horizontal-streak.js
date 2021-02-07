import React from 'react';
import {
  G,
  Line
} from 'react-native-svg';

export default function GuideHorizontalStreak({width, height, guide}) {
  let step = guide.properties.step;
  let colors;

  colors = guide.properties.colors;

  let rendered = [];
  let i = 0;
  for (let y = 0; y <= height; y += step) {
    let color = colors[1];
    i++;
    rendered.push(<Line key={y} x1="0" y1={y} x2={width} y2={y} strokeWidth="1" stroke={color}/>);
  }

  return (<G>{rendered}</G>);
}