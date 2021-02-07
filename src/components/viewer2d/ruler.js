import React from 'react';
import {
  G,
  Line,
  Text
} from 'react-native-svg';

const STYLE = {
  stroke: "#0096fd",
  strokeWidth: "1px"
};

const STYLE_TEXT = {
  textAnchor: "middle",
  fontSize: "12px",
  fontFamily: "'Courier New', Courier, monospace",
  pointerEvents: "none",
  fontWeight: "bold",
  WebkitTouchCallout: "none", /* iOS Safari */
  WebkitUserSelect: "none",   /* Chrome/Safari/Opera */
  MozUserSelect: "none",      /* Firefox */
  MsUserSelect: "none",       /* Internet Explorer/Edge */
  userSelect: "none"
};


export default function Ruler({length, unit, transform}) {

  let distanceText = `${length.toFixed(2)} ${unit}`;

  return (
    <G transform={transform}>
      <Text x={length / 2} y="-3" transform={`scale(1, -1)`} style={STYLE_TEXT}>{distanceText}</Text>
      <Line x1="0" y1="-5" x2="0" y2="5" style={STYLE}/>
      <Line x1={length} y1="-5" x2={length} y2="5" style={STYLE}/>
      <Line x1="0" y1="0" x2={length} y2="0" style={STYLE}/>
    </G>
  );

}
