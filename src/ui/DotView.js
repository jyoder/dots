import React from 'react';
import PropTypes from 'prop-types';
import 'ui/DotView.css';

export default class DotView extends React.Component {
    render() {
        return (
            <div className={this._classes()} onClick={this._handleClick.bind(this)}>
                <span className='DotView-vertex'/>
                {this.props.children}
            </div>
        );
    }

    _classes() {
        const classes = ['DotView', this._dotTypeClass()];
        
        const topMarkerClass = this._topMarkerClass();
        if(topMarkerClass) {
            classes.push(topMarkerClass);
        }

        const leftMarkerClass = this._leftMarkerClass();
        if(leftMarkerClass) {
            classes.push(leftMarkerClass);
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

    _topMarkerClass() {
        const marker = this.props.dot.topLineMarker();
        return marker ? `DotView--topMarkedByPlayer${marker.playerIndex()}` : null;
    }

    _leftMarkerClass() {
        const marker = this.props.dot.leftLineMarker();
        return marker ? `DotView--leftMarkedByPlayer${marker.playerIndex()}` : null;
    }

    _handleClick(event) {
        this.props.dotClickHandler.handleClick(event);
    }
}

DotView.propTypes = {
    dot: PropTypes.object.isRequired,
    dotClickHandler: PropTypes.object.isRequired,
};
