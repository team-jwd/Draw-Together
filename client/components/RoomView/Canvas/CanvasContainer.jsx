import React from 'react';
import Canvas from './Canvas.jsx';
import CanvasControls from './CanvasControls.jsx';

export default class CanvasContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      strokeStyle: 'black',
      lineWidth: '5',
      drawType: 'write',
    };
    this.strokeChanged = this.strokeChanged.bind(this);
    this.widthChanged = this.widthChanged.bind(this);
    this.drawTypeChanged = this.drawTypeChanged.bind(this);
  }

  strokeChanged(e) {
    this.setState({
      strokeStyle: e.target.value,
    });
  }

  widthChanged(e) {
    this.setState({
      lineWidth: e.target.value,
    });
  }

  drawTypeChanged(e) {
    this.setState({
      drawType: e.target.value,
    });
  }

  render() {
    return (
      <div id="canvas-container">
        <div id="canvas">
          <Canvas
            strokeStyle={this.state.strokeStyle}
            lineWidth={this.state.lineWidth}
            drawType={this.state.drawType}
          />
        </div>
        <CanvasControls
          strokeChanged={this.strokeChanged}
          widthChanged={this.widthChanged}
          drawTypeChanged={this.drawTypeChanged}
        />
      </div>
    );
  }
}
