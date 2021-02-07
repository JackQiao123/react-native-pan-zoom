import React from 'react';
import {
    G
} from 'react-native-svg';
import Item from './item';
import Lines from './line';
import Vertex from './vertex';

export default function Layer({ layer, scene, onSelectItem }) {
  const {
    lines, vertices, items, opacity
  } = layer;

  return (
    <G opacity={opacity}>
        {
            Object.entries(lines).map(([lineID, line]) =>
                <Lines
                    key={lineID}
                    layer={layer}
                    line={line}
                    scene={scene}
                />
            )
        }
        {
            Object.entries(vertices).filter(([vertex]) => vertex.selected).map(([vertexID, vertex]) =>
                <Vertex key={vertexID} layer={layer} vertex={vertex} />
            )
        }
        {
            Object.entries(items).map(([itemID, item]) =>
                <Item
                    key={itemID}
                    layer={layer}
                    item={item}
                    onSelectItem={onSelectItem}
                />
            )
        }
    </G>
  );
}