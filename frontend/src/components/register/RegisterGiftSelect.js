import React, { useState } from 'react';
import MASSAGE_OIL_SMALL from '../../styles/img/Massage_oil_small.png';
import LIME_GINGER from '../../styles/img/lime-ginger-en-1cut2.png';
import FR_CUT from '../../styles/img/fr_cut.png';
import CHOCOLATE_ALMOND from '../../styles/img/Chocolate_cut.png';
import CHERRY from '../../styles/img/cereza_cut.png';
import COFFEE from '../../styles/img/Coffee_Scrub.png';
import CINNAMON from '../../styles/img/Cinnamon_orange_small.png';
import BATTER1 from '../../styles/img/Batter_1_small.png';
import BATTER2 from '../../styles/img/Batter_2_small.png';
import ALGAE_DET from '../../styles/img/algae_detox_inner.png';
import ALGAE_SCRUB from '../../styles/img/algae-scrub-mock-up-en2.png';
import ELASTIC from '../../styles/img/Elastic_Skin_small.png';
import KELP from '../../styles/img/Kelp_mint_small.png';
import SUPER_FLAME from '../../styles/img/Super_flame_small.png';
import HOT_COLD from '../../styles/img/Hot_Cold_small.png';
import LYMPHATIC_DRAINAGE from '../../styles/img/Lymphatic_Drainage_small.png';
import GiftItem from './GiftItem';
import Space from '../space/Space';
import { Carousel } from 'react-responsive-carousel';
import { useTranslation } from 'react-i18next';

function RegisterGiftSelect({
  setGiftSelected,
  giftSelected = '',
  hasGift,
  setHasGift,
}) {
  const { t } = useTranslation();

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

      {hasGift && (
        <div className='gifts-wrapper'>
          <Carousel showThumbs={false}>
            <div className='gift-section one'>
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={MASSAGE_OIL_SMALL}
                giftKey={'MASSAGE_OIL_SMALL'}
                text={'MASSAGE OIL GRAPEFRUIT-GINGER-CHILLI'}
              />
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={LIME_GINGER}
                giftKey={'LIME_GINGER'}
                text={'BODY SCRUB LIME-GINGER'}
              />
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={FR_CUT}
                giftKey={'FR_CUT'}
                text={'BODY SCRUB FRANGIPANI-MONOI'}
              />
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={CHOCOLATE_ALMOND}
                giftKey={'CHOCOLATE_ALMOND'}
                text={'BODY SCRUB CHOCOLATE-ALMOND'}
              />
            </div>

            <div className='gift-section two'>
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={CHERRY}
                giftKey={'CHERRY'}
                text={'BODY SCRUB CHERRY'}
              />
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={COFFEE}
                giftKey={'COFFEE'}
                text={'COFFEE BODY SCRUB'}
              />
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={LYMPHATIC_DRAINAGE}
                giftKey={'LYMPHATIC_DRAINAGE'}
                text={'LYMPHATIC DRAINAGE BODY WRAP GEL'}
              />
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={HOT_COLD}
                giftKey={'HOT_COLD'}
                text={'HOT/COLD CONTRAST BODY WRAP GEL'}
              />
            </div>

            <div className='gift-section three'>
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={SUPER_FLAME}
                giftKey={'SUPER_FLAME'}
                text={'SUPREME FLAME BODY WRAP GEL'}
              />
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={KELP}
                giftKey={'KELP'}
                text={'KELP–MINT COLD BODY WRAP GEL'}
              />
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={BATTER1}
                giftKey={'BATTER1'}
                text={'BODY CREAM BUTTER JASMINE-WILD STRAWBERRY'}
              />
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={ELASTIC}
                giftKey={'ELASTIC'}
                text={'ELASTIC SKIN BODY WRAP GEL'}
              />
            </div>

            <div className='gift-section four'>
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={ALGAE_SCRUB}
                giftKey={'ALGAE_SCRUB'}
                text={'BODY SCRUB ALGAE'}
              />
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={ALGAE_DET}
                giftKey={'ALGAE_DET'}
                text={'BODY WRAP ALGAE DETOX'}
              />
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={BATTER2}
                giftKey={'BATTER2'}
                text={'BODY CREAM BUTTER MANGO-PAPAYA'}
              />
              <GiftItem
                giftSelected={giftSelected}
                selectGift={setGiftSelected}
                image={CINNAMON}
                giftKey={'CINNAMON'}
                text={'CINNAMON-ORANGE HOT BODY WRAP GEL'}
              />
            </div>
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default RegisterGiftSelect;
