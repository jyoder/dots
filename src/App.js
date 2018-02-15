import React from 'react';
import Dot from 'state/Dot';
import DotView from 'ui/DotView'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <DotView dot={Dot.createStandard()}/>
        <DotView dot={Dot.createStandard()}/>
        <DotView dot={Dot.createBottomRight()}/>
      </div>
    );
  }
}

export default App;
