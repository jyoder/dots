import React from 'react';
import Dot from 'state/Dot';
import Player from 'state/Player';
import DotView from 'ui/DotView'
import DotClickHandler from 'ui/DotClickHandler';
import PlayerToken from 'ui/PlayerToken';
import PlayerTokenSlug from 'ui/PlayerTokenSlug';

class App extends React.Component {
  render() {
    const dot = Dot.createStandard();
    const dotClickHandler = new DotClickHandler(
      dot,
      10,
      () => { console.log("left") },
      () => { console.log("top")}
    );

    return (
      <div className="App">
        <DotView dot={dot} dotClickHandler={dotClickHandler}>
          <PlayerToken player={new Player('1', 1, 'George')}/>
        </DotView>
        <DotView dot={dot} dotClickHandler={dotClickHandler}>
          <PlayerToken player={new Player('2', 2, 'Bertha')}/>
        </DotView>
        <DotView dot={dot} dotClickHandler={dotClickHandler}>
          <PlayerTokenSlug/>
        </DotView>
      </div>
    );
  }
}

export default App;
