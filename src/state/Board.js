import Dot from 'state/Dot';
import Cell from 'state/Cell';
import Mark from 'state/Mark';

export default class Board {
    static create(width, height) {
        return new Board(
            0,
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

    constructor(boardId, dots) {
        this._boardId = boardId;
        this._dots = dots;
    }

    boardId() {
        return this._boardId;
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

    ownerAt(x, y) {
        if(x < this.width() - 1 && y < this.height() - 1) {
            return (new Cell(this.dotAt(x, y), this.dotAt(x + 1, y), this.dotAt(x, y + 1))).owner();
        } else {
            return null;
        }
    }

    markTopLine(player, x, y) {
        return this._replaceDot(this._dots[y][x].markTopLine(this._mark(player)), x, y);
    }

    markLeftLine(player, x, y) {
        return this._replaceDot(this._dots[y][x].markLeftLine(this._mark(player)), x, y);
    }

    _mark(player) {
        return new Mark(this._boardId, player);
    }

    _replaceDot(dot, x, y) {
        const dots = this._copy(this._dots);
        dots[y][x] = dot; 
        return new Board(this._boardId + 1, dots);
    }

    _copy(dots) {
        return dots.map((row) => Array.from(row));
    }
}
