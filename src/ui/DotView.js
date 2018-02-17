import React from 'react';
import PropTypes from 'prop-types';
import 'ui/DotView.css';

export default class DotView extends React.Component {
    render() {
        return (
            <div className={this._classes()} onClick={this._handleClick.bind(this)}>
                <span className='DotView-vertex'/>
            </div>
        );
    }

    _classes() {
        const classes = ['DotView', this._dotTypeClass()];
        
        const topOwnerClass = this._topOwnerClass();
        if(topOwnerClass) {
            classes.push(topOwnerClass);
        }

        const leftOwnerClass = this._leftOwnerClass();
        if(leftOwnerClass) {
            classes.push(leftOwnerClass);
        }

        return classes.join(' ');
    }

    _dotTypeClass() {
        const dot = this.props.dot;
        if(dot.isStandard()) {
            return 'DotView--standard';
        } else if(dot.isBottom()) {
            return 'DotView DotView--bottom';
        } else if(dot.isRight()) {
            return 'DotView DotView--right';
        } else {
            return 'DotView DotView--bottomRight';
        }
    }

    _topOwnerClass() {
        const owner = this.props.dot.topLineOwner();
        return owner ? `DotView--topOwnedByPlayer${owner.playerIndex()}` : null;
    }

    _leftOwnerClass() {
        const owner = this.props.dot.leftLineOwner();
        return owner ? `DotView--leftOwnedByPlayer${owner.playerIndex()}` : null;
    }

    _handleClick(event) {
        this.props.dotClickHandler.handleClick(event);
    }
}

DotView.propTypes = {
    dot: PropTypes.object.isRequired,
    dotClickHandler: PropTypes.object.isRequired
};
