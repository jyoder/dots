import React from 'react';
import GameView from 'ui/game/GameView';
import Game from 'state/Game';
import Player from 'state/Player';

export default class App extends React.Component {
    render() {
        const players = [new Player('1', 1, 'john'), new Player('2', 2, 'Hillary yoder')];
        const game = Game.create(8, 8, players);

        return (
            <div className="App">
                <GameView game={game}/>
            </div>
        );
    }
}
