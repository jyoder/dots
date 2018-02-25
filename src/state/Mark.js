export default class Mark {    
    constructor(markId, player) {
        this._markId = markId;
        this._player = player;
    }

    markId() {
        return this._markId;
    }

    player() {
        return this._player;
    }
}
