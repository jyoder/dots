import DotView from 'ui/DotView';
import Dot from 'state/Dot';

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
