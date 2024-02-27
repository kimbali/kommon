import React from 'react';
import Text from '../text/Text';
import Image from '../image/Image';

function GiftItem({ image, text, selectGift, giftId, giftSelected }) {
  return (
    <button
      onClick={() => selectGift(giftId)}
      className={`gift-item ${giftSelected === giftId ? 'selected' : ''}`}
    >
      <Image isBackground url={image} alt={text} />

      <Text>{text}</Text>
    </button>
  );
}

export default GiftItem;
