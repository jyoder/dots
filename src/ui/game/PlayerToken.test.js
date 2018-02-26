import PlayerToken from 'ui/game/PlayerToken';
import Player from 'state/Player';

import React from 'react';
import { shallow } from 'enzyme';

test('PlayerToken includes the appropriate class for player 1', () => {
    const player = new Player('1', 1, 'Marvin');
    const playerToken = shallow(<PlayerToken player={player}/>);
    expect(playerToken.hasClass('PlayerToken')).toBeTruthy();
    expect(playerToken.hasClass('PlayerToken--player1')).toBeTruthy();
});

test('PlayerToken includes the appropriate class for player 2', () => {
    const player = new Player('1', 2, 'Marva');
    const playerToken = shallow(<PlayerToken player={player}/>);
    expect(playerToken.hasClass('PlayerToken')).toBeTruthy();
    expect(playerToken.hasClass('PlayerToken--player2')).toBeTruthy();
});

test('PlayerToken content is the uppercased first letter of the player name', () => {
    const player = new Player('1', 2, 'marva');
    const playerToken = shallow(<PlayerToken player={player}/>);
    expect(playerToken.hasClass('PlayerToken')).toBeTruthy();
    expect(playerToken.text()).toBe('M');
});
