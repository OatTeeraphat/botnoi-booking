import React, { Component } from 'react';
import Player from "./component/Player";


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Player />
        </div>
      </div>
    );
  }
}

export default App;