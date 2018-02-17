export default class Player {
    constructor(playerId, playerIndex, playerName) {
        this._playerId = playerId;
        this._playerIndex = playerIndex;
        this._playerName = playerName;
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
}
