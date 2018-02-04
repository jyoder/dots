import Dot from 'state/Dot';

export default class Board {
    static create(width, height) {
        return new Board(
            this._mapWithIndex(Array(height).fill(), (y) => {
                return this._mapWithIndex(Array(width).fill(), (x) => {
                    return this._createDot(x === width - 1, y === height - 1);
                });
            })
        );
    }

    static _mapWithIndex(array, func) {
        let i = 0;
        return array.map(() => {
            let res = func(i);
            i++;

            return res;
        });
    }

    static _createDot(isRight, isBottom) {
        if(isRight && isBottom) {
            return Dot.createBottomRight();
        } else if(isRight) {
            return Dot.createRight();
        } else if(isBottom) {
            return Dot.createBottom();
        } else {
            return Dot.createStandard();
        }
    }

    constructor(dots) {
        this._dots = dots;
    }

    width() {
        return this._dots[0].length
    }

    height() {
        return this._dots.length;
    }

    dotAt(x, y) {
        return this._dots[y][x];
    }

    drawTopLine(player, x, y) {
        return this._replaceDot(this._dots[y][x].drawTopLine(player), x, y);
    }

    drawLeftLine(player, x, y) {
        return this._replaceDot(this._dots[y][x].drawLeftLine(player), x, y);
    }

    _replaceDot(dot, x, y) {
        const dots = this._copy(this._dots);
        dots[y][x] = dot; 
        return new Board(dots);
    }

    _copy(dots) {
        return dots.map((row) => Array.from(row));
    }
}
