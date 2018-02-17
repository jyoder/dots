import Cell from 'state/Cell';
import Dot from 'state/Dot';
import Player from 'state/Player';

describe('owner', () => {
    it('returns the owner if all four sides are owned by the same player', () => {
        const player = new Player('0', 0, 'Wilbur', 'red');

        const cell = new Cell(
            Dot.createStandard().drawTopLine(player).drawLeftLine(player),
            Dot.createStandard().drawLeftLine(player),
            Dot.createStandard().drawTopLine(player)
        );

        expect(cell.owner()).toEqual(player);
    });

    it('returns null if the top line is owned by a different player than the other sides', () => {
        const player1 = new Player('1', 1, 'Wilbur', 'red');
        const player2 = new Player('2', 2, 'Gretta', 'blue');

        const cell = new Cell(
            Dot.createStandard().drawTopLine(player1).drawLeftLine(player2),
            Dot.createStandard().drawLeftLine(player2),
            Dot.createStandard().drawTopLine(player2)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the left line is owned by a different player than the other sides', () => {
        const player1 = new Player('1', 1, 'Wilbur', 'red');
        const player2 = new Player('2', 2, 'Gretta', 'blue');

        const cell = new Cell(
            Dot.createStandard().drawTopLine(player2).drawLeftLine(player1),
            Dot.createStandard().drawLeftLine(player2),
            Dot.createStandard().drawTopLine(player2)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the right line is owned by a different player than the other sides', () => {
        const player1 = new Player('1', 1, 'Wilbur', 'red');
        const player2 = new Player('2', 2, 'Gretta', 'blue');

        const cell = new Cell(
            Dot.createStandard().drawTopLine(player1).drawLeftLine(player1),
            Dot.createStandard().drawLeftLine(player2),
            Dot.createStandard().drawTopLine(player1)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the bottom line is owned by a different player than the other sides', () => {
        const player1 = new Player('1', 1, 'Wilbur', 'red');
        const player2 = new Player('2', 2, 'Gretta', 'blue');

        const cell = new Cell(
            Dot.createStandard().drawTopLine(player1).drawLeftLine(player1),
            Dot.createStandard().drawLeftLine(player1),
            Dot.createStandard().drawTopLine(player2)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the left line is not owned', () => {
        const player = new Player('1', 1, 'Wilbur', 'red');

        const cell = new Cell(
            Dot.createStandard().drawTopLine(player),
            Dot.createStandard().drawLeftLine(player),
            Dot.createStandard().drawTopLine(player)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the top line is not owned', () => {
        const player = new Player('1', 1, 'Wilbur', 'red');

        const cell = new Cell(
            Dot.createStandard().drawLeftLine(player),
            Dot.createStandard().drawLeftLine(player),
            Dot.createStandard().drawTopLine(player)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the right line is not owned', () => {
        const player = new Player('1', 1, 'Wilbur', 'red');

        const cell = new Cell(
            Dot.createStandard().drawTopLine(player).drawLeftLine(player),
            Dot.createStandard(),
            Dot.createStandard().drawTopLine(player)
        );

        expect(cell.owner()).toBeNull();
    });

    it('returns null if the bottom line is not owned', () => {
        const player = new Player('1', 1, 'Wilbur', 'red');

        const cell = new Cell(
            Dot.createStandard().drawTopLine(player).drawLeftLine(player),
            Dot.createStandard().drawLeftLine(player),
            Dot.createStandard()
        );

        expect(cell.owner()).toBeNull();
    });
});
