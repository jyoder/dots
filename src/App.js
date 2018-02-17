import React from 'react';
import Dot from 'state/Dot';
import DotView from 'ui/DotView'
import DotClickHandler from 'ui/DotClickHandler';

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
        <DotView dot={dot} dotClickHandler={dotClickHandler}/>
      </div>
    );
  }
}

export default App;
