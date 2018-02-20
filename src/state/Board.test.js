import Board from 'state/Board';
import Player from 'state/Player';

describe('create', () => {
    it('returns a board with the specified dimensions', () => {
        const board = Board.create(2, 3);
        expect(board.width()).toBe(2);
        expect(board.height()).toBe(3);
    });

    it('returns a board with the correct dot types', () => {
        const board = Board.create(3, 3);

        expect(board.dotAt(0, 0).isStandard()).toBeTruthy();
        expect(board.dotAt(1, 0).isStandard()).toBeTruthy();
        expect(board.dotAt(2, 0).isRight()).toBeTruthy();
        expect(board.dotAt(0, 1).isStandard()).toBeTruthy();
        expect(board.dotAt(1, 1).isStandard()).toBeTruthy();
        expect(board.dotAt(2, 1).isRight()).toBeTruthy();
        expect(board.dotAt(0, 2).isBottom()).toBeTruthy();
        expect(board.dotAt(1, 2).isBottom()).toBeTruthy();
        expect(board.dotAt(2, 2).isBottomRight()).toBeTruthy();
    });
});

describe('width', () => {
    it('returns the number of columns on the board', () => {
        const board = new Board([[1, 1, 1, 1]]);
        expect(board.width()).toBe(4);
    });
});

describe('height', () => {
    it('returns the number of rows on the board', () => {
        const board = new Board([[1, 1, 1, 1]]);
        expect(board.height()).toBe(1);
    });
});

describe('dotAt', () => {
    it('returns the dot at the specified location', () => {
        const board = new Board([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        expect(board.dotAt(2, 1)).toBe(6);
    });
});

describe('ownerAt', () => {
    it('returns the owner of the dot at the given location', () => {
        const player = new Player('0', 0, 'Wilbur');
        const board = Board.create(3, 3)
            .markLeftLine(player, 1, 1)
            .markTopLine(player, 1, 1)
            .markLeftLine(player, 2, 1)
            .markTopLine(player, 1, 2);
        
        expect(board.ownerAt(1, 1)).toBe(player);
    });

    it('returns null if the x coordinate is at the right edge of the board', () => {
        const player = new Player('0', 0, 'Wilbur');
        const board = Board.create(3, 3);
    
        expect(board.ownerAt(2, 1)).toBeNull();
    });

    it('returns null if the y coordinate is at the bottom edge of the board', () => {
        const player = new Player('0', 0, 'Wilbur');
        const board = Board.create(3, 3);
    
        expect(board.ownerAt(1, 2)).toBeNull();
    });
});

describe('markTopLine', () => {
    it('returns a new board', () => {
        const board1 = Board.create(3, 3);
    
        const board2 = board1.markTopLine('player', 2, 2);
        expect(board2).not.toBe(board1);
        expect(board2).toBeInstanceOf(Board);
    });

    it('returns a board with the specified line drawn', () => {
        const board1 = Board.create(3, 3);
    
        const board2 = board1.markTopLine('player', 2, 2);    
        expect(board2.dotAt(2, 2).topLineMarker()).toBe('player');
    });
});

describe('markLeftLine', () => {
    it('returns a new board', () => {
        const board1 = Board.create(3, 3);
    
        const board2 = board1.markLeftLine('player', 2, 2);
        expect(board2).not.toBe(board1);
        expect(board2).toBeInstanceOf(Board);
    });

    it('returns a board with the specified line drawn', () => {
        const board1 = Board.create(3, 3);
    
        const board2 = board1.markLeftLine('player', 2, 2);    
        expect(board2.dotAt(2, 2).leftLineMarker()).toBe('player');
    });
});
