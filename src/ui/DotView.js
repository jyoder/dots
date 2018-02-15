import React from 'react';
import PropTypes from 'prop-types';
import 'ui/DotView.css';

export default class DotView extends React.Component {
    render() {
        return (
            <div className={this._classes()}>
                <span className='DotView-vertex'/>
            </div>
        );
    }

    _classes() {
        const dot = this.props.dot;

        if(dot.isStandard()) {
            return 'DotView DotView--standard';
        } else if(dot.isBottom()) {
            return 'DotView DotView--bottom';
        } else if(dot.isRight()) {
            return 'DotView DotView--right';
        } else {
            return 'DotView DotView--bottomRight';
        }
    }
}

DotView.propTypes = {
    dot: PropTypes.object.isRequired
};
