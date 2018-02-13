export default class DotClickHandler {
    constructor(dot, lineWidth, leftLineCallback, topLineCallback) {
        this._dot = dot;
        this._lineWidth = lineWidth;
        this._leftLineCallback = leftLineCallback;
        this._topLineCallback = topLineCallback;
    }

    handleClick(event) {
        const rect = event.target.getBoundingClientRect();
        if(this._clickedLeftLine(event)) {
            this._leftLineCallback();
        } else if(this._clickedTopLine(event)) {
            this._topLineCallback();
        }
    }

    _clickedLeftLine(event) {
        return(
            this._clickedLeftLineArea(event) &&
            !this._dot.isBottom() &&
            !this._dot.isBottomRight()
        );
    }

    _clickedTopLine(event) {
        return(
            this._clickedTopLineArea(event) &&
            !this._dot.isRight() &&
            !this._dot.isBottomRight()
        );
    }

    _clickedLeftLineArea(event) {
        return this._xCoordinate(event) <= this._lineWidth;
    }

    _clickedTopLineArea(event) {
        return this._yCoordinate(event) <= this._lineWidth;
    }

    _xCoordinate(event) {
        return event.clientX - event.target.getBoundingClientRect().left;
    }

    _yCoordinate(event) {
        return event.clientY - event.target.getBoundingClientRect().top;
    }
}
