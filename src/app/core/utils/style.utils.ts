import anime from 'animejs';

export function defaultButtonVars() {
  return {
    width: '150',
    horizontalPadding: '20',
    height: 55,
    lineHeight: 55,
    backgroundColor: '#228a4c',
    textColor: '#ffffff',
    fontSize: '14',
    textWeight: '800',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: '#ffffff'
  };
}

export function changeLayoutState(
  currentState: object,
  stateData: object,
  newStateName: string,
  duration?: number,
  elasticity?: number,
  easing?: string,
  complete?: Function
) {
  const tmpStyles = {};
  const tmpStylesToAnime = {};
  for (const iten in currentState) {
    if (
      iten !== 'borderStyle' ||
      (String(iten) === 'width' && stateData[iten][newStateName] !== 'auto')
    ) {
      tmpStyles[iten] = stateData[iten][newStateName];
      tmpStylesToAnime[iten] = [
        currentState[iten],
        stateData[iten][newStateName]
      ];
    }
  }

  tmpStylesToAnime['targets'] = currentState;
  tmpStylesToAnime['duration'] = duration ? duration : 200;
  tmpStylesToAnime['elasticity'] = elasticity ? elasticity : 20;
  //   tmpStylesToAnime['easing'] = easing ? easing.toString() : 'inOutElastic';

  if (complete) {
    tmpStylesToAnime['complete'] = complete;
  }
  anime(tmpStylesToAnime);
}
