import DistributedGame from 'network/DistributedGame';
import Game from 'state/Game';

describe('create', () => {
    it('returns a new distributed game that listens for events from the connection', () => {
        const connection = _connection();

        let game = null;
        const onNextGame = (nextGame) => game = nextGame;
        
        const distributedGame = DistributedGame.create(connection, 'gameId', onNextGame);
        expect(connection.listen).toHaveBeenCalledTimes(1);
        expect(connection.listen.mock.calls[0][0]).toBe('gameId');

        connection.listen.mock.calls[0][1]([
            {
                eventType: 'addPlayer',
                playerId: 'id1',
                playerName: 'John'
            }
        ]);

        expect(game.players().length).toBe(1);
    });

    it('returns a new distributed game that listens for events from the connection', () => {
        const connection = _connection();
        const onNextGame = () => {};
        const distributedGame = DistributedGame.create(connection, 'gameId', onNextGame);
        expect(connection.listen).toHaveBeenCalledTimes(1);
        expect(connection.listen.mock.calls[0][0]).toBe('gameId');
    });
});

describe('gameId', () => {
    it('returns the id for the game this distributed game is attached to', () => {
        const connection = _connection();
        const game = Game.create(1, 1);
        const onNextGame = () => {};
        
        const distributedGame = new DistributedGame(connection, 'gameId', game, onNextGame);
        expect(distributedGame.gameId()).toBe('gameId');
    });
});

describe('userId', () => {
    it('returns the user id for the current connection', () => {
        const connection = _connection();
        const game = Game.create(1, 1);
        const onNextGame = () => {};
        
        const distributedGame = new DistributedGame(connection, 'gameId', game, onNextGame);
        expect(distributedGame.userId()).toBe('userId');
    });
});

describe('addPlayer', () => {
    it('adds the appropriate event to the database connection', () => {
        const connection = _connection();
        const game = Game.create(1, 1);
        const onNextGame = () => {};
        
        const distributedGame = new DistributedGame(connection, 'gameId', game, onNextGame);
        distributedGame.addPlayer('John');
        expect(connection.addEvent).toHaveBeenCalledWith(
            'gameId',
            {
                eventType: 'addPlayer',
                playerId: 'userId',
                playerName: 'John'
            }
        );
    });
});

describe('addPlayer', () => {
    it('adds the appropriate event to the database connection', () => {
        const connection = _connection();
        const game = Game.create(1, 1);
        const onNextGame = () => {};
        
        const distributedGame = new DistributedGame(connection, 'gameId', game, onNextGame);
        distributedGame.addPlayer('John');
        expect(connection.addEvent).toHaveBeenCalledWith(
            'gameId',
            {
                eventType: 'addPlayer',
                playerId: 'userId',
                playerName: 'John'
            }
        );
    });

    it('does not add the event to the connection if the game disallows it', () => {
        const connection = _connection();
        const game = { addPlayer: jest.fn(() => null) };
        const onNextGame = () => {};
        
        const distributedGame = new DistributedGame(connection, 'gameId', game, onNextGame);
        distributedGame.addPlayer('John');
        expect(connection.addEvent).not.toHaveBeenCalled();
    });
});

describe('startGame', () => {
    it('adds the appropriate event to the database connection', () => {
        const connection = _connection();
        const game = Game.create(1, 1)
            .addPlayer('id1', 'player1')
            .addPlayer('id2', 'player2');
        const onNextGame = () => {};
        
        const distributedGame = new DistributedGame(connection, 'gameId', game, onNextGame);
        distributedGame.startGame();
        expect(connection.addEvent).toHaveBeenCalledWith(
            'gameId',
            {
                eventType: 'startGame'
            }
        );
    });

    it('does not add the event to the connection if the game disallows it', () => {
        const connection = _connection();
        const game = { start: jest.fn(() => null) };
        const onNextGame = () => {};
        
        const distributedGame = new DistributedGame(connection, 'gameId', game, onNextGame);
        distributedGame.startGame();
        expect(connection.addEvent).not.toHaveBeenCalled();
    });
});

describe('markLeftLine', () => {
    it('adds the appropriate event to the database connection', () => {
        const connection = _connection();
        const game = Game.create(1, 1)
            .addPlayer('id1', 'player1')
            .addPlayer('id2', 'player2')
            .start();
        const onNextGame = () => {};
        
        const distributedGame = new DistributedGame(connection, 'gameId', game, onNextGame);
        distributedGame.markLeftLine(0, 0);
        expect(connection.addEvent).toHaveBeenCalledWith(
            'gameId',
            {
                eventType: 'markLeftLine',
                x: 0,
                y: 0
            }
        );
    });

    it('does not add the event to the connection if the game disallows it', () => {
        const connection = _connection();
        const game = { markLeftLine: jest.fn(() => null) };
        const onNextGame = () => {};
        
        const distributedGame = new DistributedGame(connection, 'gameId', game, onNextGame);
        distributedGame.markLeftLine(0, 0);
        expect(connection.addEvent).not.toHaveBeenCalled();
    });
});

