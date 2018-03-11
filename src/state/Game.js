import Board from 'state/Board';
import ScoreBoard from 'state/ScoreBoard';
import Player from 'state/Player';

const MIN_PLAYERS = 2;

export default class Game {
    static create(width, height) {
        const board = Board.create(width, height);
        return new Game(board, [], false, 0, new ScoreBoard(board, []));
    }

    constructor(board, players, started, activePlayerIndex, scoreBoard) {
        this._board = board;
        this._players = players;
        this._started = started;
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

    started() {
        return this._started;
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
        if(!this._hasPlayer(id)) {
            players.push(new Player(id, this._players.length + 1, name));
        }
        return this._gameWithPlayers(players);
    }

    start() {
        if(!this._started && this._players.length >= MIN_PLAYERS) {
            return new Game(
                this._board,
                this._players,
                true,
                this._activePlayerIndex,
                this._scoreBoard
            );
        } else {
            return null;
        }
    }

    markTopLine(x, y) {
        if(this._started && !this.dotAt(x, y).topLineMark()) {
            const board = this._board.markTopLine(this.activePlayer(), x, y);
            return this._gameWithBoard(board);
        } else {
            return null;
        }
    }

    markLeftLine(x, y) {
        if(this._started && !this.dotAt(x, y).leftLineMark()) {
            const board = this._board.markLeftLine(this.activePlayer(), x, y);
            return this._gameWithBoard(board);
        } else {
            return null;
        }
    }

    scores() {
        return this._scoreBoard.scores();
    }

    _hasPlayer(playerId) {
        return this._players.find((player) => player.playerId() === playerId);
    }

    _hasPlayers() {
        return this._players.length > 0;
    }

    _gameWithPlayers(players) {
        return new Game(
            this._board,
            players,
            this._started,
            this._activePlayerIndex,
            new ScoreBoard(this._board, players)
        );
    }

    _gameWithBoard(board) {
        return new Game(
            board,
            this._players,
            this._started,
            this._nextActivePlayerIndex(),
            new ScoreBoard(board, this._players)
        );
    }

    _nextActivePlayerIndex() {
        return (this._activePlayerIndex + 1) % this._players.length;
    }
}
