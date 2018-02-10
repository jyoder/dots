const COLORS = [
    'orangered',
    'dodgerblue',
    'blueviolet',
    'lawngreen',
    'crimson',
    'coral',
    'darkgreen',
    'darkorange',
    'deeppink',
    'gold',
    'teal',
    'sienna',
    'olive',
    'cyan',
    'indigo',
    'darkslategrey',
    'peru',
    'magenta',
    'darkkhaki',
    'cadetblue',
    'midnightblue'
];

export default class ColorProvider {
    constructor() {
        this._nextColorIndex = 0;
    }

    nextColor() {
        const nextColorIndex = this._nextColorIndex;
        this._nextColorIndex++;
        return COLORS[nextColorIndex % COLORS.length];
    }
}
