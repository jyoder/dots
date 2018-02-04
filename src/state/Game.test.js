import Game from 'state/Game';

describe('create', () => {
    it('returns a game with the specified width, height, and players', () => {
        const game = Game.create(4, 5, ['player']);
        expect(game.width()).toBe(4);
        expect(game.height()).toBe(5);
        expect(game.activePlayer()).toEqual('player');
    });
});

describe('width', () => {
    it('returns the width of the game board', () => {
        const mockBoard = { width: jest.fn(() => 2) };
        const game = new Game(mockBoard, [], 0);
    
        expect(game.width()).toBe(2);
        expect(mockBoard.width).toHaveBeenCalled();
    });
});

describe('height', () => {
    it('returns the height of the game board', () => {
        const mockBoard = { height: jest.fn(() => 3) };
        const game = new Game(mockBoard, [], 0);
    
        expect(game.height()).toBe(3);
        expect(mockBoard.height).toHaveBeenCalledTimes(1);
    });
});

describe('activePlayer', () => {
    it('returns the active player specified in the constructor', () => {
        const game = new Game({}, ['player1', 'player2'], 1);
        expect(game.activePlayer()).toBe('player2');
    });
});

describe('drawTopLine', () => {
    it('returns a new game where the active player is the next one in our list', () => {
        const game = new Game({ drawTopLine: jest.fn() }, ['player1', 'player2'], 0);

        const nextGame = game.drawTopLine(1, 1);
        expect(nextGame.activePlayer()).toBe('player2');
    });

    it('returns a new game where the first player succeeds the last player', () => {
        const game = new Game({ drawTopLine: jest.fn() }, ['player1', 'player2'], 1);

        const nextGame = game.drawTopLine(1, 1);
        expect(nextGame.activePlayer()).toBe('player1');
    });

    it('returns a new game containing new board', () => {
        const nextMockBoard = { width: () => 42 };
        const mockBoard = { drawTopLine: jest.fn(() => nextMockBoard) };
        const game = new Game(mockBoard, ['player1'], 0);
        
        const nextGame = game.drawTopLine(5, 13);
        expect(nextGame.width()).toBe(42);
    });

    it('draws the top line for the active player at the specified coordinates on the board', () => {
        const mockBoard = { drawTopLine: jest.fn() };
        const game = new Game(mockBoard, ['player1', 'player2'], 0);
        
        game.drawTopLine(5, 13);
        expect(mockBoard.drawTopLine).toHaveBeenCalledTimes(1);
        expect(mockBoard.drawTopLine).toHaveBeenCalledWith('player1', 5, 13);
    });
});

describe('drawLeftLine', () => {
    it('returns a new game where the active player is the next one in our list', () => {
        const game = new Game({ drawLeftLine: jest.fn() }, ['player1', 'player2'], 0);

        const nextGame = game.drawLeftLine(1, 1);
        expect(nextGame.activePlayer()).toBe('player2');
    });

    it('returns a new game where the first player succeeds the last player', () => {
        const game = new Game({ drawLeftLine: jest.fn() }, ['player1', 'player2'], 1);

        const nextGame = game.drawLeftLine(1, 1);
        expect(nextGame.activePlayer()).toBe('player1');
    });

    it('returns a new game containing new board', () => {
        const nextMockBoard = { width: () => 42 };
        const mockBoard = { drawLeftLine: jest.fn(() => nextMockBoard) };
        const game = new Game(mockBoard, ['player1'], 0);
        
        const nextGame = game.drawLeftLine(5, 13);
        expect(nextGame.width()).toBe(42);
    });

    it('draws the left line for the active player at the specified coordinates on the board', () => {
        const mockBoard = { drawLeftLine: jest.fn() };
        const game = new Game(mockBoard, ['player1', 'player2'], 0);
        
        const nextGame = game.drawLeftLine(5, 13);
        expect(mockBoard.drawLeftLine).toHaveBeenCalledTimes(1);
        expect(mockBoard.drawLeftLine).toHaveBeenCalledWith('player1', 5, 13);
    });
});
