import React, { useState } from 'react';
import Text from '../text/Text';
import Image from '../image/Image';
import Space from '../space/Space';
import DownloadButton from '../button/DownloadButton';

function BodyTemplate({ title, photo, siluete, download = false }) {
  const [signedUrl, setSignedUrl] = useState('');

  return (
    <div className='body-template'>
      <Text fontSize='16' isBold center>
        {title}
      </Text>

      <Space extraSmall />

      {photo ? (
        <div className='body-foto'>
          <Image
            className='body-template-image'
            isBackground
            url={photo.url}
            alt='Bodymaraton user front foto'
            setSignedUrl={setSignedUrl}
          />
        </div>
      ) : (
        <img
          className='body-user'
          src={siluete}
          alt='Bodymaraton template front foto'
        />
      )}

      {download && photo && (
        <>
          <Space extraSmall />
          <DownloadButton
            imageName={photo?.originalname}
            signedUrl={signedUrl}
          />
        </>
      )}
    </div>
  );
}

export default BodyTemplate;
