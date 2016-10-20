import React from 'react';
import Video from './Video.jsx';

export default props =>
  <div>
    <Video source={props.localVideoStream} id="localVideo" />
    <Video source={props.remoteVideoStream} id="remoteVideo" />
  </div>;
