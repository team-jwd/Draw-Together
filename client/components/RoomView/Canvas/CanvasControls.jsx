import React from 'react';

export default props =>
  <div id="canvas-controls">
    <div id="color-controls">
      <label htmlFor="color">Color</label>
      <input
        type="color"
        id="color"
        onChange={props.strokeChanged}
      />
    </div>
    <div id="width-controls">
      <label htmlFor="width">Line Size</label>
      <input
        type="range"
        id="width"
        className="canvas-options"
        onChange={props.widthChanged}
        min="1"
        max="50"
      />
    </div>
    <button
      type="text"
      onClick={props.clearCanvas}
    >Clear Board</button>
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
