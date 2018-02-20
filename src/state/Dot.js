const STANDARD_TYPE = 'standard';
const BOTTOM_TYPE = 'bottom';
const RIGHT_TYPE = 'right';
const BOTTOM_RIGHT_TYPE = 'bottomRight';

export default class Dot {
    static createStandard() {
        return new Dot('standard', null, null);
    }

    static createBottom() {
        return new Dot('bottom', null, null);
    }

    static createRight() {
        return new Dot('right', null, null);
    }

    static createBottomRight() {
        return new Dot('bottomRight', null, null);
    }

    constructor(type, topLineMarker, leftLineMarker) {
        this._type = type;
        this._topLineMarker = topLineMarker;
        this._leftLineMarker = leftLineMarker;
    }

    type() {
        return this._type;
    }

    topLineMarker() {
        return this._topLineMarker;
    }

    leftLineMarker() {
        return this._leftLineMarker;
    }

    isStandard() {
        return this._type === STANDARD_TYPE;
    }

    isBottom() {
        return this._type === BOTTOM_TYPE;
    }

    isRight() {
        return this._type === RIGHT_TYPE;
    }

    isBottomRight() {
        return this._type === BOTTOM_RIGHT_TYPE;
    }

    markTopLine(owner) {
        return new Dot(this._type, owner, this._leftLineMarker);
    }

    markLeftLine(owner) {
        return new Dot(this._type, this._topLineMarker, owner);
    }

    isComplete() {
        return(
            (this.isStandard() && this._topLineMarker !== null && this._leftLineMarker !== null) ||
            (this.isBottom() && this._leftLineMarker !== null) ||
            (this.isRight() && this._topLineMarker !== null) ||
            (this.isBottomRight())
        );
    }
}
