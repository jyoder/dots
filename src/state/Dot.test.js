import Dot from 'state/Dot';

test('createStandard creates a dot with standard type', () => {
    const dot = Dot.createStandard();

    expect(dot.type()).toBe('standard');
    expect(dot.topLineOwner()).toBeNull();
    expect(dot.leftLineOwner()).toBeNull();
});

test('createBottom creates a dot with bottom type', () => {
    const dot = Dot.createBottom();

    expect(dot.type()).toBe('bottom');
    expect(dot.topLineOwner()).toBeNull();
    expect(dot.leftLineOwner()).toBeNull();
});

test('createRight creates a dot with right type', () => {
    const dot = Dot.createRight();

    expect(dot.type()).toBe('right');
    expect(dot.topLineOwner()).toBeNull();
    expect(dot.leftLineOwner()).toBeNull();
});

test('createBottomRight creates a dot with bottomRight type', () => {
    const dot = Dot.createBottomRight();

    expect(dot.type()).toBe('bottomRight');
    expect(dot.topLineOwner()).toBeNull();
    expect(dot.leftLineOwner()).toBeNull();
});

test('constructor initializes properties', () => {
    const dot = new Dot('standard', 1, 2);

    expect(dot.type()).toBe('standard');
    expect(dot.topLineOwner()).toBe(1);
    expect(dot.leftLineOwner()).toBe(2);
});

test('isBottom returns whether it is a bottom dot', () => {
    const dot = Dot.createBottom();
    
    expect(dot.isStandard()).toBe(false);
    expect(dot.isBottom()).toBe(true);
    expect(dot.isRight()).toBe(false);
    expect(dot.isBottomRight()).toBe(false);
});

test('isRight returns whether it is a right dot', () => {
    const dot = Dot.createRight();
    
    expect(dot.isStandard()).toBe(false);
    expect(dot.isBottom()).toBe(false);
    expect(dot.isRight()).toBe(true);
    expect(dot.isBottomRight()).toBe(false);
});

test('isBottomRight returns whether it is a bottom right dot', () => {
    const dot = Dot.createBottomRight();

    expect(dot.isStandard()).toBe(false);
    expect(dot.isBottom()).toBe(false);
    expect(dot.isRight()).toBe(false);
    expect(dot.isBottomRight()).toBe(true);
});

test('drawTopLine returns a new dot with the specified top line owner', () => {
    const dot1 = Dot.createStandard();

    const dot2 = dot1.drawTopLine(1);
    expect(dot2.topLineOwner()).toBe(1);
    expect(dot2.leftLineOwner()).toBeNull();
});

test('drawTopLine does not modify the current dot', () => {
    const dot = Dot.createStandard();
    
    dot.drawTopLine(1);
    expect(dot.topLineOwner()).toBeNull();
});

test('drawLeftLine returns a new dot with the specified left line owner', () => {
    const dot1 = Dot.createStandard();

    const dot2 = dot1.drawLeftLine(1);
    expect(dot2.leftLineOwner()).toBe(1);
    expect(dot2.topLineOwner()).toBeNull();
});

test('drawLeftLine does not modify the current dot', () => {
    const dot = Dot.createStandard();
    
    dot.drawLeftLine(1);
    expect(dot.leftLineOwner()).toBeNull();
});

test('isComplete returns true if the type is standard and both the top and left lines have owners', () => {
    const dot = Dot.createStandard().drawTopLine(1).drawLeftLine(2);
    expect(dot.isComplete()).toBe(true);
});

test('isComplete returns false if the type is standard and the top line has no owner', () => {
    const dot = Dot.createStandard().drawLeftLine(2);
    expect(dot.isComplete()).toBe(false);
});

test('isComplete returns false if the type is standard and the left line has no owner', () => {
    const dot = Dot.createStandard().drawTopLine(1);
    expect(dot.isComplete()).toBe(false);
});

test('isComplete returns false if the type is standard and the top and left lines have no owner', () => {
    const dot = Dot.createStandard();
    expect(dot.isComplete()).toBe(false);
});

test('isComplete returns true if the type is bottom and the left line has an owner', () => {
    const dot = Dot.createBottom().drawLeftLine(1);
    expect(dot.isComplete()).toBe(true);
});

test('isComplete returns false if the type is bottom and the left line has no owner', () => {
    const dot = Dot.createBottom();
    expect(dot.isComplete()).toBe(false);
});

test('isComplete returns true if the type is right and the top line has an owner', () => {
    const dot = Dot.createRight().drawTopLine(1);
    expect(dot.isComplete()).toBe(true);
});

test('isComplete returns false if the type is right and the top line has no owner', () => {
    const dot = Dot.createRight();
    expect(dot.isComplete()).toBe(false);
});

test('isComplete returns true if the type is bottom right', () => {
    const dot = Dot.createBottomRight();
    expect(dot.isComplete()).toBe(true);
});
