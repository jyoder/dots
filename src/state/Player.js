export default class Player {
    constructor(playerId, playerIndex, playerName, color) {
        this._playerId = playerId;
        this._playerIndex = playerIndex;
        this._playerName = playerName;
        this._color = color;
    }

    playerId() {
        return this._playerId;
    }

    playerIndex() {
        return this._playerIndex;
    }

    playerName() {
        return this._playerName;
    }

    color() {
        return this._color;
    }
}
