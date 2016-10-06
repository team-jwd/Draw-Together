import React from 'react';
import ChatContainer from './Chat/ChatContainer';
import CanvasContainer from './Canvas/CanvasContainer';
import VideoContainer from './Video/VideoContainer';

export default () =>
  <div>
    <CanvasContainer />
    <ChatContainer />
    <VideoContainer />
  </div>;
