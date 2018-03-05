import Game from 'state/Game';
import Board from 'state/Board';
import Player from 'state/Player';
import ScoreBoard from 'state/ScoreBoard';

describe('create', () => {
    it('returns a game with the specified width, height', () => {
        const game = Game.create(4, 5, ['player']);
        expect(game.width()).toBe(4);
        expect(game.height()).toBe(5);
    });

    it('returns a game where the first specified player is the active player', () => {
        const game = Game.create(4, 5, ['player']);
        expect(game.activePlayer()).toEqual('player');
    });
});

describe('constructor', () => {
    it('returns a game initialized with the specified properties', () => {
        const board = Board.create(2, 3);
        const player1 = new Player('1', 1, 'Wilbur');
        const player2 = new Player('2', 2, 'Filbra');
        const players = [player1, player2];
        const scoreBoard = new ScoreBoard(board, players);

        const game = new Game(board, players, 1, scoreBoard);
        expect(game.width()).toBe(2);
        expect(game.height()).toBe(3);
        expect(game.players().length).toBe(2);
        expect(game.activePlayer()).toBe(player2);
        expect(game.scores()).toEqual(new Map([[player1, 0], [player2, 0]]));
    });
});

describe('width', () => {
    it('returns the width of the game board', () => {
        const game = Game.create(4, 5, ['player']);
        expect(game.width()).toBe(4);
    });
});

describe('height', () => {
    it('returns the height of the game board', () => {
        const game = Game.create(4, 5, ['player']);  
        expect(game.height()).toBe(5);
    });
});

describe('players', () => {
    it('returns set of players in the game', () => {
        const game = Game.create(3, 3, [])
            .addPlayer('id1', 'John')
            .addPlayer('id2', 'Hillary');

        expect(game.players().length).toBe(2);
        expect(game.players()[0].playerId()).toBe('id1');
        expect(game.players()[1].playerId()).toBe('id2');
    });
});

describe('activePlayer', () => {
    it('returns the active player specified in the constructor', () => {
        const game = new Game({}, ['player1', 'player2'], 1, null);
        expect(game.activePlayer()).toBe('player2');
    });

    it('returns null if there are no players in the game', () => {
        const game = Game.create(2, 2, []);
        expect(game.activePlayer()).toBeNull();
    })
});

describe('dotAt', () => {
    it('returns the dot at the specified location', () => {
        const game = Game.create(3, 3, ['player']);
        
        expect(game.dotAt(0, 0).isStandard()).toBeTruthy();
        expect(game.dotAt(1, 0).isStandard()).toBeTruthy();
        expect(game.dotAt(2, 0).isRight()).toBeTruthy();
        expect(game.dotAt(0, 1).isStandard()).toBeTruthy();
        expect(game.dotAt(1, 1).isStandard()).toBeTruthy();
        expect(game.dotAt(2, 1).isRight()).toBeTruthy();
        expect(game.dotAt(0, 2).isBottom()).toBeTruthy();
        expect(game.dotAt(1, 2).isBottom()).toBeTruthy();
        expect(game.dotAt(2, 2).isBottomRight()).toBeTruthy();
    });
});

describe('ownerAt', () => {
    it('returns the owner of the dot at the specified location', () => {
        const player = new Player('1', 1, 'Wilbur');
        const game = Game.create(3, 3, [player])
            .markLeftLine(1, 1)
            .markTopLine(1, 1)
            .markLeftLine(2, 1)
            .markTopLine(1, 2);
        
        expect(game.ownerAt(1, 1)).toBe(player);
    });
});

describe('addPlayer', () => {
    it('returns a new game which includes the specified player', () => {
        const game = Game.create(3, 3, []).addPlayer('id1', 'John');
    
        expect(game.players().length).toBe(1);
        expect(game.players()[0].playerId()).toBe('id1');
        expect(game.players()[0].playerIndex()).toBe(0);
        expect(game.players()[0].playerName()).toBe('John');
    });

    it('increments the player index for each player added in succession', () => {
        const game = Game.create(3, 3, [])
            .addPlayer('id1', 'John')
            .addPlayer('id2', 'Bill');
    
        expect(game.players()[0].playerIndex()).toBe(0);
        expect(game.players()[1].playerIndex()).toBe(1);
    });

    it('preserves the active player', () => {
        const game = Game.create(3, 3, [])
            .addPlayer('id1', 'John')
            .addPlayer('id2', 'Bill')
            .markTopLine(0, 0)
            .addPlayer('id3', 'Gordon');
    
        expect(game.players()[1]).toBe(game.activePlayer());
    });

    it('reflects the new player in the scores', () => {
        const game = Game.create(3, 3, [])
            .addPlayer('id1', 'John')
            .addPlayer('id2', 'Bill');
    
        const keys = Array.from(game.scores().keys());
        expect(keys.length).toBe(2);
        expect(keys[0].playerId()).toBe('id1');
        expect(keys[1].playerId()).toBe('id2');
    });
});

