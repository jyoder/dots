import React from 'react';
import PropTypes from 'prop-types';

import BoardView from 'ui/game/BoardView';
import ScoreBoardView from 'ui/game/ScoreBoardView';

import DistributedGame from 'network/DistributedGame';

import 'ui/game/GameView.css';  

export default class GameView extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            game: null,
            distributedGame: null
        };
    }

    componentWillMount() {
        this.props.createConnection.then((connection) => {
            this.setState({ distributedGame: this._distributedGame(connection) });
        });
    }

    render() {    
        if(this.state.game) {
            return(
                <div className="GameView">
                    <BoardView game={this.state.game} clickHandler={this._handleClick.bind(this)}/>
                    <ScoreBoardView game={this.state.game}/>
                </div>
            );
        } else {
            return null;
        }
    }

    _distributedGame(connection) {
        return DistributedGame.create(
            connection,
            this.props.gameId,
            this._onNextGame.bind(this)
        );
    }

    _handleClick(lineType, x, y) {
        if(this.state.distributedGame) {
            if(lineType === 'left') {
                this.state.distributedGame.markLeftLine(x, y);
            } else if(lineType === 'top') {
                this.state.distributedGame.markTopLine(x, y);
            }
        }
    }

    _onNextGame(game) {
        this.setState({ game: game });
    }
}

GameView.propsTypes = {
    gameId: PropTypes.string.isRequired,
    createConnection: PropTypes.object.isRequired
};
