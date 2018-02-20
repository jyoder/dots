import Cell from 'state/Cell';
import Dot from 'state/Dot';
import Player from 'state/Player';

describe('owner', () => {
    it('returns the owner if all four sides are marked by the same player', () => {
        const player = new Player('0', 0, 'Wilbur', 'red');

        const cell = new Cell(
            Dot.createStandard().markTopLine(player).markLeftLine(player),
            Dot.createStandard().markLeftLine(player),
            Dot.createStandard().markTopLine(player)
        );

        expect(cell.owner()).toEqual(player);
    });

    it('returns null if the top line is marked by a different player than the other sides', () => {
        const player1 = new Player('1', 1, 'Wilbur', 'red');
        const player2 = new Player('2', 2, 'Gretta', 'blue');

        const cell = new Cell(
            Dot.createStandard().markTopLine(player1).markLeftLine(player2),
            Dot.createStandard().markLeftLine(player2),
            Dot.createStandard().markTopLine(player2)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the left line is marked by a different player than the other sides', () => {
        const player1 = new Player('1', 1, 'Wilbur', 'red');
        const player2 = new Player('2', 2, 'Gretta', 'blue');

        const cell = new Cell(
            Dot.createStandard().markTopLine(player2).markLeftLine(player1),
            Dot.createStandard().markLeftLine(player2),
            Dot.createStandard().markTopLine(player2)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the right line is marked by a different player than the other sides', () => {
        const player1 = new Player('1', 1, 'Wilbur', 'red');
        const player2 = new Player('2', 2, 'Gretta', 'blue');

        const cell = new Cell(
            Dot.createStandard().markTopLine(player1).markLeftLine(player1),
            Dot.createStandard().markLeftLine(player2),
            Dot.createStandard().markTopLine(player1)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the bottom line is marked by a different player than the other sides', () => {
        const player1 = new Player('1', 1, 'Wilbur', 'red');
        const player2 = new Player('2', 2, 'Gretta', 'blue');

        const cell = new Cell(
            Dot.createStandard().markTopLine(player1).markLeftLine(player1),
            Dot.createStandard().markLeftLine(player1),
            Dot.createStandard().markTopLine(player2)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the left line is unmarked', () => {
        const player = new Player('1', 1, 'Wilbur', 'red');

        const cell = new Cell(
            Dot.createStandard().markTopLine(player),
            Dot.createStandard().markLeftLine(player),
            Dot.createStandard().markTopLine(player)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the top line is unmarked', () => {
        const player = new Player('1', 1, 'Wilbur', 'red');

        const cell = new Cell(
            Dot.createStandard().markLeftLine(player),
            Dot.createStandard().markLeftLine(player),
            Dot.createStandard().markTopLine(player)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the right line is unmarked', () => {
        const player = new Player('1', 1, 'Wilbur', 'red');

        const cell = new Cell(
            Dot.createStandard().markTopLine(player).markLeftLine(player),
            Dot.createStandard(),
            Dot.createStandard().markTopLine(player)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the bottom line is unmarked', () => {
        const player = new Player('1', 1, 'Wilbur', 'red');

        const cell = new Cell(
            Dot.createStandard().markTopLine(player).markLeftLine(player),
            Dot.createStandard().markLeftLine(player),
            Dot.createStandard()
        );

        expect(cell.owner()).toBeNull();
    });
});
