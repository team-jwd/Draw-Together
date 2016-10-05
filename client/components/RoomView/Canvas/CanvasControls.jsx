import React from 'react';

export default props =>
  <div>
    <select id="color" onChange={props.strokeChanged}>
      <option id="black" value="black">Black</option>
      <option id="red" value="red">Red</option>
      <option id="blue" value="blue">Blue</option>
      <option id="green" value="green">Green</option>
    </select>
    <select
      id="width"
      className="canvas-options"
      onChange={props.widthChanged}
    >
      <option id="small" value="5">Small</option>
      <option id="medium" value="10">Medium</option>
      <option id="large" value="15">Large</option>
    </select>
    <select id="draw-erase" onChange={props.drawTypeChanged}>
      <option id="draw" value="draw">Draw</option>
      <option id="erase" value="erase">Erase</option>
    </select>
  </div>;
