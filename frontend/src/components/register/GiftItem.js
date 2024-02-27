import React from 'react';
import Text from '../text/Text';
import Image from '../image/Image';

function GiftItem({ image, text, selectGift, giftKey, giftSelected }) {
  return (
    <button
      onClick={() => selectGift(giftKey)}
      className={`gift-item ${giftSelected === giftKey ? 'selected ' : ''}`}
    >
      <Image isBackground url={image} alt={text} />

      <Text>{text}</Text>
    </button>
  );
}

export default GiftItem;
