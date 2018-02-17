import React from 'react';
import Player from 'state/Player';
import Dot from 'state/Dot';
import DotView from 'ui/DotView'
import DotClickHandler from 'ui/DotClickHandler';

class App extends React.Component {
  render() {
    const player = new Player('0', 0, 'Gordon');
    const dot = new Dot.createStandard();
    const dotClickHandler = new DotClickHandler(
      dot,
      10,
      () => { console.log("left") },
      () => { console.log("top")}
    );

    return (
      <div className="App">
        <DotView dot={dot} dotClickHandler={dotClickHandler}/>
      </div>
    );
  }
}

export default App;
