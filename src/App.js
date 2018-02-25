import React from 'react';
import Board from 'state/Board';
import BoardView from 'ui/BoardView';

class App extends React.Component {
  render() {
    const board = Board.create(10, 10);

    return (
      <div className="App">
        <BoardView board={board} clickHandler={this._handleClick.bind(this)}/>
      </div>
    );
  }

  _handleClick(lineType, x, y) {
    console.log(`${lineType}, ${x}, ${y}`);
  }
}

export default App;
