import DotClickHandler from 'ui/DotClickHandler';
import Dot from 'state/Dot';

describe('handleClick', () => {
    test('invokes the left line callback when the left line is clicked just within the horizontal boundary', () => {
        const dot = Dot.createStandard();
        const leftLineCallback = jest.fn();
        const topLineCallback = jest.fn();
        const dotClickHandler = new DotClickHandler(dot, 10, leftLineCallback, topLineCallback);
        
        dotClickHandler.handleClick(_event(5, 5, 15, 50));
        expect(leftLineCallback).toHaveBeenCalledTimes(1);
        expect(topLineCallback).not.toHaveBeenCalled();
    });

    test('does not invoke the left line callback when the left line is clicked just outside the vertical boundary', () => {
        const dot = Dot.createStandard();
        const leftLineCallback = jest.fn();
        const topLineCallback = jest.fn();
        const dotClickHandler = new DotClickHandler(dot, 10, leftLineCallback, topLineCallback);
        
        dotClickHandler.handleClick(_event(5, 5, 16, 50));
        expect(leftLineCallback).not.toHaveBeenCalled();
        expect(topLineCallback).not.toHaveBeenCalled();
    });

    test('invokes the top line callback when the top line is clicked just within the vertical boundary', () => {
        const dot = Dot.createStandard();
        const leftLineCallback = jest.fn();
        const topLineCallback = jest.fn();
        const dotClickHandler = new DotClickHandler(dot, 10, leftLineCallback, topLineCallback);
        
        dotClickHandler.handleClick(_event(5, 5, 50, 15));
        expect(leftLineCallback).not.toHaveBeenCalled();
        expect(topLineCallback).toHaveBeenCalledTimes(1);
    });

    test('does not invoke the top line callback when the top line is clicked just outside the vertical boundary', () => {
        const dot = Dot.createStandard();
        const leftLineCallback = jest.fn();
        const topLineCallback = jest.fn();
        const dotClickHandler = new DotClickHandler(dot, 10, leftLineCallback, topLineCallback);
        
        dotClickHandler.handleClick(_event(5, 5, 50, 16));
        expect(leftLineCallback).not.toHaveBeenCalled();
        expect(topLineCallback).not.toHaveBeenCalled();
    });

    test('lets the left line take precedence over the top line', () => {
        const dot = Dot.createStandard();
        const leftLineCallback = jest.fn();
        const topLineCallback = jest.fn();
        const dotClickHandler = new DotClickHandler(dot, 10, leftLineCallback, topLineCallback);
        
        dotClickHandler.handleClick(_event(5, 5, 10, 10));
        expect(leftLineCallback).toHaveBeenCalledTimes(1);
        expect(topLineCallback).not.toHaveBeenCalled();
    });

    test('accepts a top line click for a bottom dot', () => {
        const dot = Dot.createBottom();
        const leftLineCallback = jest.fn();
        const topLineCallback = jest.fn();
        const dotClickHandler = new DotClickHandler(dot, 10, leftLineCallback, topLineCallback);
        
        dotClickHandler.handleClick(_event(5, 5, 50, 10));
        expect(leftLineCallback).not.toHaveBeenCalled();
        expect(topLineCallback).toHaveBeenCalledTimes(1);
    });

    test('ignores a left line click for a bottom dot', () => {
        const dot = Dot.createBottom();
        const leftLineCallback = jest.fn();
        const topLineCallback = jest.fn();
        const dotClickHandler = new DotClickHandler(dot, 10, leftLineCallback, topLineCallback);
        
        dotClickHandler.handleClick(_event(5, 5, 10, 50));
        expect(leftLineCallback).not.toHaveBeenCalled();
        expect(topLineCallback).not.toHaveBeenCalled();
    });

    test('accepts a left line click for a right dot', () => {
        const dot = Dot.createRight();
        const leftLineCallback = jest.fn();
        const topLineCallback = jest.fn();
        const dotClickHandler = new DotClickHandler(dot, 10, leftLineCallback, topLineCallback);
        
        dotClickHandler.handleClick(_event(5, 5, 10, 50));
        expect(leftLineCallback).toHaveBeenCalledTimes(1);
        expect(topLineCallback).not.toHaveBeenCalled();
    });

    test('ignores a top line click for a right dot', () => {
        const dot = Dot.createRight();
        const leftLineCallback = jest.fn();
        const topLineCallback = jest.fn();
        const dotClickHandler = new DotClickHandler(dot, 10, leftLineCallback, topLineCallback);
        
        dotClickHandler.handleClick(_event(5, 5, 50, 10));
        expect(leftLineCallback).not.toHaveBeenCalled();
        expect(topLineCallback).not.toHaveBeenCalled();
    });

    test('ignores a left line click for a bottom right dot', () => {
        const dot = Dot.createBottomRight();
        const leftLineCallback = jest.fn();
        const topLineCallback = jest.fn();
        const dotClickHandler = new DotClickHandler(dot, 10, leftLineCallback, topLineCallback);
        
        dotClickHandler.handleClick(_event(5, 5, 10, 50));
        expect(leftLineCallback).not.toHaveBeenCalled();
        expect(topLineCallback).not.toHaveBeenCalled();
    });

    test('ignores a top line click for a bottom right dot', () => {
        const dot = Dot.createBottomRight();
        const leftLineCallback = jest.fn();
        const topLineCallback = jest.fn();
        const dotClickHandler = new DotClickHandler(dot, 10, leftLineCallback, topLineCallback);
        
        dotClickHandler.handleClick(_event(5, 5, 50, 10));
        expect(leftLineCallback).not.toHaveBeenCalled();
        expect(topLineCallback).not.toHaveBeenCalled();
    });

    function _event(posX, posY, clickX, clickY) {
        return {
            target: {
                getBoundingClientRect: () => _position(posX, posY)
            },
            clientX: clickX,
            clientY: clickY,
        };
    }

    function _position(x, y) {
        return {
            left: x,
            top: y
        };
    }
});
