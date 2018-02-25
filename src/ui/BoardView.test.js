import BoardView from 'ui/BoardView';
import DotView from 'ui/DotView';
import PlayerToken from 'ui/PlayerToken';
import PlayerTokenSlug from 'ui/PlayerTokenSlug';

import Board from 'state/Board';
import Player from 'state/Player';

import React from 'react';
import { shallow } from 'enzyme';

test('BoardView renders dot views according to the dimensions of the given board', () => {
    const boardView = shallow(<BoardView board={Board.create(2, 3)} clickHandler={() => {}}/>);
    expect(boardView.find('.BoardView-row--0').exists()).toBeTruthy();
    expect(boardView.find('.BoardView-row--1').exists()).toBeTruthy();
    expect(boardView.find('.BoardView-row--2').exists()).toBeTruthy();

    expect(boardView.find('.BoardView-row--0').children().length).toBe(2);
    expect(boardView.find('.BoardView-row--1').children().length).toBe(2);
    expect(boardView.find('.BoardView-row--2').children().length).toBe(2);

    expect(boardView.find(DotView).length).toBe(6);
});

test('BoardView renders a player token slug for a dot that is not owned by a player', () => {
    const player = new Player('1', 1, 'Gertrude');
    const board = Board.create(2, 3)
        .markLeftLine(player, 0, 0)
        .markTopLine(player, 0, 0)
        .markLeftLine(player, 1, 0)
        .markTopLine(player, 0, 1);

    const boardView = shallow(<BoardView board={board} clickHandler={() => {}}/>);
    expect(boardView.find(PlayerTokenSlug).length).toBe(5);
});

test('BoardView renders a player token for a dot that is owned by a player', () => {
    const player = new Player('1', 1, 'Gertrude');
    const board = Board.create(2, 3)
        .markLeftLine(player, 0, 0)
        .markTopLine(player, 0, 0)
        .markLeftLine(player, 1, 0)
        .markTopLine(player, 0, 1);

    const boardView = shallow(<BoardView board={board} clickHandler={() => {}}/>);
    expect(boardView.find(PlayerToken).length).toBe(1);
});

test('BoardView binds the click handler once for each line that can be clicked', () => {
    const clickHandler = jest.fn();
    clickHandler.bind = jest.fn();

    const boardView = shallow(<BoardView board={Board.create(1, 2)} clickHandler={clickHandler}/>);
    expect(clickHandler.bind).toHaveBeenCalledTimes(4);
    expect(clickHandler.bind).toHaveBeenCalledWith(null, 'left', 0, 0);
    expect(clickHandler.bind).toHaveBeenCalledWith(null, 'top', 0, 0);
    expect(clickHandler.bind).toHaveBeenCalledWith(null, 'left', 0, 1);
    expect(clickHandler.bind).toHaveBeenCalledWith(null, 'top', 0, 1);
});
