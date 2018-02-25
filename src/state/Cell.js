export default class Cell {
    constructor(topLeftDot, topRightDot, bottomLeftDot) {
        this._topLeftDot = topLeftDot;
        this._topRightDot = topRightDot;
        this._bottomLeftDot = bottomLeftDot;
    }

    owner() {
        const marks = this._marks();
        return marks.length === 4 ? this._lastMark(marks).player() : null;
    }

    _marks() {
        return [
            this._topLeftDot.leftLineMark(),
            this._topLeftDot.topLineMark(),
            this._topRightDot.leftLineMark(),
            this._bottomLeftDot.topLineMark()
        ].filter((mark) => mark !== null);
    }

    _lastMark(marks) {
        return marks.reduce((mark1, mark2) => {
            return (mark1.markId() > mark2.markId()) ? mark1 : mark2;
        });
    }
}