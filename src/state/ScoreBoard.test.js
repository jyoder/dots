import ScoreBoard from 'state/ScoreBoard';
import Game from 'state/Game';
import Player from 'state/Player';
import Board from 'state/Board';

describe('scores', () => {
    it('returns a mapping of player ids to scores where players in the map are ordered according to the', () => {
        const players = [new Player('2', 2, 'Olga'), new Player('1', 1, 'Helga')];
        const scoreBoard = new ScoreBoard(Board.create(3, 3), players);
        
        expect(scoreBoard.scores()).toEqual(new Map([[players[0], 0], [players[1], 0]]));
    });

    it('returns a score of 1 for a player that owns one square', () => {
        const players = [new Player('2', 2, 'Olga'), new Player('1', 1, 'Helga')];
        const board = _drawSquare(Board.create(3, 3), players[0], 1, 1);

        const scoreBoard = new ScoreBoard(board, players);
        expect(scoreBoard.scores()).toEqual(new Map([[players[0], 1], [players[1], 0]]));
    });

    it('returns a score of 2 for a player that owns two squares', () => {
        const players = [new Player('2', 2, 'Olga'), new Player('1', 1, 'Helga')];
        const board = _drawSquare(_drawSquare(Board.create(3, 3), players[1], 0, 0), players[1], 1, 1);

        const scoreBoard = new ScoreBoard(board, players);
        expect(scoreBoard.scores()).toEqual(new Map([[players[0], 0], [players[1], 2]]));
    });

    it('returns a score of 1 for each player that owns one square', () => {
        const players = [new Player('2', 2, 'Olga'), new Player('1', 1, 'Helga')];
        const board = _drawSquare(_drawSquare(Board.create(3, 3), players[0], 0, 0), players[1], 1, 1);

        const scoreBoard = new ScoreBoard(board, players);
        expect(scoreBoard.scores()).toEqual(new Map([[players[0], 1], [players[1], 1]]));
    });

    function _drawSquare(board, player, x, y) {
        return(
            board.drawLeftLine(player, x, y)
            .drawTopLine(player, x, y)
            .drawLeftLine(player, x + 1, y)
            .drawTopLine(player, x, y + 1)
        );
    }
});