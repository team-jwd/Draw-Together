import React from 'react';
import Canvas from './Canvas.jsx';
import CanvasControls from './CanvasControls.jsx';

export default props =>
  <div id="canvas-container">

    <div id="canvas">
      <Canvas
        strokeStyle={props.strokeStyle}
        lineWidth={props.lineWidth}
        drawType={props.drawType}

        startDraw={props.startDraw}
        newDraw={props.newDraw}
        endDraw={props.endDraw}
      />
    </div>

    <CanvasControls
      strokeChanged={props.strokeChanged}
      widthChanged={props.widthChanged}
      drawTypeChanged={props.drawTypeChanged}
      clearCanvas={props.clearCanvas}
    />

  </div>;
