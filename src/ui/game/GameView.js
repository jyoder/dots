import React from 'react';
import PropTypes from 'prop-types';

import BoardView from 'ui/game/BoardView';
import ScoreBoardView from 'ui/game/ScoreBoardView';

export default class GameView extends React.Component {
    render() {    
        return (
            <div className="GameView">
                <BoardView game={this.props.game} clickHandler={this._handleClick.bind(this)}/>
                <ScoreBoardView game={this.props.game}/>
            </div>
        );
    }

    _handleClick(lineType, x, y) {
        console.log(`${lineType}, ${x}, ${y}`);
    }
}

GameView.propsTypes = {
    game: PropTypes.object.isRequired
};
