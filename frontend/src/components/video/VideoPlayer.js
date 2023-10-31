import React from 'react';
import ReactPlayer from 'react-player/lazy';

function VideoPlayer({ url }) {
  return (
    <div>
      <ReactPlayer url={url} width='100%' height='100%' controls playing />
    </div>
  );
}

export default VideoPlayer;
