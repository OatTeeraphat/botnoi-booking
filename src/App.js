import React, { Component } from 'react';
import { connect } from 'react-redux'

import Player from "./component/Player";
import Camera from './component/Camera';


class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="container">
          <Player />
          {
            //this.props.handle_cam
            true
            //false
              ? <Camera />
              : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  handle_cam: state.camera.handle_cam
})

export default connect(
  mapStateToProps,
  null,
)(App)

