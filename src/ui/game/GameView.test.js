import GameView from 'ui/game/GameView';
import BoardView from 'ui/game/BoardView';
import ScoreBoardView from 'ui/game/ScoreBoardView';

import Game from 'state/Game';

import React from 'react';
import { shallow } from 'enzyme';

describe('GameView', () => {
    it('renders nothing until it receives the first game update', () => {
        const createConnection = _createConnectionPromise();
        const gameView = shallow(<GameView gameId={'gameId'} createConnection={createConnection}/>);
        expect(gameView.hasClass('GameView')).toBeFalsy();

        const connection = _connection();
        createConnection.then.mock.calls[0][0](connection);
        expect(connection.listen.mock.calls[0][0]).toBe('gameId');

        connection.listen.mock.calls[0][1]([
            {
                eventType: 'addPlayer',
                playerId: 'id1',
                playerName: 'John'
            }
        ]);
        gameView.update();
        expect(gameView.hasClass('GameView')).toBeTruthy();
    });

    it('renders a BoardView and a ScoreBoardView with required properties', () => {
        const createConnection = _createConnectionPromise();
        const gameView = shallow(<GameView gameId={'gameId'} createConnection={createConnection}/>);

        const connection = _connection();
        createConnection.then.mock.calls[0][0](connection);
        connection.listen.mock.calls[0][1]([
            {
                eventType: 'addPlayer',
                playerId: 'id1',
                playerName: 'John'
            }
        ]);
        gameView.update();

        const boardView = gameView.find(BoardView).get(0);
        expect(boardView.props.game).toBeInstanceOf(Game);
        expect(boardView.props.clickHandler).toBeInstanceOf(Function);

        const scoreBoardView = gameView.find(ScoreBoardView).get(0);
        expect(scoreBoardView.props.game).toBeInstanceOf(Game);
    });

    it('responds to the user clicking a line by sending an update on the connection', () => {
        const createConnection = _createConnectionPromise();
        const gameView = shallow(<GameView gameId={'gameId'} createConnection={createConnection}/>);

        const connection = _connection();
        createConnection.then.mock.calls[0][0](connection);
        connection.listen.mock.calls[0][1]([
            {
                eventType: 'addPlayer',
                playerId: 'id1',
                playerName: 'John'
            },
            {
                eventType: 'addPlayer',
                playerId: 'id2',
                playerName: 'Hillary'
            },
            {
                eventType: 'startGame'
            }
        ]);
        gameView.update();

        const boardView = gameView.find(BoardView).get(0);
        boardView.props.clickHandler('left', 0, 0);
        expect(connection.addEvent).toHaveBeenCalledWith(
            'gameId',
            {
                eventType: 'markLeftLine',
                x: 0,
                y: 0
            }
        );
    });
});

function _createConnectionPromise() {
    return {
        then: jest.fn()
    }
}

function _connection() {
    return {
        listen: jest.fn(),
        addEvent: jest.fn()
    }
}