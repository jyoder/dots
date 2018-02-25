import React from 'react';
import PropTypes from 'prop-types';

import DotView from 'ui/DotView';
import DotClickHandler from 'ui/DotClickHandler';
import PlayerToken from 'ui/PlayerToken';
import PlayerTokenSlug from 'ui/PlayerTokenSlug';

import 'ui/BoardView.css';

export default class BoardView extends React.Component {
    render() {
        return(
            <div className="BoardView">
                {this._rows()}
            </div>
        );
    }

    _rows() {
        const rows = [];
        for(let y = 0; y < this.props.board.height(); y++) {
            rows.push(this._row(y));
        }
        return rows;
    }

    _row(y) {
        const dotViews = [];
        for(let x = 0; x < this.props.board.width(); x++) {
            dotViews.push(this._dotView(x, y));
        }
        return(
            <div key={y} className={`BoardView-row--${y}`}>
                {dotViews}
            </div>
        );
    }

    _dotView(x, y) {
        const dot = this.props.board.dotAt(x, y);
        const owner = this.props.board.ownerAt(x, y);
        const dotClickHandler = this._dotClickHandler(dot, x, y);
        
        return(
            <DotView key={`${x},${y}`} dot={dot} dotClickHandler={dotClickHandler}>
                {this._playerToken(owner)}
            </DotView>
        );
    }

    _dotClickHandler(dot, x, y) {
        return new DotClickHandler(
            dot,
            DotView.LINE_WIDTH,
            this.props.clickHandler.bind(null, 'left', x, y),
            this.props.clickHandler.bind(null, 'top', x, y)
        );
    }

    _playerToken(owner) {
        if(owner) {
            return(<PlayerToken player={owner}/>);
        } else {
            return(<PlayerTokenSlug/>);
        }
    }
}

BoardView.propTypes = {
    board: PropTypes.object.isRequired,
    clickHandler: PropTypes.func.isRequired
}
