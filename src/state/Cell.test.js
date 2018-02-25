import Cell from 'state/Cell';
import Dot from 'state/Dot';
import Mark from 'state/Mark';
import Player from 'state/Player';

describe('owner', () => {
    it('returns as the owner the player that completed the cell', () => {
        const player1 = new Player('0', 0, 'Wilbur');
        const player2 = new Player('1', 1, 'Gortock');

        const cell = new Cell(
            Dot.createStandard().markTopLine(new Mark(1, player1)).markLeftLine(new Mark(2, player2)),
            Dot.createStandard().markLeftLine(new Mark(3, player1)),
            Dot.createStandard().markTopLine(new Mark(4, player2))
        );

        expect(cell.owner()).toEqual(player2);
    });

    it('returns null if the left line is unmarked', () => {
        const player = new Player('1', 1, 'Wilbur', 'red');

        const cell = new Cell(
            Dot.createStandard().markTopLine(new Mark(1, player)),
            Dot.createStandard().markLeftLine(new Mark(2, player)),
            Dot.createStandard().markTopLine(new Mark(3, player))
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the top line is unmarked', () => {
        const player = new Player('1', 1, 'Wilbur');

        const cell = new Cell(
            Dot.createStandard().markLeftLine(new Mark(1, player)),
            Dot.createStandard().markLeftLine(new Mark(2, player)),
            Dot.createStandard().markTopLine(new Mark(3, player))
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the right line is unmarked', () => {
        const player = new Player('1', 1, 'Wilbur');

        const cell = new Cell(
            Dot.createStandard().markTopLine(new Mark(1, player)).markLeftLine(new Mark(2, player)),
            Dot.createStandard(),
            Dot.createStandard().markTopLine(new Mark(3, player))
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the bottom line is unmarked', () => {
        const player = new Player('1', 1, 'Wilbur');

        const cell = new Cell(
            Dot.createStandard().markTopLine(new Mark(1, player)).markLeftLine(new Mark(2, player)),
            Dot.createStandard().markLeftLine(new Mark(3, player)),
            Dot.createStandard()
        );

        expect(cell.owner()).toBeNull();
    });
});
