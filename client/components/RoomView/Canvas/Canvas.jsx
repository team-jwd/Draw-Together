import React from 'react';

export default props =>
  <canvas
    id="canvass"
    width="2000px"
    height="2000px"
    onMouseDown={props.startDraw}
    onMouseMove={props.newDraw}
    onMouseUp={props.endDraw}
    onMouseLeave={props.endDraw}
  />;
