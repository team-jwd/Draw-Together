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
    console.log(this.state);
    this.setState({
      drawType: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <Canvas
          strokeStyle={this.state.strokeStyle}
          lineWidth={this.state.lineWidth}
          drawType={this.state.drawType}
        />
        <CanvasControls
          strokeChanged={this.strokeChanged.bind(this)}
          widthChanged={this.widthChanged.bind(this)}
          drawTypeChanged={this.drawTypeChanged.bind(this)}
        />
      </div>
    );
  }
}
