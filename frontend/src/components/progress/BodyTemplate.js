import React from 'react';
import Text from '../text/Text';
import Image from '../image/Image';
import Space from '../space/Space';

function BodyTemplate({ title, template, photo, siluete }) {
  return (
    <div className='body-template'>
      <Text fontSize='16' isBold center>
        {title}
      </Text>

      <Space extraSmall />

      {photo ? (
        <div className='body-foto'>
          {/* <img
            className='body-siluete'
            src={siluete}
            alt='Bodymaraton siluete'
          /> */}
          <Image
            className='body-template-image'
            isBackground
            url={photo.url}
            alt='Bodymaraton user front foto'
          />
        </div>
      ) : (
        <img
          className='body-user'
          src={siluete}
          alt='Bodymaraton template front foto'
        />
      )}
    </div>
  );
}

export default BodyTemplate;
