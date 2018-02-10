import ColorProvider from 'state/ColorProvider';

describe('nextColor', () => {
    test('returns colors in the correct order', () => {
        const colorProvider = new ColorProvider();
        expect(colorProvider.nextColor()).toEqual('orangered');
        expect(colorProvider.nextColor()).toEqual('dodgerblue');
        expect(colorProvider.nextColor()).toEqual('blueviolet');
        expect(colorProvider.nextColor()).toEqual('lawngreen');
        expect(colorProvider.nextColor()).toEqual('crimson');
        expect(colorProvider.nextColor()).toEqual('coral');
        expect(colorProvider.nextColor()).toEqual('darkgreen');
        expect(colorProvider.nextColor()).toEqual('darkorange');
        expect(colorProvider.nextColor()).toEqual('deeppink');
        expect(colorProvider.nextColor()).toEqual('gold');
        expect(colorProvider.nextColor()).toEqual('teal');
        expect(colorProvider.nextColor()).toEqual('sienna');
        expect(colorProvider.nextColor()).toEqual('olive');
        expect(colorProvider.nextColor()).toEqual('cyan');
        expect(colorProvider.nextColor()).toEqual('indigo');
        expect(colorProvider.nextColor()).toEqual('darkslategrey');
        expect(colorProvider.nextColor()).toEqual('peru');
        expect(colorProvider.nextColor()).toEqual('magenta');
        expect(colorProvider.nextColor()).toEqual('darkkhaki');
        expect(colorProvider.nextColor()).toEqual('cadetblue');
        expect(colorProvider.nextColor()).toEqual('midnightblue');
    });

    test('wraps around to the first color when the color set is exhausted', () => {
        const colorProvider = new ColorProvider();
        expect(colorProvider.nextColor()).toEqual('orangered');

        for(let i = 0; i < 20; i++) {
            colorProvider.nextColor();
        }
        expect(colorProvider.nextColor()).toEqual('orangered');
    });
});
