import GameView from 'ui/game/GameView';
import Game from 'state/Game';

import React from 'react';
import { shallow } from 'enzyme';

test('GameView renders', () => {
    const game = Game.create(4, 4);
    const gameView = shallow(<GameView game={game}/>);
    expect(gameView.hasClass('GameView')).toBeTruthy();
});
