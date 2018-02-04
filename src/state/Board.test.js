import Board from 'state/Board';

describe('create', () => {
    it('returns a board with the specified dimensions', () => {
        const board = Board.create(2, 3);
        expect(board.width()).toBe(2);
        expect(board.height()).toBe(3);
    });

    it('returns a board with the correct dot types', () => {
        const board = Board.create(3, 3);
    
        const dots = [];
        board.forEachRow((row) => dots.push(row));

        expect(dots[0][0].isStandard()).toBe(true);
        expect(dots[0][1].isStandard()).toBe(true);
        expect(dots[0][2].isRight()).toBe(true);
        expect(dots[1][0].isStandard()).toBe(true);
        expect(dots[1][1].isStandard()).toBe(true);
        expect(dots[1][2].isRight()).toBe(true);
        expect(dots[2][0].isBottom()).toBe(true);
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

describe('forEachRow', () => {
    it('iterates over each row on the board', () => {
        const row1 = [1, 2, 3, 4];
        const row2 = [5, 6, 7, 8];

        const rows = [];
        const board = new Board([row1, row2]);
        board.forEachRow((row) => rows.push(row));

        expect(rows).toEqual([row1, row2]);
    });
});

describe('drawTopLine', () => {
    it('returns a new board', () => {
        const board1 = Board.create(3, 3);
    
        const board2 = board1.drawTopLine('player', 2, 2);
        expect(board2).not.toBe(board1);
        expect(board2).toBeInstanceOf(Board);
    });

    it('returns a board with the specified line drawn', () => {
        const board1 = Board.create(3, 3);
    
        const board2 = board1.drawTopLine('player', 2, 2);
        const rows = [];
        board2.forEachRow((row) => rows.push(row));
    
        expect(rows[2][2].topLineOwner()).toBe('player');
    });
});

describe('drawLeftLine', () => {
    it('returns a new board', () => {
        const board1 = Board.create(3, 3);
    
        const board2 = board1.drawLeftLine('player', 2, 2);
        expect(board2).not.toBe(board1);
        expect(board2).toBeInstanceOf(Board);
    });

    it('returns a board with the specified line drawn', () => {
        const board1 = Board.create(3, 3);
    
        const board2 = board1.drawLeftLine('player', 2, 2);
        const rows = [];
        board2.forEachRow((row) => rows.push(row));
    
        expect(rows[2][2].leftLineOwner()).toBe('player');
    });
});
