import React, { useEffect, useState } from 'react';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import VideoPlayer from '../components/video/VideoPlayer';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';
import { useMarathon } from '../context/marathonContext';
import { useGetImageUrlQuery } from '../slices/imagesApiSlice';

function MeditationDetailsMain() {
  const { id } = useParams();
  const { dayDetails } = useMarathon();
  const [meditation, setMeditation] = useState();

  useEffect(() => {
    if (dayDetails && id) {
      const details = dayDetails.meditations.find(ele => ele._id === id);
      setMeditation(details);
    }
  }, []);

  const { data: imageS3 } = useGetImageUrlQuery(
    {
      url: meditation?.image?.url,
    },
    { skip: !meditation?.image?.url }
  );

  if (!meditation) {
    return null;
  }
  return (
    <div>
      <Text isTitle>{meditation.title}</Text>

      <Space medium />

      <div
        className='workout-card'
        style={{ backgroundImage: `url(${imageS3?.signedUrl})` }}
      />

      <Space small />

      <Text>
        <span className='primary'>{meditation.minutes}</span> min
      </Text>

      <Space small />

      <Markdown className='description' remarkPlugins={[remarkGfm]}>
        {meditation.description}
      </Markdown>

      <VideoPlayer url={meditation.audio} height='30px' />
    </div>
  );
}

export default MeditationDetailsMain;
