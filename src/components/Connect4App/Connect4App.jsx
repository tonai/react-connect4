import React from 'react';

import Connect4Config from '../Connect4Config/Connect4Config.jsx';
import Connect4Game from '../Connect4Game/Connect4Game.jsx';
import './Connect4App.css';

class Connect4App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        cols: 7,
        length: 4,
        rows: 6
      },
      play: false
    }
  }

  handleBack = () => {
    this.setState({
      play: false
    });
  };

  handleConfigUpdated = (config) => {
    this.setState({config});
  };

  handleGameStart = () => {
    this.setState({
      play: true
    });
  };

  render() {
    return (
      <div className="Connect4App" >
        {!this.state.play && (
          <Connect4Config
            onConfigUpdated={this.handleConfigUpdated}
            onGameStart={this.handleGameStart}
            config={this.state.config}
          />
        )}
        {this.state.play && (
          <div>
            <Connect4Game {...this.state.config} />
            <div className="Connect4App__buttons" >
              <button onClick={this.handleBack} >Back</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Connect4App;
