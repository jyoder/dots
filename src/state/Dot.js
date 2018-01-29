const STANDARD_TYPE = 'standard';
const BOTTOM_TYPE = 'bottom';
const RIGHT_TYPE = 'right';
const BOTTOM_RIGHT_TYPE = 'bottomRight';

class Dot {
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

    constructor(type, topLineOwner, leftLineOwner) {
        this._type = type;
        this._topLineOwner = topLineOwner;
        this._leftLineOwner = leftLineOwner;
    }

    type() {
        return this._type;
    }

    topLineOwner() {
        return this._topLineOwner;
    }

    leftLineOwner() {
        return this._leftLineOwner;
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

    drawTopLine(owner) {
        return new Dot(this._type, owner, this._leftLineOwner);
    }

    drawLeftLine(owner) {
        return new Dot(this._type, this._topLineOwner, owner);
    }

    isComplete() {
        return(
            (this.isStandard() && this._topLineOwner !== null && this._leftLineOwner !== null) ||
            (this.isBottom() && this._leftLineOwner !== null) ||
            (this.isRight() && this._topLineOwner !== null) ||
            (this.isBottomRight())
        );
    }
}

export default Dot;