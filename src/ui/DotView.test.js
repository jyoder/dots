import DotView from 'ui/DotView';
import Dot from 'state/Dot';
import Player from 'state/Player';

import React from 'react';
import { shallow } from 'enzyme';

test('DotView with a standard dot includes the standard class', () => {
    const dotView = shallow(<DotView dot={Dot.createStandard()}/>);
    expect(dotView.hasClass('DotView--standard')).toBeTruthy();
});

test('DotView with a bottom dot includes the bottom class', () => {
    const dotView = shallow(<DotView dot={Dot.createBottom()}/>);
    expect(dotView.hasClass('DotView--bottom')).toBeTruthy();
});

test('DotView with a right dot includes the right class', () => {
    const dotView = shallow(<DotView dot={Dot.createRight()}/>);
    expect(dotView.hasClass('DotView--right')).toBeTruthy();
});

test('DotView with a bottom right dot includes the bottom right class', () => {
    const dotView = shallow(<DotView dot={Dot.createBottomRight()}/>);
    expect(dotView.hasClass('DotView--bottomRight')).toBeTruthy();
});

test('DotView with a top line owned by player with index 1 has the corresponding color class', () => {
    const dotView = shallow(<DotView dot={Dot.createStandard().drawTopLine(new Player('1', 1, 'Nemo'))}/>);
    expect(dotView.hasClass('DotView--topOwnedByPlayer1')).toBeTruthy();
});

test('DotView with a top line owned by player with index 2 has the corresponding color class', () => {
    const dotView = shallow(<DotView dot={Dot.createStandard().drawTopLine(new Player('1', 2, 'Nemo'))}/>);
    expect(dotView.hasClass('DotView--topOwnedByPlayer2')).toBeTruthy();
});

test('DotView with a left line owned by player with index 1 has the corresponding color class', () => {
    const dotView = shallow(<DotView dot={Dot.createStandard().drawLeftLine(new Player('1', 1, 'Nemo'))}/>);
    expect(dotView.hasClass('DotView--leftOwnedByPlayer1')).toBeTruthy();
});

test('DotView with a left line owned by player with index 2 has the corresponding color class', () => {
    const dotView = shallow(<DotView dot={Dot.createStandard().drawLeftLine(new Player('1', 2, 'Nemo'))}/>);
    expect(dotView.hasClass('DotView--leftOwnedByPlayer2')).toBeTruthy();
});

test('DotView with a top and left lines owned by different players have the corresponding color classes', () => {
    const dot = Dot.createStandard()
        .drawLeftLine(new Player('1', 1, 'Nemo'))
        .drawTopLine(new Player('2', 2, 'Nermo'));

    const dotView = shallow(<DotView dot={dot}/>);
    expect(dotView.hasClass('DotView--leftOwnedByPlayer1')).toBeTruthy();
    expect(dotView.hasClass('DotView--topOwnedByPlayer2')).toBeTruthy();
});
