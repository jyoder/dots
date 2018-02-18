import PlayerSlug from 'ui/PlayerSlug';

import React from 'react';
import { shallow } from 'enzyme';

test('PlayerSlug includes the PlayerToken class', () => {
    const playerSlug = shallow(<PlayerSlug/>);
    expect(playerSlug.hasClass('PlayerToken')).toBeTruthy();
});
