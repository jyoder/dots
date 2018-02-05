export default class Cell {
    constructor(topLeftDot, topRightDot, bottomLeftDot) {
        this._topLeftDot = topLeftDot;
        this._topRightDot = topRightDot;
        this._bottomLeftDot = bottomLeftDot;
    }

    owner() {
        if(this._sameOwner(
            this._topLeftDot.leftLineOwner(),
            this._topLeftDot.topLineOwner(),
            this._topRightDot.leftLineOwner(),
            this._bottomLeftDot.topLineOwner())) {
            return this._topLeftDot.leftLineOwner();
        } else {
            return null;
        }
    }

    _sameOwner(leftLineOwner, topLineOwner, rightLineOwner, bottomLineOwner) {
        return(
            leftLineOwner &&
            topLineOwner &&
            rightLineOwner &&
            bottomLineOwner &&
            leftLineOwner.playerId() === topLineOwner.playerId() &&
            leftLineOwner.playerId() === rightLineOwner.playerId() &&
            leftLineOwner.playerId() === bottomLineOwner.playerId()
        );
    }
}