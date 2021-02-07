import React from 'react';
import {
  G
} from 'react-native-svg';
import GuideHorizontalStreak from './guide-horizontal-streak';
import GuideVerticalStreak from './guide-vertical-streak';

export default function Guides({scene}) {

  let {width, height, guides} = scene;

  return (
    <G>
      <GuideHorizontalStreak key={guides.h1.id} width={width} height={height} guide={guides.h1} />
      <GuideVerticalStreak key={guides.v1.id} width={width} height={height} guide={guides.v1}/>
    </G>
  );
}

