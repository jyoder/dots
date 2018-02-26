import React from 'react';
import PropTypes from 'prop-types';
import 'ui/game/DotView.css';

export default class DotView extends React.Component {
    static LINE_WIDTH = 8;

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
        const mark = this.props.dot.topLineMark();
        return mark ? `DotView--topMarkedByPlayer${mark.player().playerIndex()}` : null;
    }

    _leftMarkerClass() {
        const mark = this.props.dot.leftLineMark();
        return mark ? `DotView--leftMarkedByPlayer${mark.player().playerIndex()}` : null;
    }

    _handleClick(event) {
        this.props.dotClickHandler.handleClick(event);
    }
}

DotView.propTypes = {
    dot: PropTypes.object.isRequired,
    dotClickHandler: PropTypes.object.isRequired,
};
