import Dot from 'state/Dot';

describe('createStandard', () => {
    it('creates a dot with standard type', () => {
        const dot = Dot.createStandard();

        expect(dot.type()).toBe('standard');
        expect(dot.topLineMarker()).toBeNull();
        expect(dot.leftLineMarker()).toBeNull();
    });
});

describe('createBottom', () => {
    it('creates a dot with bottom type', () => {
        const dot = Dot.createBottom();

        expect(dot.type()).toBe('bottom');
        expect(dot.topLineMarker()).toBeNull();
        expect(dot.leftLineMarker()).toBeNull();
    });
});

describe('createRight', () => {
    it('creates a dot with right type', () => {
        const dot = Dot.createRight();

        expect(dot.type()).toBe('right');
        expect(dot.topLineMarker()).toBeNull();
        expect(dot.leftLineMarker()).toBeNull();
    });
});

describe('createBottomRight', () => {
    it('creates a dot with bottomRight type', () => {
        const dot = Dot.createBottomRight();

        expect(dot.type()).toBe('bottomRight');
        expect(dot.topLineMarker()).toBeNull();
        expect(dot.leftLineMarker()).toBeNull();
    });
});

describe('constructor', () => {
    it('initializes properties', () => {
        const dot = new Dot('standard', 1, 2);

        expect(dot.type()).toBe('standard');
        expect(dot.topLineMarker()).toBe(1);
        expect(dot.leftLineMarker()).toBe(2);
    });
});

describe('isBottom', () => {
    it('returns whether it is a bottom dot', () => {
        const dot = Dot.createBottom();
    
        expect(dot.isStandard()).toBe(false);
        expect(dot.isBottom()).toBe(true);
        expect(dot.isRight()).toBe(false);
        expect(dot.isBottomRight()).toBe(false);
    });
});

describe('isRight', () => {
    it('returns whether it is a right dot', () => {
        const dot = Dot.createRight();
    
        expect(dot.isStandard()).toBe(false);
        expect(dot.isBottom()).toBe(false);
        expect(dot.isRight()).toBe(true);
        expect(dot.isBottomRight()).toBe(false);
    });
});

describe('isBottomRight', () => {
    it('returns whether it is a bottom right dot', () => {
        const dot = Dot.createBottomRight();

        expect(dot.isStandard()).toBe(false);
        expect(dot.isBottom()).toBe(false);
        expect(dot.isRight()).toBe(false);
        expect(dot.isBottomRight()).toBe(true);
    });
});

describe('markTopLine', () => {
    it('returns a new dot with the specified top line marker', () => {
        const dot1 = Dot.createStandard();

        const dot2 = dot1.markTopLine(1);
        expect(dot2.topLineMarker()).toBe(1);
        expect(dot2.leftLineMarker()).toBeNull();
    });

    it('does not modify the current dot', () => {
        const dot = Dot.createStandard();
    
        dot.markTopLine(1);
        expect(dot.topLineMarker()).toBeNull();
    });
});

describe('markLeftLine', () => {
    it('returns a new dot with the specified left line marker', () => {
        const dot1 = Dot.createStandard();

        const dot2 = dot1.markLeftLine(1);
        expect(dot2.leftLineMarker()).toBe(1);
        expect(dot2.topLineMarker()).toBeNull();
    });

    it('does not modify the current dot', () => {
        const dot = Dot.createStandard();
    
        dot.markLeftLine(1);
        expect(dot.leftLineMarker()).toBeNull();
    });
});

describe('isComplete', () => {
    it('returns true if the type is standard and both the top and left lines have markers', () => {
        const dot = Dot.createStandard().markTopLine(1).markLeftLine(2);
        expect(dot.isComplete()).toBe(true);
    });

    it('returns false if the type is standard and the top line has no marker', () => {
        const dot = Dot.createStandard().markLeftLine(2);
        expect(dot.isComplete()).toBe(false);
    });

    it('returns false if the type is standard and the left line has no marker', () => {
        const dot = Dot.createStandard().markTopLine(1);
        expect(dot.isComplete()).toBe(false);
    });

    it('returns false if the type is standard and the top and left lines have no marker', () => {
        const dot = Dot.createStandard();
        expect(dot.isComplete()).toBe(false);
    });

    it('returns true if the type is bottom and the left line has an marker', () => {
        const dot = Dot.createBottom().markLeftLine(1);
        expect(dot.isComplete()).toBe(true);
    });

    it('returns false if the type is bottom and the left line has no marker', () => {
        const dot = Dot.createBottom();
        expect(dot.isComplete()).toBe(false);
    });

    it('returns true if the type is right and the top line has an marker', () => {
        const dot = Dot.createRight().markTopLine(1);
        expect(dot.isComplete()).toBe(true);
    });

    it('returns false if the type is right and the top line has no marker', () => {
        const dot = Dot.createRight();
        expect(dot.isComplete()).toBe(false);
    });

    it('returns true if the type is bottom right', () => {
        const dot = Dot.createBottomRight();
        expect(dot.isComplete()).toBe(true);
    });
});
