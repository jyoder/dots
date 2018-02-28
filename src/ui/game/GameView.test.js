import GameView from 'ui/game/GameView';
import Game from 'state/Game';
import Player from 'state/Player';

import React from 'react';
import { shallow } from 'enzyme';

test('GameView renders', () => {
    const players = [new Player('1', 1, 'john'), new Player('2', 2, 'Hillary yoder')];
    const game = Game.create(4, 4, players);

    const gameView = shallow(<GameView game={game}/>);
    expect(gameView.hasClass('GameView')).toBeTruthy();
});
