export default class ScoreBoard {
    constructor(board, players) {
        this._board = board;
        this._players = players;
    }

    scores() {
        const scoreMap = this._zeroScores();
        for(let y = 0; y < this._board.height(); y++) {
            for(let x = 0; x < this._board.width(); x++) {
                const owner = this._board.ownerAt(x, y);
                if(owner) {
                    scoreMap.set(owner, scoreMap.get(owner) + 1);
                }
            }
        }
        return scoreMap;
    }

    _zeroScores() {
        return new Map(this._players.map((player) => [player, 0]));
    }
}