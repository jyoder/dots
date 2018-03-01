import NameInputField from 'ui/lobby/NameInputField';
import React from 'react';
import { Input, Button } from 'reactstrap';
import { shallow } from 'enzyme';

const RETURN_KEY = 13;

it('renders the submit button as disabled when no text has been entered', () => {
    const nameInputField = shallow(<NameInputField onNameSubmitted={() => {}}/>);
    expect(nameInputField.find(Button).prop('disabled')).toBeTruthy();
});

it('renders the submit button as enabled when text has been entered', () => {
    const nameInputField = shallow(<NameInputField onNameSubmitted={() => {}}/>);
    const preventDefault = jest.fn();

    nameInputField.find(Input).simulate('change', {
        preventDefault: preventDefault,
        target: { value: 'Cornelius Van Til' }
    });
    expect(nameInputField.find(Button).prop('disabled')).toBeFalsy();
    expect(preventDefault).toHaveBeenCalledTimes(1);
});

it('renders the submit button as disabled when text has been cleared', () => {
    const nameInputField = shallow(<NameInputField onNameSubmitted={() => {}}/>);
    
    nameInputField.find(Input).simulate('change', {
        preventDefault: jest.fn(),
        target: { value: 'Cornelius Van Til' }
    });
    nameInputField.find(Input).simulate('change', {
        preventDefault: jest.fn(),
        target: { value: '' }
    });
    expect(nameInputField.find(Button).prop('disabled')).toBeTruthy();
});

it('invokes the onNameSubmitted() callback when the submit button is clicked', () => {
    const onNameSubmitted = jest.fn();
    const nameInputField = shallow(<NameInputField onNameSubmitted={onNameSubmitted}/>);
    
    const preventDefault = jest.fn();
    nameInputField.find(Input).simulate('change', {
        preventDefault: jest.fn(),
        target: { value: 'Cornelius Van Til' }
    });
    nameInputField.find(Button).simulate('click', {
        preventDefault: preventDefault
    });
    expect(onNameSubmitted).toHaveBeenCalledWith('Cornelius Van Til');
});

it('invokes the onNameSubmitted() callback when the return key is pressed', () => {
    const onNameSubmitted = jest.fn();
    const nameInputField = shallow(<NameInputField onNameSubmitted={onNameSubmitted}/>);

    nameInputField.find(Input).simulate('change', {
        preventDefault: jest.fn(),
        target: { value: 'Cornelius Van Til' }
    });
    nameInputField.find(Input).simulate('keyPress', {
        preventDefault: jest.fn(),
        target: { value: 'Cornelius Van Til' },
        charCode: RETURN_KEY
    });
    expect(onNameSubmitted).toHaveBeenCalledWith('Cornelius Van Til');
});

it('does not invoke the onNameSubmitted() callback when a non-return key is pressed', () => {
    const onNameSubmitted = jest.fn();
    const nameInputField = shallow(<NameInputField onNameSubmitted={onNameSubmitted}/>);

    nameInputField.find(Input).simulate('change', {
        preventDefault: jest.fn(),
        target: { value: 'Cornelius Van Til' }
    });
    nameInputField.find(Input).simulate('keyPress', {
        preventDefault: jest.fn(),
        target: { value: 'Cornelius Van Til' },
        charCode: RETURN_KEY + 1
    });
    expect(onNameSubmitted).not.toHaveBeenCalled();
});

