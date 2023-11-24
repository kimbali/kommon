import React from 'react';
import ReactPlayer from 'react-player/lazy';

// https://vimeo.com/718780725/6da8ad7304

function VideoPlayer({ url, autoPlay = false, height = '100%' }) {
  return (
    <div className='video-player'>
      <ReactPlayer
        url={url || ''}
        width='100%'
        height={height}
        controls
        playing={autoPlay}
      />
    </div>
  );
}

export default VideoPlayer;
