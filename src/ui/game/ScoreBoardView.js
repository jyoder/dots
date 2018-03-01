import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import PlayerToken from 'ui/base/PlayerToken';

import 'ui/game/ScoreBoardView.css';

export default class ScoreBoardView extends React.Component {
    render() {
        return(
            <Table className="ScoreBoardView borderless">
                <tbody>
                    {this._rows()}
                </tbody>
            </Table>
        );
    }

    _rows() {
        const scores = this.props.game.scores();
        return Array.from(scores.keys()).map((player) => this._row(player, scores.get(player)));
    }

    _row(player, score) {
        return(
            <tr key={player.playerIndex()} className="ScoreBoardView-row">
                <td className="ScoreBoardView-row-status">{this._statusIcon(player)}</td>
                <td className="ScoreBoardView-row-token"><PlayerToken player={player}/></td>
                <td className="ScoreBoardView-row-name">{player.playerName()}</td>
                <td className="ScoreBoardView-row-score">{score}</td>
            </tr>
        );
    }

    _statusIcon(player) {
        return this._activePlayer(player) ? this._activeIcon() : '';
    }

    _activePlayer(player) {
        return this.props.game.activePlayer().playerIndex() === player.playerIndex();
    }

    _activeIcon() {
        return <FontAwesome name='arrow-right'/>
    }
}

ScoreBoardView.propTypes = {
    game: PropTypes.object.isRequired
}
