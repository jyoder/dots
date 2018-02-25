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

    constructor(type, topLineMark, leftLineMark) {
        this._type = type;
        this._topLineMark = topLineMark;
        this._leftLineMark = leftLineMark;
    }

    type() {
        return this._type;
    }

    topLineMark() {
        return this._topLineMark;
    }

    leftLineMark() {
        return this._leftLineMark;
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

    markTopLine(mark) {
        return new Dot(this._type, mark, this._leftLineMark);
    }

    markLeftLine(mark) {
        return new Dot(this._type, this._topLineMark, mark);
    }

    isComplete() {
        return(
            (this.isStandard() && this._topLineMark !== null && this._leftLineMark !== null) ||
            (this.isBottom() && this._leftLineMark !== null) ||
            (this.isRight() && this._topLineMark !== null) ||
            (this.isBottomRight())
        );
    }
}
