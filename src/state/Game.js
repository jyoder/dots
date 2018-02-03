export default class Game {
    constructor(board, players, activePlayerIndex) {
        this._board = board;
        this._players = players;
        this._activePlayerIndex = activePlayerIndex;
    }

    width() {
        return this._board.width();
    }

    height() {
        return this._board.height();
    }

    activePlayer() {
        return this._players[this._activePlayerIndex];
    }

    drawTopLine(x, y) {
        const board = this._board.drawTopLine(this.activePlayer(), x, y);
        return this._nextGameState(board);
    }

    drawLeftLine(x, y) {
        const board = this._board.drawLeftLine(this.activePlayer(), x, y);
        return this._nextGameState(board);
    }

    _nextGameState(board) {
        return new Game(board, this._players, this._nextActivePlayerIndex());
    }

    _nextActivePlayerIndex() {
        return (this._activePlayerIndex + 1) % this._players.length;
    }
}
