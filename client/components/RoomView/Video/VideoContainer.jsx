import React from 'react';
import Video from './Video.jsx';

export default props =>
  <div id="video-container">
    <Video source={props.remoteVideoStream} id="remoteVideo" />
  </div>;

//    <Video source={props.localVideoStream} id="localVideo" />
