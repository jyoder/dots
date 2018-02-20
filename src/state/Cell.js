export default class Cell {
    constructor(topLeftDot, topRightDot, bottomLeftDot) {
        this._topLeftDot = topLeftDot;
        this._topRightDot = topRightDot;
        this._bottomLeftDot = bottomLeftDot;
    }

    owner() {
        if(this._sameMarker(
            this._topLeftDot.leftLineMarker(),
            this._topLeftDot.topLineMarker(),
            this._topRightDot.leftLineMarker(),
            this._bottomLeftDot.topLineMarker())) {
            return this._topLeftDot.leftLineMarker();
        } else {
            return null;
        }
    }

    _sameMarker(leftLineMarker, topLineMarker, rightLineMarker, bottomLineMarker) {
        return(
            leftLineMarker &&
            topLineMarker &&
            rightLineMarker &&
            bottomLineMarker &&
            leftLineMarker.playerId() === topLineMarker.playerId() &&
            leftLineMarker.playerId() === rightLineMarker.playerId() &&
            leftLineMarker.playerId() === bottomLineMarker.playerId()
        );
    }
}