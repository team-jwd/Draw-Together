import React from 'react';
import Canvas from './Canvas.jsx';

export default class CanvasContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      strokeStyle: 'black',
      lineWidth: '5',
      drawType: 'write',
    };
  }

  render() {
    return (
      <div>
        <Canvas
          strokeStyle={this.state.strokeStyle}
          lineWidth={this.state.lineWidth}
          drawType={this.state.drawType}
        />
      </div>
    );
  }
}