describe('markTopLine', () => {
    it('returns a new game', () => {
        const game = Game.create(3, 3, ['player1']);
        
        const nextGame = game.markTopLine(1, 1);
        expect(nextGame).not.toBe(game);
    });

    it('returns a game where the active player is the next one in our list', () => {
        const game = Game.create(3, 3, ['player1', 'player2']);
        
        const nextGame = game.markTopLine(1, 1);
        expect(nextGame.activePlayer()).toBe('player2');
    });

    it('returns a game where the first player succeeds the last player', () => {
        const game = Game.create(3, 3, ['player1', 'player2']);

        const nextGame = game.markTopLine(1, 1).markTopLine(1, 2);
        expect(nextGame.activePlayer()).toBe('player1');
    });

    it('draws the top line for the active player at the specified location on the board', () => {
        const game = Game.create(3, 3, ['player']);

        const nextGame = game.markTopLine(2, 1);
        expect(nextGame.dotAt(2, 1).topLineMark().player()).toEqual('player');
    });

    it('returns null if no players have been added to the game', () => {
        const game = Game.create(3, 3, []).markTopLine(2, 1);
        expect(game).toBeNull();
    });

    it('returns null if the specified line has already been drawn', () => {
        const game = Game.create(3, 3, ['player']).markTopLine(2, 1);
        expect(game.markTopLine(2, 1)).toBeNull();
    });

    it('ignores the state of the left line', () => {
        const game = Game.create(3, 3, ['player']);
        expect(game.markLeftLine(2, 1).markTopLine(2, 1)).not.toBeNull();
    });

    it('game state is correctly propagated to a new instance', () => {
        const board = Board.create(2, 3);
        const player1 = new Player('1', 1, 'Wilbur');
        const player2 = new Player('2', 2, 'Filbra');
        const players = [player1, player2];
        const scoreBoard = new ScoreBoard(board, players);

        const game = new Game(board, players, 1, scoreBoard)
            .markLeftLine(0, 0);
            
        expect(game.width()).toBe(2);
        expect(game.height()).toBe(3);
        expect(game.players().length).toBe(2);
        expect(game.activePlayer()).toBe(player1);
        expect(game.scores()).toEqual(new Map([[player1, 0], [player2, 0]]));
    });
});

describe('markLeftLine', () => {
    it('returns a new game', () => {
        const game = Game.create(3, 3, ['player1']);
        
        const nextGame = game.markLeftLine(1, 1);
        expect(nextGame).not.toBe(game);
    });

    it('returns a game where the active player is the next one in our list', () => {
        const game = Game.create(3, 3, ['player1', 'player2']);
        
        const nextGame = game.markLeftLine(1, 1);
        expect(nextGame.activePlayer()).toBe('player2');
    });

    it('returns a game where the first player succeeds the last player', () => {
        const game = Game.create(3, 3, ['player1', 'player2']);

        const nextGame = game.markLeftLine(1, 1).markTopLine(1, 2);
        expect(nextGame.activePlayer()).toBe('player1');
    });

    it('draws the left line for the active player at the specified location on the board', () => {
        const game = Game.create(3, 3, ['player']);

        const nextGame = game.markLeftLine(2, 1);
        expect(nextGame.dotAt(2, 1).leftLineMark().player()).toEqual('player');
    });

    it('returns null if no players have been added to the game', () => {
        const game = Game.create(3, 3, []).markLeftLine(2, 1);
        expect(game).toBeNull();
    });

    it('returns null if the specified line has already been drawn', () => {
        const game = Game.create(3, 3, ['player']).markLeftLine(2, 1);
        expect(game.markLeftLine(2, 1)).toBeNull();
    });

    it('ignores the state of the top line', () => {
        const game = Game.create(3, 3, ['player']);
        expect(game.markTopLine(2, 1).markLeftLine(2, 1)).not.toBeNull();
    });

    it('game state is correctly propagated to a new instance', () => {
        const board = Board.create(2, 3);
        const player1 = new Player('1', 1, 'Wilbur');
        const player2 = new Player('2', 2, 'Filbra');
        const players = [player1, player2];
        const scoreBoard = new ScoreBoard(board, players);

        const game = new Game(board, players, 1, scoreBoard)
            .markTopLine(0, 0);
        
            expect(game.width()).toBe(2);
        expect(game.height()).toBe(3);
        expect(game.players().length).toBe(2);
        expect(game.activePlayer()).toBe(player1);
        expect(game.scores()).toEqual(new Map([[player1, 0], [player2, 0]]));
    });
});

describe('scores', () => {
    it('returns a score of 1 for a player that has captured one square', () => {
        const player = new Player('1', 1, 'Wilbur');
        const board = Board
            .create(2, 3)
            .markLeftLine(player, 0, 0)
            .markTopLine(player, 0, 0)
            .markLeftLine(player, 1, 0)
            .markTopLine(player, 0, 1);
        const scoreBoard = new ScoreBoard(board, [player]);
        const game = new Game(board, [player], 1, scoreBoard);
        
        expect(game.scores()).toEqual(new Map([[player, 1]]));
    });
});
