import React from 'react';
import GiftItem from './GiftItem';
import Space from '../space/Space';
import { useTranslation } from 'react-i18next';
import { useGetGiftsQuery } from '../../slices/giftsApiSlice';
import i18n from '../../traducciones/i18n';

function RegisterGiftSelect({
  setGiftSelected,
  giftSelected = '',
  hasGift,
  setHasGift,
}) {
  const { t } = useTranslation();
  const lang = i18n.language;

  const { data: giftsList } = useGetGiftsQuery({ quantity: true });

  return (
    <div className={`gift-selector ${hasGift ? 'show-gifts' : ''}`}>
      <div className={`buttons ${!hasGift ? 'without-gift' : ''}`}>
        <button
          className={`${hasGift ? 'selected' : ''}`}
          onClick={() => setHasGift(true)}
        >
          {t('askGift')}
        </button>

        <button
          className={`${!hasGift ? 'selected' : ''}`}
          onClick={() => setHasGift(false)}
        >
          {t('basic')}
        </button>
      </div>

      <Space small />

      {hasGift && giftsList.length > 0 && (
        <div className='gifts-wrapper'>
          {giftsList.map((ele, index) => (
            <GiftItem
              giftSelected={giftSelected}
              selectGift={setGiftSelected}
              image={ele.image?.url}
              text={ele[lang].name}
              key={ele._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RegisterGiftSelect;
