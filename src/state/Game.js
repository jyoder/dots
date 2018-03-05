import Board from 'state/Board';
import ScoreBoard from 'state/ScoreBoard';
import Player from 'state/Player';

export default class Game {
    static create(width, height) {
        const board = Board.create(width, height);
        return new Game(board, [], 0, new ScoreBoard(board, []));
    }

    constructor(board, players, activePlayerIndex, scoreBoard) {
        this._board = board;
        this._players = players;
        this._activePlayerIndex = activePlayerIndex;
        this._scoreBoard = scoreBoard;
    }

    width() {
        return this._board.width();
    }

    height() {
        return this._board.height();
    }

    players() {
        return this._players;
    }

    activePlayer() {
        return this._hasPlayers() ? this._players[this._activePlayerIndex] : null;
    }

    dotAt(x, y) {
        return this._board.dotAt(x, y);
    }

    ownerAt(x, y) {
        return this._board.ownerAt(x, y);
    }

    addPlayer(id, name) {
        const players = this._players.slice();
        players.push(new Player(id, this._players.length, name));
        return this._gameWithPlayers(players);
    }

    markTopLine(x, y) {
        if(this._hasPlayers() && !this.dotAt(x, y).topLineMark()) {
            const board = this._board.markTopLine(this.activePlayer(), x, y);
            return this._gameWithBoard(board);
        } else {
            return null;
        }
    }

    markLeftLine(x, y) {
        if(this._hasPlayers() && !this.dotAt(x, y).leftLineMark()) {
            const board = this._board.markLeftLine(this.activePlayer(), x, y);
            return this._gameWithBoard(board);
        } else {
            return null;
        }
    }

    scores() {
        return this._scoreBoard.scores();
    }

    _hasPlayers() {
        return this._players.length > 0;
    }

    _gameWithPlayers(players) {
        return new Game(
            this._board,
            players,
            this._activePlayerIndex,
            new ScoreBoard(this._board, players)
        );
    }

    _gameWithBoard(board) {
        return new Game(
            board,
            this._players,
            this._nextActivePlayerIndex(),
            this._scoreBoard);
    }

    _nextActivePlayerIndex() {
        return (this._activePlayerIndex + 1) % this._players.length;
    }
}
