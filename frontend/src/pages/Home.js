import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BENEFIT_1 from '../styles/img/benefit-01.png';
import BENEFIT_2 from '../styles/img/benefit-02.png';
import BENEFIT_3 from '../styles/img/benefit-03.png';
import BENEFIT_4 from '../styles/img/benefit-04.png';
import FOR_WHO from '../styles/img/for_who.png';
import COACH_1 from '../styles/img/coach-01.png';
import COACH_2 from '../styles/img/coach-02.png';
import PLATAFORMA from '../styles/img/platform_img2.png';
import MENU from '../styles/img/menu.png';
import frontRoutes from '../config/frontRoutes';
import { useTranslation } from 'react-i18next';
import Modal from '../components/modal/Modal';
import UserMenu from '../components/header/UserMenu';
import { useGetConfigLandingQuery } from '../slices/configApiSlice';
import Image from '../components/image/Image';
import Calendary from '../components/calendar/Calendar';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useGetGiftsQuery } from '../slices/giftsApiSlice';
import Text from '../components/text/Text';
import Space from '../components/space/Space';

function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [showMenu, setshowMenu] = useState();
  const [showCalendar, setshowCalendar] = useState();

  const { data: labels } = useGetConfigLandingQuery(lang);
  const { data: giftsData } = useGetGiftsQuery({ quantity: true });

  const handleCalendar = () => {
    setshowMenu(false);
    setshowCalendar(prev => !prev);
  };

  return (
    <div className='home'>
      {showCalendar && window.innerWidth < 1024 && (
        <Modal onClose={setshowCalendar} className='calendar-wrapper-mobile'>
          <Calendary />
        </Modal>
      )}

      {showMenu && (
        <Modal onClose={setshowMenu} fullWidth>
          <ul className='home-menu-mobile'>
            <li>
              <a onClick={() => setshowMenu(false)} href='#marathon'>
                {t('marathon')}
              </a>
            </li>
            <li>
              <a onClick={() => setshowMenu(false)} href='#awards'>
                {t('awards')}
              </a>
            </li>
            <li>
              <a onClick={() => setshowMenu(false)} href='#goals'>
                {t('goals')}
              </a>
            </li>
            <li>
              <button onClick={handleCalendar}>{t('planning')}</button>
            </li>
            <li>
              <a onClick={() => setshowMenu(false)} href='#results'>
                {t('results')}
              </a>
            </li>
          </ul>
        </Modal>
      )}

      <div className='promo-header'>
        <div className='content-wrapper'>
          <button onClick={() => setshowMenu(true)} className='mobile-menu-btn'>
            <img src={MENU} alt='Breadcrumb bodymaraton landing menu' />
          </button>

          <div className='promo-header-left'>
            <ul className='main-menu'>
              <li>
                <a href='#marathon'>{t('marathon')}</a>
              </li>
              <li>
                <a href='#awards'>{t('awards')}</a>
              </li>
              <li>
                <a href='#goals'>{t('goals')}</a>
              </li>
              <li className='calendar-wrapper-desktop'>
                <button
                  className={showCalendar ? 'active' : ''}
                  onClick={handleCalendar}
                >
                  {t('planning')}
                </button>

                {showCalendar && <Calendary />}
              </li>
              <li>
                <a href='#results'>{t('results')}</a>
              </li>
            </ul>
          </div>

          <div className='promo-header-right'>
            <Link to={frontRoutes.login} className='header-login'>
              {t('login')}
            </Link>

            <UserMenu isLanding />
          </div>
          <div className='clear'></div>
        </div>
      </div>

      <div className='promo-main'>
        <div className='content-wrapper'>
          <div className='promo-main-left'>
            <div className='promo-main-lbl-a'>{t('getSlimIn4Weeks')}</div>
            <div className='promo-main-lbl-b'>{t('bodyMaratonPerfect')}</div>
            <div className='promo-main-txt'>{t('youAreOnTimeTo')}</div>
            <div className='promo-main-price'>
              <b>29,90 €</b> <span>{t('freeGift')}</span>
            </div>
            <Link to={frontRoutes.register} className='main-apply'>
              {t('signInNow')}
            </Link>
          </div>
          <div className='promo-main-right'></div>
          <div className='clear'></div>
        </div>
      </div>

      <div id='goals' className='main-benefits'>
        <div className='content-wrapper'>
          <div className='promo-lbl'>{t('obtainWhat')}</div>
          <div className='benefits-row'>
            <div className='benefits-item'>
              <div className='benefits-icn'>
                <img src={BENEFIT_1} alt='beneficios de la dieta' />
              </div>
              <div className='benefits-lbl'>{t('workoutsProgram')}</div>
            </div>

            <div className='benefits-item'>
              <div className='benefits-icn'>
                <img src={BENEFIT_2} alt='' />
              </div>
              <div className='benefits-lbl'>{t('dietForYou')}</div>
            </div>

            <div className='benefits-item'>
              <div className='benefits-icn'>
                <img src={BENEFIT_3} alt='' />
              </div>
              <div className='benefits-lbl'>{t('tipsForYourBody')}</div>
            </div>

            <div className='benefits-item'>
              <div className='benefits-icn'>
                <img src={BENEFIT_4} alt='' />
              </div>
              <div className='benefits-lbl'>{t('soportDuringMaraton')}</div>
            </div>

            <div className='clear'></div>
          </div>
        </div>
      </div>

      <div id='awards' className='join-us'>
        <div className='content-wrapper'>
          <div className='join-us-right'>
            <Image url={labels?.giftImage?.url} alt={labels?.giftDescription} />
          </div>
          <div className='join-us-left'>
            <div className='join-us-lbl'>
              {t('joinToOurMarathon')} <span>{labels?.giftTitle}</span>
            </div>
            <div className='join-us-txt'>{labels?.giftDescription}</div>
            <Link to={frontRoutes.register} className='main-apply'>
              {t('signInNow')}
            </Link>
          </div>
          <div className='clear'></div>
        </div>
      </div>

      <div className='for-who'>
        <div className='content-wrapper'>
          <div className='for-who-right'>
            <div className='for-who-lbl'>{t('whoCanParticipate')}</div>
            <ul className='promo-list'>
              <li>{t('womanThatWant')}</li>

              <li>{t('soportWoman')}</li>

              <li>{t('womanHealth')}</li>

              <li>{t('healthyLifeWoman')}</li>
            </ul>
            <div className='promo-main-price'>
              <b>29,90 €</b> <span>{t('freeGift')}</span>
            </div>
            <Link to={frontRoutes.register} className='main-apply'>
              {t('signInNow')}
            </Link>
          </div>
          <div className='for-who-left'>
            <img src={FOR_WHO} alt='for who is this marathon' />
          </div>
          <div className='clear'></div>
        </div>
      </div>

      <div id='results' className='results'>
        <div className='content-wrapper'>
          <div className='results-lbl'>{t('resultsOnOurParaticipants')}</div>
          <div className='results-slider'>
            <div id='result-slider' className='owl-carousel'>
              <div className='result-slider-item-a'>
                <div className='result-slider-item'>
                  <div className='result-slider-left'>
                    <div className='result-slider-lbl'>
                      {labels?.resultName}
                    </div>

                    <Markdown
                      className='result-slider-txt'
                      remarkPlugins={[remarkGfm]}
                    >
                      {labels?.resultDescription}
                    </Markdown>
                  </div>

                  <div className='result-slider-right'>
                    <Image
                      url={labels?.resultImageBefore?.url}
                      alt='Participante foto antes maraton'
                      isBackground
                    />

                    <Image
                      url={labels?.resultImageAfter?.url}
                      alt='Participante foto despues maraton'
                      isBackground
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='git-carousel-section content-wrapper'>
        <div className='gift-lbl'>{t('reciveAGift')}</div>

        <div className='gift-slbl'>{t('letiqueCosmetic')}</div>

        <div className='gift-carousel'>
          {giftsData?.length > 0 &&
            giftsData.map((ele, i) => (
              <div className='gift-item' key={`gift-${i}`}>
                <div className='image-container'>
                  <Image isBackground url={ele.image?.url} />
                </div>

                <Text fontSize='18' isBold>
                  {ele[lang].name}
                </Text>

                <Space extraSmall />

                <Text>{ele[lang].description}</Text>
              </div>
            ))}
        </div>
      </div>

      <div className='coach'>
        <div className='content-wrapper'>
          <div className='coach-lbl'>{t('whoHasPreparedMaraton')}</div>
          <div className='coach-row'>
            <div className='coach-item'>
              <div className='coach-item-left'>
                <div className='coach-img'>
                  <img src={COACH_1} alt='' />
                </div>
                <div className='coach-name'>{t('nutrisionist')}</div>
                <a
                  className='coach-link'
                  href='https://www.instagram.com/nuria.mh/'
                  target='_blank'
                  rel='noreferrer'
                >
                  @nuria.mh
                </a>
              </div>
              <div className='coach-item-right'>{t('100PersentSure')}</div>
              <div className='clear'></div>
            </div>
            <div className='coach-item'>
              <div className='coach-item-left'>
                <div className='coach-img'>
                  <img src={COACH_2} alt='' />
                </div>
                <div className='coach-name'>{t('entrenador')}</div>
                <a
                  className='coach-link'
                  href='https://www.instagram.com/En_tr/'
                  target='_blank'
                  rel='noreferrer'
                >
                  @En_tr
                </a>
              </div>
              <div className='coach-item-right'>{t('100PersentSure')}</div>
              <div className='clear'></div>
            </div>
            <div className='clear'></div>
          </div>
        </div>
      </div>

      <div id='marathon' className='platform'>
        <div className='content-wrapper'>
          <div className='platform-left'>
            <img src={PLATAFORMA} alt='' />
            <div className='platform-lbl'>{t('modernPlatform')}</div>
            <Link to={frontRoutes.register} className='main-apply'>
              {t('signInNow')}
            </Link>
          </div>
          <div className='platform-right'>
            <div className='platform-list'>
              <div className='platform-list-item'>
                <div className='platform-list-lbl'>{t('nutricion')}</div>
                <div className='platform-list-txt'>{t('400recipes')}</div>
              </div>

              <div className='platform-list-item'>
                <div className='platform-list-lbl'>{t('trainers')}</div>
                <div className='platform-list-txt'>{t('designedForLose')}</div>
              </div>

              <div className='platform-list-item'>
                <div className='platform-list-lbl'>{t('soport')}</div>
                <div className='platform-list-txt'>{t('telegramCanal')}</div>
              </div>

              <div className='platform-list-item'>
                <div className='platform-list-lbl'>{t('progress')}</div>
                <div className='platform-list-txt'>{t('beforeLate')}</div>
              </div>
            </div>
          </div>
          <div className='clear'></div>
        </div>
      </div>

      <div className='options'>
        <div className='content-wrapper'>
          <div className='options-lbl'>{t('chooseOneOption')}</div>
          <div className='options-row'>
            <div className='option-item flex-between'>
              <div>
                <div className='option-head'>{t('basicOption')}</div>
                <div className='option-body'>
                  <div className='option-benefit'>{t('videoWorkoutsMin')}</div>

                  <div className='option-benefit'>{t('videosVacum')}</div>

                  <div className='option-benefit'>{t('menuWithRecipe')}</div>

                  <div className='option-benefit'>{t('kcalCalculator')}</div>

                  <div className='option-benefit'>{t('shoppingListWeek')}</div>

                  <div className='option-benefit'>{t('trackerWater')}</div>

                  <div className='option-benefit'>{t('followTheProcess')}</div>

                  <div className='option-benefit'>{t('soportTelegram')}</div>
                </div>
              </div>
              <div className='option-benefits-price'>
                <div className='option-price'>29,90 €</div>
                <Link to={frontRoutes.register} className='main-apply'>
                  {t('signInNow')}
                </Link>
              </div>
            </div>

            <div className='option-item special'>
              <div className='option-head'>{t('withPresent')}</div>
              <div className='option-body'>
                <div className='option-benefit'>{t('cosmeticPresent')}</div>

                <div className='option-benefit'>{t('trainAtHome')}</div>

                <div className='option-benefit'>{t('videosVacum')}</div>

                <div className='option-benefit'>{t('menuWithRecipe')}</div>

                <div className='option-benefit'>{t('kcalCalculator')}</div>

                <div className='option-benefit'>{t('shoppingListWeek')}</div>

                <div className='option-benefit'>{t('trackerWater')}</div>

                <div className='option-benefit'>{t('followTheProcess')}</div>

                <div className='option-benefit'>{t('soportTelegram')}</div>
              </div>
              <div className='option-benefits-price'>
                <div className='option-price'>29,90 €</div>
                <Link to={frontRoutes.registerGift} className='main-apply'>
                  {t('signInNow')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='faq'>
        <div className='content-wrapper'>
          <div className='faq-lbl'>{t('faq')}</div>
          <div className='faq-row'>
            <details className='faq-item'>
              <summary className='faq-item-q'>{t('dailyTrains')}</summary>
              <p className='faq-item-a'>{t('sixTimes')}</p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>{t('canITrain')}</summary>
              <p className='faq-item-a'>{t('yourVideosAreFor')}</p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>{t('eatMenuList')}</summary>
              <p className='faq-item-a'>{t('footsWillBeCalculated')}</p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>{t('howManyKilos')}</summary>
              <p className='faq-item-a'>{t('pautasLooseWeight')}</p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>{t('howManyTime')}</summary>
              <p className='faq-item-a'>{t('personalAreaAccess')}</p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>{t('howIWillRecive')}</summary>
              <p className='faq-item-a'>{t('whenBuyMaraton')}</p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>{t('howICanWin')}</summary>
              <p className='faq-item-a'>{t('theFinalAward')}</p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>{t('howChooseWinner')}</summary>
              <p className='faq-item-a'>{t('eachPrincipiant')}</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
