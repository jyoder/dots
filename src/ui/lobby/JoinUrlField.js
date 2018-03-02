import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, InputGroupButton, Input, Button, Tooltip } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default class JoinUrlField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tooltipOpen: false, contentCopied: false };
    }

    render() {
        return(
            <InputGroup>
                <Input
                    className='text-center'
                    value={this.props.url}
                    onChange={function() {}}
                />
                <InputGroupButton>
                    <CopyToClipboard text={this.props.text}>
                        <Button id='CopyButton' color='primary' onClick={this._onCopy.bind(this)}>
                            <FontAwesome name='copy'/>
                            <Tooltip
                                placement='bottom'
                                isOpen={this.state.tooltipOpen}
                                target='CopyButton'
                                toggle={this._toggleTooltip.bind(this)}>
                                
                                {this._tooltipContent()}
                            </Tooltip>
                        </Button>
                    </CopyToClipboard>
                </InputGroupButton>
            </InputGroup>
        );
    }

    _tooltipContent() {
        return this.state.contentCopied ? 'Copied!' : 'Copy to clipboard';
    }

    _toggleTooltip() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen,
            contentCopied: false
        });
    }

    _onCopy() {
        this.setState({
            tooltipOpen: this.state.tooltipOpen,
            contentCopied: true
        });
    }
}

JoinUrlField.propTypes = {
    url: PropTypes.string.isRequired
};