describe('markTopLine', () => {
    it('adds the appropriate event to the database connection', () => {
        const connection = _connection();
        const game = Game.create(1, 1)
            .addPlayer('id1', 'player1')
            .addPlayer('id2', 'player2')
            .start();
        const onNextGame = () => {};
        
        const distributedGame = new DistributedGame(connection, 'gameId', game, onNextGame);
        distributedGame.markTopLine(0, 0);
        expect(connection.addEvent).toHaveBeenCalledWith(
            'gameId',
            {
                eventType: 'markTopLine',
                x: 0,
                y: 0
            }
        );
    });

    it('does not add the event to the connection if the game disallows it', () => {
        const connection = _connection();
        const game = { markTopLine: jest.fn(() => null) };
        const onNextGame = () => {};
        
        const distributedGame = new DistributedGame(connection, 'gameId', game, onNextGame);
        distributedGame.markTopLine(0, 0);
        expect(connection.addEvent).not.toHaveBeenCalled();
    });
});

describe('onGameEvents', () => {
    it('applies the addPlayer event to produce a new game', () => {
        const connection = _connection();
        let game = null;
        const onNextGame = (nextGame) => game = nextGame;
        
        const distributedGame = new DistributedGame(
            connection,
            'gameId',
            Game.create(1, 1),
            onNextGame
        );

        distributedGame.onGameEvents([{
            eventType: 'addPlayer',
            playerId: 'userId',
            playerName: 'John'
        }]);

        const player = game.players()[0];
        expect(player.playerId()).toBe('userId');
        expect(player.playerName()).toBe('John');
    });

    it('applies the startGame event to produce a new game', () => {
        const connection = _connection();
        const initialGame = Game.create(1, 1)
            .addPlayer('id1', 'player1')
            .addPlayer('id2', 'player2');

        let game = null;
        const onNextGame = (nextGame) => game = nextGame;
        
        const distributedGame = new DistributedGame(
            connection,
            'gameId',
            initialGame,
            onNextGame
        );

        distributedGame.onGameEvents([{
            eventType: 'startGame'
        }]);

        expect(game.started()).toBeTruthy();
    });

    it('applies the markLeftLine event to produce a new game', () => {
        const connection = _connection();
        const initialGame = Game.create(1, 1)
            .addPlayer('id1', 'player1')
            .addPlayer('id2', 'player2')
            .start();

        let game = null;
        const onNextGame = (nextGame) => game = nextGame;
        
        const distributedGame = new DistributedGame(
            connection,
            'gameId',
            initialGame,
            onNextGame
        );

        distributedGame.onGameEvents([{
            eventType: 'markLeftLine',
            x: 0,
            y: 0
        }]);

        const player = game.dotAt(0, 0).leftLineMark().player();
        expect(player.playerId()).toBe('id1');
    });

    it('applies the markTopLine event to produce a new game', () => {
        const connection = _connection();
        const initialGame = Game.create(1, 1)
            .addPlayer('id1', 'player1')
            .addPlayer('id2', 'player2')
            .start();

        let game = null;
        const onNextGame = (nextGame) => game = nextGame;
        
        const distributedGame = new DistributedGame(
            connection,
            'gameId',
            initialGame,
            onNextGame
        );

        distributedGame.onGameEvents([{
            eventType: 'markTopLine',
            x: 0,
            y: 0
        }]);

        const player = game.dotAt(0, 0).topLineMark().player();
        expect(player.playerId()).toBe('id1');
    });

    it('applies multiple events to produce a new game', () => {
        const connection = _connection();
        let game = null;
        const onNextGame = (nextGame) => game = nextGame;
        
        const distributedGame = new DistributedGame(
            connection,
            'gameId',
            Game.create(1, 1),
            onNextGame
        );

        distributedGame.onGameEvents([
            {
                eventType: 'addPlayer',
                playerId: 'userId1',
                playerName: 'John'
            },
            {
                eventType: 'addPlayer',
                playerId: 'userId2',
                playerName: 'Yoder'
            }
        ]);

        expect(game.players().length).toBe(2);
    });

    it('skips events that violate the rules of the game', () => {
        const connection = _connection();
        let game = null;
        const onNextGame = (nextGame) => game = nextGame;
        
        const distributedGame = new DistributedGame(
            connection,
            'gameId',
            Game.create(1, 1),
            onNextGame
        );

        distributedGame.onGameEvents([
            {
                eventType: 'startGame'
            },
            {
                eventType: 'addPlayer',
                playerId: 'userId1',
                playerName: 'John'
            },
            {
                eventType: 'addPlayer',
                playerId: 'userId2',
                playerName: 'Yoder'
            }
        ]);

        expect(game.players().length).toBe(2);
        expect(game.started()).toBeFalsy();
    });

    it('skips events that have already been processed', () => {
        const connection = _connection();
        let game = null;
        const onNextGame = (nextGame) => game = nextGame;
        
        const distributedGame = new DistributedGame(
            connection,
            'gameId',
            Game.create(1, 1),
            onNextGame
        );

        distributedGame.onGameEvents([
            {
                eventType: 'addPlayer',
                playerId: 'userId1',
                playerName: 'John'
            },
            {
                eventType: 'addPlayer',
                playerId: 'userId2',
                playerName: 'Yoder'
            }
        ]);
        distributedGame.onGameEvents([
            {
                eventType: 'addPlayer',
                playerId: 'userId5',
                playerName: 'John'
            },
            {
                eventType: 'addPlayer',
                playerId: 'userId6',
                playerName: 'Yoder'
            },
            {
                eventType: 'addPlayer',
                playerId: 'userId3',
                playerName: 'Goader'
            }
        ]);

        expect(game.players().length).toBe(3);
    });
});

function _connection() {
    const listen = jest.fn();
    const addEvent = jest.fn();
    
    return {
        userId: () => 'userId',
        listen: listen,
        addEvent: addEvent
    };
}
