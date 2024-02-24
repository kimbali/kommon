import React from 'react';
import Text from '../text/Text';
import Image from '../image/Image';
import Space from '../space/Space';

function BodyTemplate({ title, template, photo }) {
  return (
    <div className='body-template'>
      <Text fontSize='16' isBold center>
        {title}
      </Text>

      <Space extraSmall />

      {photo ? (
        <Image
          className='body-template-image'
          isBackground
          url={photo.url}
          alt='Bodymaraton user front foto'
        />
      ) : (
        <img src={template} alt='Bodymaraton template front foto' />
      )}
    </div>
  );
}

export default BodyTemplate;
