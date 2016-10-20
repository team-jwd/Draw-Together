import React from 'react';

export default props =>
  <video
    autoPlay
    src={(props.source) ?
        URL.createObjectURL(props.source) : ''}
    id={props.id}
  />;
