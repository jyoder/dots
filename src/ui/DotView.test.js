import DotView from 'ui/DotView';
import PlayerTokenSlug from 'ui/PlayerTokenSlug';

import Dot from 'state/Dot';
import Player from 'state/Player';

import React from 'react';
import { shallow } from 'enzyme';

test('DotView with a standard dot includes the standard class', () => {
    const dotView = shallow(<DotView dot={Dot.createStandard()} dotClickHandler={{}}/>);
    expect(dotView.hasClass('DotView--standard')).toBeTruthy();
});

test('DotView with a bottom dot includes the bottom class', () => {
    const dotView = shallow(<DotView dot={Dot.createBottom()} dotClickHandler={{}}/>);
    expect(dotView.hasClass('DotView--bottom')).toBeTruthy();
});

test('DotView with a right dot includes the right class', () => {
    const dotView = shallow(<DotView dot={Dot.createRight()} dotClickHandler={{}}/>);
    expect(dotView.hasClass('DotView--right')).toBeTruthy();
});

test('DotView with a bottom right dot includes the bottom right class', () => {
    const dotView = shallow(<DotView dot={Dot.createBottomRight()} dotClickHandler={{}}/>);
    expect(dotView.hasClass('DotView--bottomRight')).toBeTruthy();
});

test('DotView with a top line owned by player with index 1 has the corresponding color class', () => {
    const dot = Dot.createStandard().drawTopLine(new Player('1', 1, 'Nemo'));
    const dotView = shallow(<DotView dot={dot} dotClickHandler={{}}/>);
    expect(dotView.hasClass('DotView--topMarkedByPlayer1')).toBeTruthy();
});

test('DotView with a top line owned by player with index 2 has the corresponding color class', () => {
    const dot = Dot.createStandard().drawTopLine(new Player('1', 2, 'Nemo'));
    const dotView = shallow(<DotView dot={dot} dotClickHandler={{}}/>);
    expect(dotView.hasClass('DotView--topMarkedByPlayer2')).toBeTruthy();
});

test('DotView with a left line owned by player with index 1 has the corresponding color class', () => {
    const dot = Dot.createStandard().drawLeftLine(new Player('1', 1, 'Nemo'));
    const dotView = shallow(<DotView dot={dot} dotClickHandler={{}}/>);
    expect(dotView.hasClass('DotView--leftMarkedByPlayer1')).toBeTruthy();
});

test('DotView with a left line owned by player with index 2 has the corresponding color class', () => {
    const dot = Dot.createStandard().drawLeftLine(new Player('1', 2, 'Nemo'));
    const dotView = shallow(<DotView dot={dot} dotClickHandler={{}}/>);
    expect(dotView.hasClass('DotView--leftMarkedByPlayer2')).toBeTruthy();
});

test('DotView with top and left lines owned by different players have their corresponding color classes', () => {
    const dot = Dot.createStandard()
        .drawLeftLine(new Player('1', 1, 'Nemo'))
        .drawTopLine(new Player('2', 2, 'Nermo'));

    const dotView = shallow(<DotView dot={dot} dotClickHandler={{}}/>);
    expect(dotView.hasClass('DotView--leftMarkedByPlayer1')).toBeTruthy();
    expect(dotView.hasClass('DotView--topMarkedByPlayer2')).toBeTruthy();
});

test('DotView invokes the click handler when clicked', () => {
    const dot = Dot.createStandard();
    const dotClickHandler = { handleClick: jest.fn() };
    const event = {};
    
    const dotView = shallow(<DotView dot={dot} dotClickHandler={dotClickHandler}/>);
    dotView.simulate('click', event);

    expect(dotClickHandler.handleClick).toHaveBeenCalledTimes(1);
    expect(dotClickHandler.handleClick).toHaveBeenCalledWith(event);
});

test('DotView renders a child element', () => {
    const dotView = shallow(
        <DotView dot={Dot.createStandard()} dotClickHandler={{}}>
            <PlayerTokenSlug/>
        </DotView>
    );
    expect(dotView.find(PlayerTokenSlug).length).toBe(1);
});