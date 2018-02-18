import React from 'react';
import PropTypes from 'prop-types';
import 'ui/PlayerToken.css';

export default class PlayerToken extends React.Component {
    render() {
        return(
            <span className={this._classes()}>
                {this._playerInitial()}
            </span>
        );
    }

    _classes() {
        return `PlayerToken PlayerToken--player${this.props.player.playerIndex()}`;
    }

    _playerInitial() {
        return this.props.player.playerName()[0].toUpperCase();
    }
}

PlayerToken.propTypes = {
    player: PropTypes.object.isRequired
};
