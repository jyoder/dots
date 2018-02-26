import React from 'react';
import Game from 'state/Game';
import Player from 'state/Player';
import BoardView from 'ui/game/BoardView';
import ScoreBoardView from 'ui/game/ScoreBoardView';

class App extends React.Component {
  render() {
    const players = [new Player('1', 1, 'john'), new Player('2', 2, 'Hillary yoder')];
    const game = Game.create(4, 4, players);

    return (
      <div className="App">
        <BoardView game={game} clickHandler={this._handleClick.bind(this)}/>
        <ScoreBoardView game={game}/>
      </div>
    );
  }

  _handleClick(lineType, x, y) {
    console.log(`${lineType}, ${x}, ${y}`);
  }
}

export default App;
