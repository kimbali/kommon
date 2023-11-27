import React from 'react';
import Text from '../text/Text';

function GiftItem({ image, text, selectGift, giftKey, giftSelected }) {
  return (
    <button
      onClick={() => selectGift(giftKey)}
      className={`gift-item ${giftSelected === giftKey ? 'selected ' : ''}`}
    >
      <img src={image} alt={text} />
      <Text>{text}</Text>
    </button>
  );
}

export default GiftItem;
