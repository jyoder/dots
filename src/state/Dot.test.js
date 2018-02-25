import Dot from 'state/Dot';

describe('createStandard', () => {
    it('creates a dot with standard type', () => {
        const dot = Dot.createStandard();

        expect(dot.type()).toBe('standard');
        expect(dot.topLineMark()).toBeNull();
        expect(dot.leftLineMark()).toBeNull();
    });
});

describe('createBottom', () => {
    it('creates a dot with bottom type', () => {
        const dot = Dot.createBottom();

        expect(dot.type()).toBe('bottom');
        expect(dot.topLineMark()).toBeNull();
        expect(dot.leftLineMark()).toBeNull();
    });
});

describe('createRight', () => {
    it('creates a dot with right type', () => {
        const dot = Dot.createRight();

        expect(dot.type()).toBe('right');
        expect(dot.topLineMark()).toBeNull();
        expect(dot.leftLineMark()).toBeNull();
    });
});

describe('createBottomRight', () => {
    it('creates a dot with bottomRight type', () => {
        const dot = Dot.createBottomRight();

        expect(dot.type()).toBe('bottomRight');
        expect(dot.topLineMark()).toBeNull();
        expect(dot.leftLineMark()).toBeNull();
    });
});

describe('constructor', () => {
    it('initializes properties', () => {
        const dot = new Dot('standard', 1, 2);

        expect(dot.type()).toBe('standard');
        expect(dot.topLineMark()).toBe(1);
        expect(dot.leftLineMark()).toBe(2);
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
    it('returns a new dot with the specified top line mark', () => {
        const dot1 = Dot.createStandard();

        const dot2 = dot1.markTopLine(1);
        expect(dot2.topLineMark()).toBe(1);
        expect(dot2.leftLineMark()).toBeNull();
    });

    it('does not modify the current dot', () => {
        const dot = Dot.createStandard();
    
        dot.markTopLine(1);
        expect(dot.topLineMark()).toBeNull();
    });
});

describe('markLeftLine', () => {
    it('returns a new dot with the specified left line mark', () => {
        const dot1 = Dot.createStandard();

        const dot2 = dot1.markLeftLine(1);
        expect(dot2.leftLineMark()).toBe(1);
        expect(dot2.topLineMark()).toBeNull();
    });

    it('does not modify the current dot', () => {
        const dot = Dot.createStandard();
    
        dot.markLeftLine(1);
        expect(dot.leftLineMark()).toBeNull();
    });
});

describe('isComplete', () => {
    it('returns true if the type is standard and both the top and left lines have marks', () => {
        const dot = Dot.createStandard().markTopLine(1).markLeftLine(2);
        expect(dot.isComplete()).toBe(true);
    });

    it('returns false if the type is standard and the top line has no mark', () => {
        const dot = Dot.createStandard().markLeftLine(2);
        expect(dot.isComplete()).toBe(false);
    });

    it('returns false if the type is standard and the left line has no mark', () => {
        const dot = Dot.createStandard().markTopLine(1);
        expect(dot.isComplete()).toBe(false);
    });

    it('returns false if the type is standard and the top and left lines have no mark', () => {
        const dot = Dot.createStandard();
        expect(dot.isComplete()).toBe(false);
    });

    it('returns true if the type is bottom and the left line has an mark', () => {
        const dot = Dot.createBottom().markLeftLine(1);
        expect(dot.isComplete()).toBe(true);
    });

    it('returns false if the type is bottom and the left line has no mark', () => {
        const dot = Dot.createBottom();
        expect(dot.isComplete()).toBe(false);
    });

    it('returns true if the type is right and the top line has an mark', () => {
        const dot = Dot.createRight().markTopLine(1);
        expect(dot.isComplete()).toBe(true);
    });

    it('returns false if the type is right and the top line has no mark', () => {
        const dot = Dot.createRight();
        expect(dot.isComplete()).toBe(false);
    });

    it('returns true if the type is bottom right', () => {
        const dot = Dot.createBottomRight();
        expect(dot.isComplete()).toBe(true);
    });
});

test('actions preserve all attributes in resulting dot', () => {
    let dot = Dot.createStandard()
        .markLeftLine(2)
        .markTopLine(3);

    dot = dot.markLeftLine(2);
    expect(dot.leftLineMark()).toBe(2);
    expect(dot.topLineMark()).toBe(3);

    dot = dot.markTopLine(3);
    expect(dot.leftLineMark()).toBe(2);
    expect(dot.topLineMark()).toBe(3);
});
