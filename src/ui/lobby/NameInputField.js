import React from 'react';
import { Input, Button, InputGroup, InputGroupButton } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const RETURN_KEY = 13;

export default class NameInputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '' };
    }

    render() {
        return(
            <InputGroup>
                <Input 
                    className='text-center'
                    onChange={this._onInputChange.bind(this)}
                    onKeyPress={this._onInputKeyPress.bind(this)}
                />
                <InputGroupButton>
                    <Button
                        color='primary'
                        disabled={this._nextDisabled()}
                        onClick={this._onNextClicked.bind(this)}>   
                        <FontAwesome name='arrow-right'/>
                    </Button>
                </InputGroupButton>
            </InputGroup>
        );
    }

    _onInputKeyPress(event) {
        if(event.charCode === RETURN_KEY) {
            this.props.onNameSubmitted(this.state.name);
        }
    }

    _onInputChange(event) {
        event.preventDefault();
        this._setName(event.target.value);
    }

    _onNextClicked(event) {
        event.preventDefault();
        this.props.onNameSubmitted(this.state.name);
    }

    _nextDisabled() {
        return this.state.name.length === 0;
    }

    _setName(name) {
        this.setState({ name: name });
    }
}

NameInputField.propTypes = {
    onNameSubmitted: PropTypes.func.isRequired
};
