import JoinUrlField from 'ui/lobby/JoinUrlField';
import React from 'react';
import { shallow } from 'enzyme';
import { Input, Button, Tooltip } from 'reactstrap';

it('includes the given URL in the input field', () => {
    const joinUrlField = shallow(<JoinUrlField url={'http://hi.com'}/>);
    expect(joinUrlField.find(Input).props().value).toBe('http://hi.com');
});

it('displays the correct tooltip content when the mouse is over the copy button', () => {
    const joinUrlField = shallow(<JoinUrlField url={'http://hi.com'}/>);
    
    joinUrlField.find(Button).simulate('mouseOver');
    expect(joinUrlField.find(Tooltip).prop('children')).toBe('Copy to clipboard');
});

it('displays the correct tooltip content when the copy button is clicked', () => {
    const joinUrlField = shallow(<JoinUrlField url={'http://hi.com'}/>);
    
    joinUrlField.find(Button).simulate('click', {});
    expect(joinUrlField.find(Tooltip).prop('children')).toBe('Copied!');
});
