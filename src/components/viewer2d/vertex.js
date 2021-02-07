/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
    G,
    Circle
} from 'react-native-svg';

const STYLE = { fill: '#0096fd', stroke: 'white', cursor: 'move' };

export default function Vertex({ vertex, layer }) {
  const { x, y } = vertex;

  return (
    <G
      transform={`translate(${x}, ${y})`}
      data-element-root
      data-prototype={vertex.prototype}
      data-id={vertex.id}
      data-selected={vertex.selected}
      data-layer={layer.id}
    >
      <Circle cx="0" cy="0" r="7" style={STYLE} />
    </G>
  );
}

