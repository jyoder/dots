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

describe('activePlayer', () => {
    it('returns the active player specified in the constructor', () => {
        const game = new Game({}, ['player1', 'player2'], 1, null);
        expect(game.activePlayer()).toBe('player2');
    });
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
            .drawLeftLine(1, 1)
            .drawTopLine(1, 1)
            .drawLeftLine(2, 1)
            .drawTopLine(1, 2);
        
        expect(game.ownerAt(1, 1)).toBe(player);
    });
});

describe('drawTopLine', () => {
    it('returns a new game', () => {
        const game = Game.create(3, 3, ['player1']);
        
        const nextGame = game.drawTopLine(1, 1);
        expect(nextGame).not.toBe(game);
    });

    it('returns a game where the active player is the next one in our list', () => {
        const game = Game.create(3, 3, ['player1', 'player2']);
        
        const nextGame = game.drawTopLine(1, 1);
        expect(nextGame.activePlayer()).toBe('player2');
    });

    it('returns a game where the first player succeeds the last player', () => {
        const game = Game.create(3, 3, ['player1', 'player2']);

        const nextGame = game.drawTopLine(1, 1).drawTopLine(1, 2);
        expect(nextGame.activePlayer()).toBe('player1');
    });

    it('draws the top line for the active player at the specified location on the board', () => {
        const game = Game.create(3, 3, ['player']);

        const nextGame = game.drawTopLine(2, 1);
        expect(nextGame.dotAt(2, 1).topLineMarker()).toEqual('player');
    });

    it('returns null if the specified line has already been drawn', () => {
        const game = Game.create(3, 3, ['player']).drawTopLine(2, 1);
        expect(game.drawTopLine(2, 1)).toBeNull();
    });

    it('ignores the state of the left line', () => {
        const game = Game.create(3, 3, ['player']);
        expect(game.drawLeftLine(2, 1).drawTopLine(2, 1)).not.toBeNull();
    });

    it('game state is correctly propagated to a new instance', () => {
        const board = Board.create(2, 3);
        const player1 = new Player('1', 1, 'Wilbur');
        const player2 = new Player('2', 2, 'Filbra');
        const players = [player1, player2];
        const scoreBoard = new ScoreBoard(board, players);

        const game = new Game(board, players, 1, scoreBoard)
            .drawLeftLine(0, 0);
            
        expect(game.width()).toBe(2);
        expect(game.height()).toBe(3);
        expect(game.activePlayer()).toBe(player1);
        expect(game.scores()).toEqual(new Map([[player1, 0], [player2, 0]]));
    });
});

describe('drawLeftLine', () => {
    it('returns a new game', () => {
        const game = Game.create(3, 3, ['player1']);
        
        const nextGame = game.drawLeftLine(1, 1);
        expect(nextGame).not.toBe(game);
    });

    it('returns a game where the active player is the next one in our list', () => {
        const game = Game.create(3, 3, ['player1', 'player2']);
        
        const nextGame = game.drawLeftLine(1, 1);
        expect(nextGame.activePlayer()).toBe('player2');
    });

    it('returns a game where the first player succeeds the last player', () => {
        const game = Game.create(3, 3, ['player1', 'player2']);

        const nextGame = game.drawLeftLine(1, 1).drawTopLine(1, 2);
        expect(nextGame.activePlayer()).toBe('player1');
    });

    it('draws the left line for the active player at the specified location on the board', () => {
        const game = Game.create(3, 3, ['player']);

        const nextGame = game.drawLeftLine(2, 1);
        expect(nextGame.dotAt(2, 1).leftLineMarker()).toEqual('player');
    });

    it('returns null if the specified line has already been drawn', () => {
        const game = Game.create(3, 3, ['player']).drawLeftLine(2, 1);
        expect(game.drawLeftLine(2, 1)).toBeNull();
    });

    it('ignores the state of the top line', () => {
        const game = Game.create(3, 3, ['player']);
        expect(game.drawTopLine(2, 1).drawLeftLine(2, 1)).not.toBeNull();
    });

    it('game state is correctly propagated to a new instance', () => {
        const board = Board.create(2, 3);
        const player1 = new Player('1', 1, 'Wilbur');
        const player2 = new Player('2', 2, 'Filbra');
        const players = [player1, player2];
        const scoreBoard = new ScoreBoard(board, players);

        const game = new Game(board, players, 1, scoreBoard)
            .drawTopLine(0, 0);
        
            expect(game.width()).toBe(2);
        expect(game.height()).toBe(3);
        expect(game.activePlayer()).toBe(player1);
        expect(game.scores()).toEqual(new Map([[player1, 0], [player2, 0]]));
    });
});

describe('scores', () => {
    it('returns a score of 1 for a player that has captured one square', () => {
        const player = new Player('1', 1, 'Wilbur');
        const board = Board
            .create(2, 3)
            .drawLeftLine(player, 0, 0)
            .drawTopLine(player, 0, 0)
            .drawLeftLine(player, 1, 0)
            .drawTopLine(player, 0, 1);
        const scoreBoard = new ScoreBoard(board, [player]);
        const game = new Game(board, [player], 1, scoreBoard);
        
        expect(game.scores()).toEqual(new Map([[player, 1]]));
    });
});
