import PlayerSlug from 'ui/game/PlayerTokenSlug';

import React from 'react';
import { shallow } from 'enzyme';

test('PlayerTokenSlug includes the PlayerToken class', () => {
    const playerSlug = shallow(<PlayerSlug/>);
    expect(playerSlug.hasClass('PlayerToken')).toBeTruthy();
});
