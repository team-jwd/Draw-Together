import React from 'react';

export default props =>
  <div id="canvas-controls">
    <button
      type="text"
      onClick={props.clearCanvas}
    >Clear Board</button>
    <p>Choose a color</p>
    <input
      type="color"
      id="color"
      onChange={props.strokeChanged}
    />
    <p>Line Size</p>
    <input
      type="range"
      id="width"
      className="canvas-options"
      onChange={props.widthChanged}
      min="5"
      max="30"
    />
    <select
      id="draw-erase"
      onChange={props.drawTypeChanged}
    >
      <option
        id="draw"
        value="draw"
      >Draw</option>
      <option
        id="erase"
        value="erase"
      >Erase</option>
    </select>
  </div>;
