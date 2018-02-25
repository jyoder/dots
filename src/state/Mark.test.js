import Mark from 'state/Mark';

describe('markId', () => {
    it('returns the mark id', () => {
        const mark = new Mark(4, 'player');
        expect(mark.markId()).toBe(4);
    });
});

describe('player', () => {
    it('returns the player', () => {
        const mark = new Mark(4, 'player');
        expect(mark.player()).toBe('player');
    });
});
