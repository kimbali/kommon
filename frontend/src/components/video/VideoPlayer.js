import React from 'react';
import ReactPlayer from 'react-player/lazy';

function VideoPlayer({ url, autoPlay = false }) {
  return (
    <div className='video-player'>
      <ReactPlayer
        url={url || 'https://vimeo.com/718780725/6da8ad7304'}
        width='100%'
        height='100%'
        controls
        playing={autoPlay}
      />
    </div>
  );
}

export default VideoPlayer;
