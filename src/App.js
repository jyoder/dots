import React from 'react';
import Player from 'state/Player';
import Dot from 'state/Dot';
import DotView from 'ui/DotView'

class App extends React.Component {
  render() {
    const player = new Player('0', 0, 'Gordon');
    return (
      <div className="App">
        <DotView dot={Dot.createStandard()}/>
        <DotView dot={Dot.createStandard().drawLeftLine(player)}/>
        <DotView dot={Dot.createBottomRight()}/>
      </div>
    );
  }
}

export default App;
