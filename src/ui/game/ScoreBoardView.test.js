import ScoreBoardView from 'ui/game/ScoreBoardView';
import PlayerToken from 'ui/base/PlayerToken';

import Game from 'state/Game';
import Player from 'state/Player';

import React from 'react';
import { shallow } from 'enzyme';

test('ScoreBoardView has the proper class', () => {
    const game = Game.create(3, 3);
    const scoreBoardView = shallow(<ScoreBoardView game={game}/>);
    expect(scoreBoardView.hasClass('ScoreBoardView')).toBeTruthy();
});

test('ScoreBoardView includes the tokens, names, and scores for all players', () => {
    const game = Game.create(3, 3)
        .addPlayer('1', 'John')
        .addPlayer('2', 'Hillary');

    const scoreBoardView = shallow(<ScoreBoardView game={game}/>);
    const rows = scoreBoardView.find('.ScoreBoardView-row');
    expect(rows.length).toBe(2);

    expect(rows.at(0).find(PlayerToken).get(0).props.player.playerId()).toBe('1');
    expect(rows.at(0).find('.ScoreBoardView-row-status').at(0).text().length).toBeGreaterThan(0);
    expect(rows.at(0).find('.ScoreBoardView-row-name').at(0).text()).toBe('John');
    expect(rows.at(0).find('.ScoreBoardView-row-score').at(0).text()).toBe('0');

    expect(rows.at(1).find(PlayerToken).get(0).props.player.playerId()).toBe('2');
    expect(rows.at(1).find('.ScoreBoardView-row-status').at(0).text().length).toBe(0);
    expect(rows.at(1).find('.ScoreBoardView-row-name').at(0).text()).toBe('Hillary');
    expect(rows.at(1).find('.ScoreBoardView-row-score').at(0).text()).toBe('0');
});
