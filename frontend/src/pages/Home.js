import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import BENEFIT_1 from '../styles/img/benefit-01.png';
import BENEFIT_2 from '../styles/img/benefit-02.png';
import BENEFIT_3 from '../styles/img/benefit-03.png';
import BENEFIT_4 from '../styles/img/benefit-04.png';
import IPHONE from '../styles/img/iphone.png';
import FOR_WHO from '../styles/img/for_who.png';
import RESULT from '../styles/img/result.png';
import MASSAGE_OIL_SMALL from '../styles/img/Massage_oil_small.png';
import LIME_GINGER from '../styles/img/lime-ginger-en-1cut2.png';
import FR_CUT from '../styles/img/fr_cut.png';
import CHOCOLATE_ALMOND from '../styles/img/Chocolate_cut.png';
import CHERRY from '../styles/img/cereza_cut.png';
import COFFEE from '../styles/img/Coffee_Scrub.png';
import CINNAMON from '../styles/img/Cinnamon_orange_small.png';
import BATTER1 from '../styles/img/Batter_1_small.png';
import BATTER2 from '../styles/img/Batter_2_small.png';
import ALGAE_DET from '../styles/img/algae_detox_inner.png';
import ALGAE_SCRUB from '../styles/img/algae-scrub-mock-up-en2.png';
import ELASTIC from '../styles/img/Elastic_Skin_small.png';
import KELP from '../styles/img/Kelp_mint_small.png';
import SUPER_FLAME from '../styles/img/Super_flame_small.png';
import HOT_COLD from '../styles/img/Hot_Cold_small.png';
import LYMPHATIC_DRAINAGE from '../styles/img/Lymphatic_Drainage_small.png';
import COACH_1 from '../styles/img/coach-01.png';
import COACH_2 from '../styles/img/coach-02.png';
import PLATAFORMA from '../styles/img/platform_img2.png';
import MENU from '../styles/img/menu.png';
import frontRoutes from '../config/frontRoutes';
import Button from '../components/button/Button';
import { useTranslation } from 'react-i18next';
import Modal from '../components/modal/Modal';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import UserMenu from '../components/header/UserMenu';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showMenu, setshowMenu] = useState();
  const [showLanguage, setShowLanguage] = useState();

  const handleMenuLanguage = () => {
    setShowLanguage(prev => !prev);
  };

  return (
    <div className='home'>
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
              <a onClick={() => setshowMenu(false)} href='#shedule'>
                {t('planning')}
              </a>
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
            <img src={MENU} alt='Breadcrumb menu' />
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
              <li>
                <a href='#shedule'>{t('planning')}</a>
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
            <img src={IPHONE} alt='' />
          </div>
          <div className='join-us-left'>
            <div className='join-us-lbl'>
              {t('joinToOurMarathon')} <span>{t('iphone13')}</span>
            </div>
            <div className='join-us-txt'>{t('youAreOnTime')}</div>
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
                      {t('participantName')}
                    </div>
                    <div className='result-slider-txt'>
                      <p>{t('100percentHappy')}</p>
                      <p>{t('hereISee')}</p>
                    </div>
                  </div>
                  <div className='result-slider-right'>
                    <img src={RESULT} alt='marathon_result' />
                  </div>
                  <div className='clear'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='gift'>
        <div className='content-wrapper'>
          <div className='gift-lbl'>{t('reciveAGift')}</div>
          <div className='gift-slbl'>{t('letiqueCosmetic')}</div>
          <div className='gift-slider'>
            <div id='gift-slider' className='owl-carousel'>
              {
                <Carousel showThumbs={false}>
                  <div className='gift-slider-section'>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={MASSAGE_OIL_SMALL} alt='massage oil small' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('massageOil')}</div>
                        <div className='gift-slider-txt'>
                          {t('esencialOilCanela')}
                        </div>
                      </div>
                    </div>

                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={LIME_GINGER} alt='lime ginger' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('bodyScrub')}</div>
                        <div className='gift-slider-txt'>
                          {t('exfoliantContains')}
                        </div>
                      </div>
                    </div>

                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={FR_CUT} alt='' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('frangipani')}</div>
                        <div className='gift-slider-txt'>
                          {t('frangipaniOil')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='gift-slider-section'>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={CHOCOLATE_ALMOND} alt='' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('chocolate')}</div>
                        <div className='gift-slider-txt'>
                          {t('chocolateOil')}
                        </div>
                      </div>
                    </div>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={CHERRY} alt='' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('cherry')}</div>
                        <div className='gift-slider-txt'>{t('cherryOil')}</div>
                      </div>
                    </div>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={COFFEE} alt='' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('coffee')}</div>
                        <div className='gift-slider-txt'>{t('coffeeOil')}</div>
                      </div>
                    </div>
                  </div>

                  <div className='gift-slider-section'>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img
                          src={LYMPHATIC_DRAINAGE}
                          alt='Lymphatic drainage'
                        />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('drainage')}</div>
                        <div className='gift-slider-txt'>
                          {t('drainageOil')}
                        </div>
                      </div>
                    </div>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={HOT_COLD} alt='Hot cold contrast cream' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('hotCold')}</div>
                        <div className='gift-slider-txt'>{t('hotColdOil')}</div>
                      </div>
                    </div>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img
                          src={SUPER_FLAME}
                          alt='Super flame body wrap gel'
                        />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('flame')}</div>
                        <div className='gift-slider-txt'>{t('flameOil')}</div>
                      </div>
                    </div>
                  </div>

                  <div className='gift-slider-section'>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={KELP} alt='Kelp mint cold body wrap gel' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('kelpMint')}</div>
                        <div className='gift-slider-txt'>
                          {t('kelpMintOil')}
                        </div>
                      </div>
                    </div>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img
                          src={BATTER1}
                          alt='Body cream butter jasmine-wild strawberry'
                        />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>
                          {t('creamButter')}
                        </div>
                        <div className='gift-slider-txt'>
                          {t('creamButterOil')}
                        </div>
                      </div>
                    </div>

                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={ELASTIC} alt='Elastic skin body wrap gel' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>
                          {t('elasticSkin')}
                        </div>
                        <div className='gift-slider-txt'>
                          {t('elasticSkinOil')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='gift-slider-section'>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={ALGAE_SCRUB} alt='Body scrub algae' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('algae')}</div>
                        <div className='gift-slider-txt'>{t('algaeOil')}</div>
                      </div>
                    </div>

                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={ALGAE_DET} alt='Body wrap algae detox' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('algaeDetox')}</div>
                        <div className='gift-slider-txt'>
                          {t('algaeDetoxOil')}
                        </div>
                      </div>
                    </div>

                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={BATTER2} alt='Body cream mango papaya' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>
                          {t('mangoPapaya')}
                        </div>
                        <div className='gift-slider-txt'>
                          {t('mangoPapayaOil')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='gift-slider-section'>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img
                          src={CINNAMON}
                          alt='CINNAMON-ORANGE HOT BODY WRAP GEL'
                        />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>{t('wrapGel')}</div>
                        <div className='gift-slider-txt'>{t('wrapGelOil')}</div>
                      </div>
                    </div>
                  </div>
                </Carousel>
              }
            </div>
          </div>
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

      <div id='shedule' className='options'>
        <div className='content-wrapper'>
          <div className='options-lbl'>{t('chooseOneOption')}</div>
          <div className='options-row'>
            <div className='option-item'>
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
                <Button
                  onClick={() =>
                    navigate(frontRoutes.register, {
                      state: { withGift: true },
                    })
                  }
                  className='main-apply'
                >
                  {t('signInNow')}
                </Button>
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
