class Player {
    constructor(playerId, playerName, color) {
        this._playerId = playerId;
        this._playerName = playerName;
        this._color = color;
    }

    playerId() {
        return this._playerId;
    }

    playerName() {
        return this._playerName;
    }

    color() {
        return this._color;
    }
}

export default Player;
