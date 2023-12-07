import React from 'react';
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

function Home() {
  const navigate = useNavigate();

  return (
    <div className='home'>
      {/* <div className='mobile-menu menu-index'>
        <div className='mobile-menu-a'>
          <a href='#' className='drop-close'>
            <img src='img/close.png' />
          </a>
          <ul>
            <li>
              <a href='#marathon'>Maraton</a>
            </li>
            <li>
              <a href='#awards'>Premios</a>
            </li>
            <li>
              <a href='#goals'>Metas</a>
            </li>
            <li>
              <a href='#shedule'>Calendario</a>
            </li>
            <li>
              <a href='#results'>Resultados</a>
            </li>
          </ul>
        </div>
      </div> */}

      <div className='promo-header'>
        <div className='content-wrapper'>
          <a href='#' className='mobile-menu-btn'>
            <img src={MENU} alt='Breadcrumb menu' />
          </a>
          <div className='promo-header-left'>
            <ul className='main-menu'>
              <li>
                <a href='#marathon'>Maraton</a>
              </li>
              <li>
                <a href='#awards'>Premios</a>
              </li>
              <li>
                <a href='#goals'>Metas</a>
              </li>
              <li>
                <a href='#shedule'>Calendario</a>
              </li>
              <li>
                <a href='#results'>Resultados</a>
              </li>
            </ul>
          </div>

          <div className='promo-header-right'>
            <Link to={frontRoutes.login} className='header-login'>
              INICIAR SESIÓN
            </Link>
          </div>
          <div className='clear'></div>
        </div>
      </div>

      <div className='promo-main'>
        <div className='content-wrapper'>
          <div className='promo-main-left'>
            <div className='promo-main-lbl-a'>Adelgaza en 4 semanas </div>
            <div className='promo-main-lbl-b'>MARATON BODYPERFECTO</div>
            <div className='promo-main-txt'>
              ¡Estas a tiempo para unirte al grupo de este mes, perder estos
              kilos que te sobran, obtener un regalo y ganar el premio
              principal!
            </div>
            <div className='promo-main-price'>
              <b>29,90 €</b> <span>+ regalo gratis</span>
            </div>
            <Link to={frontRoutes.register} className='main-apply'>
              APÚNTATE YA
            </Link>
          </div>
          <div className='promo-main-right'></div>
          <div className='clear'></div>
        </div>
      </div>

      <div id='goals' className='main-benefits'>
        <div className='content-wrapper'>
          <div className='promo-lbl'>¿QUE OBTENDRÁS?</div>
          <div className='benefits-row'>
            <div className='benefits-item'>
              <div className='benefits-icn'>
                <img src={BENEFIT_1} alt='' />
              </div>
              <div className='benefits-lbl'>
                Programa de ejercicioscon entrenador
              </div>
            </div>

            <div className='benefits-item'>
              <div className='benefits-icn'>
                <img src={BENEFIT_2} alt='' />
              </div>
              <div className='benefits-lbl'>
                Dieta adecuada diseñadasegún tus necesidades
              </div>
            </div>

            <div className='benefits-item'>
              <div className='benefits-icn'>
                <img src={BENEFIT_3} alt='' />
              </div>
              <div className='benefits-lbl'>
                Consejos para el cuidadocorporal - anticeluliticos
              </div>
            </div>

            <div className='benefits-item'>
              <div className='benefits-icn'>
                <img src={BENEFIT_4} alt='' />
              </div>
              <div className='benefits-lbl'>Soporte duranteel maratón</div>
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
              ÚNETE A NUESTRO MARATÓN Y OBTÉN UN NUEVO <span>IPHONE 13</span>
            </div>
            <div className='join-us-txt'>
              ¡Estás a tiempo para unirte al grupo de este mes, perder estos
              kilos que te sobran, obtener un regalo y ganar el premio
              principal!
            </div>
            <Link to={frontRoutes.register} className='main-apply'>
              APÚNTATE YA
            </Link>
          </div>
          <div className='clear'></div>
        </div>
      </div>

      <div className='for-who'>
        <div className='content-wrapper'>
          <div className='for-who-right'>
            <div className='for-who-lbl'>¿QUIÉN PUEDE PARTICIPAR?</div>
            <ul className='promo-list'>
              <li>Mujeres que quieren perder peso y estar en forma</li>

              <li>
                Mujeres que necesitan soporte para conseguir resultado deseado
              </li>

              <li>Mujeres que quieren mejorar su salud y bienestar</li>

              <li>Mujeres que quieren aprender a llevar una vida sana</li>
            </ul>
            <div className='promo-main-price'>
              <b>29,90 €</b> <span>+ regalo gratis</span>
            </div>
            <Link to={frontRoutes.register} className='main-apply'>
              APÚNTATE YA
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
          <div className='results-lbl'>
            RESULTADOS DE NUESTRAS PARTICIPANTES
          </div>
          <div className='results-slider'>
            <div id='result-slider' className='owl-carousel'>
              <div className='result-slider-item-a'>
                <div className='result-slider-item'>
                  <div className='result-slider-left'>
                    <div className='result-slider-lbl'>Helena</div>
                    <div className='result-slider-txt'>
                      <p>
                        I am 100% satisfied with the result, just like in the
                        last marathon six months ago. I am not satisfied only
                        with the fact that after the last marathon, I stopped
                        adhering to useful habits and launched myself a little.
                        Here I see two ways out: either to introduce all the
                        marathon chips into my life and keep myself in constant
                        shape, or (a backup option) to pass this super marathon
                        from Lera and Artem a couple of times a year , I want to
                        thank everyone who prepared this product and say that
                        the level has increased tenfold in six months. Very
                        cool!
                      </p>
                      <p>
                        Here I see two ways out: either to introduce all the
                        marathon chips into my life and keep myself in constant
                        shape, or (a backup option) to pass this super marathon
                        from Lera and Artem a couple of times a year
                      </p>{' '}
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
          <div className='gift-lbl'>RECIBE UN REGALO SEGURO</div>
          <div className='gift-slbl'>LETIQUE cosmetics</div>
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
                        <div className='gift-slider-lbl'>
                          MASSAGE OIL GRAPEFRUIT-GINGER-CHILLI
                        </div>
                        <div className='gift-slider-txt'>
                          El aceite esencial de canela estimula los procesos
                          metabólicos en las células de la piel, los aceites
                          esenciales de naranja y toronja le dan fuerza y
                          elasticidad.
                        </div>
                      </div>
                    </div>

                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={LIME_GINGER} alt='lime ginger' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>
                          BODY SCRUB LIME-GINGER
                        </div>
                        <div className='gift-slider-txt'>
                          El exfoliante contiene aceite esencial de lima, aceite
                          esencial de jengibre, aceite de almendras, aceite de
                          aguacate, aceite esencial de hierba de limón, aceite
                          esencial de canela. Las sustancias naturales del
                          exfoliante limpian eficazmente los poros actuando de
                          manera suave y delicada.
                        </div>
                      </div>
                    </div>

                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={FR_CUT} alt='' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>
                          BODY SCRUB FRANGIPANI-MONOI
                        </div>
                        <div className='gift-slider-txt'>
                          El exfoliante contiene aceite esencial de frangipani,
                          aceite de monoi, aceite de semilla de uva, aceite de
                          almendra, aceite de jojoba, vitamina E. El exfoliante
                          con un agradable aroma exótico no solo elimina
                          eficazmente las partículas muertas de la epidermis y
                          limpia la piel, sino que también la cuida
                          intensamente.
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
                        <div className='gift-slider-lbl'>
                          BODY SCRUB CHOCOLATE-ALMOND
                        </div>
                        <div className='gift-slider-txt'>
                          El exfoliante actúa delicadamente, eliminando
                          suavemente las partículas muertas de la piel. Al mismo
                          tiempo, las sustancias útiles en su composición
                          penetran profundamente en las células, las alimentan
                          desde el interior y estimulan los procesos de
                          regeneración natural a nivel celular. La piel se
                          vuelve suave, elástica y tensa.
                        </div>
                      </div>
                    </div>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={CHERRY} alt='' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>BODY SCRUB CHERRY</div>
                        <div className='gift-slider-txt'>
                          El exfoliante contiene aceite de semilla de cereza,
                          brotes de brezo rosa, aceite de almendras, vitamina E,
                          manteca de karité. El exfoliante no solo limpia
                          eficazmente la piel, sino que también le da un aspecto
                          hermoso y radiante debido al contenido de partículas
                          reflectantes.
                        </div>
                      </div>
                    </div>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={COFFEE} alt='' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>COFFEE BODY SCRUB</div>
                        <div className='gift-slider-txt'>
                          El exfoliante de café actúa eficazmente sobre la piel,
                          eliminando las células muertas de la epidermis,
                          estimula la circulación sanguínea y el drenaje
                          linfático. Elimina toxinas, combate la celulitis,
                          incluso en casos graves.{' '}
                        </div>
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
                        <div className='gift-slider-lbl'>
                          LYMPHATIC DRAINAGE BODY WRAP GEL
                        </div>
                        <div className='gift-slider-txt'>
                          La envoltura contiene cafeína, aceite esencial de
                          salvia, aceite esencial de romero, aceite esencial de
                          canela, aceite de jojoba, alcanfor, mentol. La
                          envoltura produce un pronunciado efecto de drenaje
                          linfático, contribuye activamente a reducir el volumen
                          no deseado y obtener una figura más delgada.
                        </div>
                      </div>
                    </div>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={HOT_COLD} alt='Hot cold contrast cream' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>
                          HOT/COLD CONTRAST BODY WRAP GEL
                        </div>
                        <div className='gift-slider-txt'>
                          La combinación única de efecto "caliente" y "frío" de
                          la envoltura ayuda a mejorar su efecto en la piel. Se
                          vuelve más suave y tensa, desaparecen la celulitis y
                          la flacidez. La envoltura inicia los procesos de
                          quemar grasa y tonifica la piel, la hidrata
                          intensamente y nutre con sustancias beneficiosas.
                        </div>
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
                        <div className='gift-slider-lbl'>
                          SUPREME FLAME BODY WRAP GEL
                        </div>
                        <div className='gift-slider-txt'>
                          Gracias a la composición rica, la envoltura modela
                          efectivamente la figura después de la primera
                          aplicación. Penetra en las capas profundas de la piel
                          y elimina las células grasas desde el interior. Las
                          sustancias activas descomponen la grasa corporal y
                          aumentan el metabolismo celular.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='gift-slider-section'>
                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={KELP} alt='Kelp mint cold body wrap gel' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>
                          KELP–MINT COLD BODY WRAP GEL
                        </div>
                        <div className='gift-slider-txt'>
                          Las algas marinas mejoran el metabolismo, aumentan el
                          flujo de exceso de líquido y reducen la grasa
                          corporal, mientras que la menta reduce la fatiga y
                          mejora la circulación sanguínea. El uso regular de la
                          envoltura ayudará a eliminar las estrías y la
                          celulitis de su piel, haciéndola suave y flexible.
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
                          BODY CREAM BUTTER JASMINE-WILD STRAWBERRY
                        </div>
                        <div className='gift-slider-txt'>
                          La manteca corporal contiene aceite de almendras,
                          aceite de aguacate, aceite de pistacho, aceite de
                          jojoba, extracto de jazmín, extracto de fresa,
                          alantoína. Las sustancias activas actúan en las
                          células de la epidermis, hidratan, nutren y protegen
                          la piel de influencias externas.
                        </div>
                      </div>
                    </div>

                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={ELASTIC} alt='Elastic skin body wrap gel' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>
                          ELASTIC SKIN BODY WRAP GEL
                        </div>
                        <div className='gift-slider-txt'>
                          La envoltura contiene extracto de orégano, extracto de
                          castaña, extracto de fucus, aceite esencial de
                          naranja, extracto de plancton, aceite de jojoba. La
                          envoltura actúa intensamente sobre la piel, devuelve a
                          la piel su elasticidad y firmeza.
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
                        <div className='gift-slider-lbl'>BODY SCRUB ALGAE</div>
                        <div className='gift-slider-txt'>
                          Exfoliante corporal con sal marina, trocitos de algas
                          y polvo de concha de ostras proporciona una limpieza
                          eficaz y elimina las células muertas de la piel.
                        </div>
                      </div>
                    </div>

                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={ALGAE_DET} alt='Body wrap algae detox' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>
                          BODY WRAP ALGAE DETOX
                        </div>
                        <div className='gift-slider-txt'>
                          La envoltura de algas elimina las toxinas y el exceso
                          de líquido en el cuerpo, y también nutre la piel de
                          microelementos y vitaminas.
                        </div>
                      </div>
                    </div>

                    <div className='gift-slider-item'>
                      <div className='gift-slider-img'>
                        <img src={BATTER2} alt='Body cream mango papaya' />
                      </div>
                      <div className='gift-slider-cnt'>
                        <div className='gift-slider-lbl'>
                          BODY CREAM BUTTER MANGO-PAPAYA
                        </div>
                        <div className='gift-slider-txt'>
                          La manteca corporal contiene aceite de almendras,
                          aceite de oliva, aceite de nuez, aceite de aguacate,
                          extracto de mango, extracto de papaya, alantoína.
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
                        <div className='gift-slider-lbl'>
                          CINNAMON-ORANGE HOT BODY WRAP GEL
                        </div>
                        <div className='gift-slider-txt'>
                          La envoltura caliente combate eficazmente las estrías
                          y la celulitis, elimina la celulitis visible, incluso
                          en las últimas etapas. Activa la circulación
                          sanguínea, elimina los desechos y toxinas del cuerpo.
                        </div>
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
          <div className='coach-lbl'>¿QUIÉN HA PREPARADO ESTE MARATÓN?</div>
          <div className='coach-row'>
            <div className='coach-item'>
              <div className='coach-item-left'>
                <div className='coach-img'>
                  <img src={COACH_1} alt='' />
                </div>
                <div className='coach-name'>Nutricionista</div>
                <a
                  className='coach-link'
                  href='https://www.instagram.com/nuria.mh/'
                  target='_blank'
                  rel='noreferrer'
                >
                  @nuria.mh
                </a>
              </div>
              <div className='coach-item-right'>
                I am 100% satisfied with the result, just like in the last
                marathon six months ago. I am not satisfied only with the fact
                that after the last marathon, I stopped adhering to useful
                habits and launched myself a little. Here I see two ways out:
                either to introduce all the marathon chips into my life and keep
                myself in constant shape,
              </div>
              <div className='clear'></div>
            </div>
            <div className='coach-item'>
              <div className='coach-item-left'>
                <div className='coach-img'>
                  <img src={COACH_2} alt='' />
                </div>
                <div className='coach-name'>Entrenador</div>
                <a
                  className='coach-link'
                  href='https://www.instagram.com/En_tr/'
                  target='_blank'
                  rel='noreferrer'
                >
                  @En_tr
                </a>
              </div>
              <div className='coach-item-right'>
                I am 100% satisfied with the result, just like in the last
                marathon six months ago. I am not satisfied only with the fact
                that after the last marathon, I stopped adhering to useful
                habits and launched myself a little. Here I see two ways out:
                either to introduce all the marathon chips into my life and keep
                myself in constant shape,{' '}
              </div>
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
            <div className='platform-lbl'>plataforma moderna y cómoda</div>
            <Link to={frontRoutes.register} className='main-apply'>
              APÚNTATE YA
            </Link>
          </div>
          <div className='platform-right'>
            <div className='platform-list'>
              <div className='platform-list-item'>
                <div className='platform-list-lbl'>Nutrición</div>
                <div className='platform-list-txt'>
                  Más de 400 recetas para todos los gustos y bolsillos con
                  cálculo completo de calorías para cada receta.
                </div>
              </div>

              <div className='platform-list-item'>
                <div className='platform-list-lbl'>Entrenos</div>
                <div className='platform-list-txt'>
                  Programa diseñado y preparado para perder peso y ponerte en
                  forma.
                </div>
              </div>

              <div className='platform-list-item'>
                <div className='platform-list-lbl'>Soporte</div>
                <div className='platform-list-txt'>
                  Información vía Telegram Canal y Chat para resolver todas tus
                  dudas.
                </div>
              </div>

              <div className='platform-list-item'>
                <div className='platform-list-lbl'>Progreso</div>
                <div className='platform-list-txt'>
                  Plataforma única que guarda tus fotos de ANTES/DESPUÉS,
                  compara tus medidas cada semana y te muestra resultados
                  alcanzados semanalmente.
                </div>
              </div>
            </div>
          </div>
          <div className='clear'></div>
        </div>
      </div>

      <div id='shedule' className='options'>
        <div className='content-wrapper'>
          <div className='options-lbl'>elige una opción</div>
          <div className='options-row'>
            <div className='option-item'>
              <div className='option-head'>BÁSICO</div>
              <div className='option-body'>
                <div className='option-benefit'>
                  Videos con ejercicios de 40-50 min para entrenar en casa en
                  momento mas cómodo para ti.
                </div>

                <div className='option-benefit'>
                  Videos como ejecutar vacuum y calentamiento.
                </div>

                <div className='option-benefit'>
                  Menú con recetas diseñado según tu necesidad de KCAL.
                </div>

                <div className='option-benefit'>Calculadora de KCAL.</div>

                <div className='option-benefit'>
                  Lista de la compra semanal.
                </div>

                <div className='option-benefit'>Tracker de agua y sueño.</div>

                <div className='option-benefit'>
                  Seguimiento de tu progreso.
                </div>

                <div className='option-benefit'>
                  Soporte continuo vía Telegram.
                </div>
              </div>
              <div className='option-benefits-price'>
                <div className='option-price'>29,90 €</div>
                <Link to={frontRoutes.register} className='main-apply'>
                  APÚNTATE YA
                </Link>
              </div>
            </div>

            <div className='option-item special'>
              <div className='option-head'>CON REGALO</div>
              <div className='option-body'>
                <div className='option-benefit'>
                  Regalo cosmética anticelulítica: exfoliante o crema quema
                  grasa.
                </div>

                <div className='option-benefit'>
                  Videos con ejercicios de 40-50 min para entrenar en casa en
                  momento mas cómodo para ti.
                </div>

                <div className='option-benefit'>
                  Videos como ejecutar vacuum y calentamiento.
                </div>

                <div className='option-benefit'>
                  Menú con recetas diseñado según tu necesidad de KCAL.
                </div>

                <div className='option-benefit'>Calculadora de KCAL.</div>

                <div className='option-benefit'>
                  Lista de la compra semanal.
                </div>

                <div className='option-benefit'>Tracker de agua y sueño.</div>

                <div className='option-benefit'>
                  Seguimiento de tu progreso.
                </div>

                <div className='option-benefit'>
                  Soporte continuo vía Telegram.
                </div>
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
                  APÚNTATE YA
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='faq'>
        <div className='content-wrapper'>
          <div className='faq-lbl'>FAQ</div>
          <div className='faq-row'>
            <details className='faq-item'>
              <summary className='faq-item-q'>
                ¿Los entrenos son diarios?
              </summary>
              <p className='faq-item-a'>
                Necesitarás entrenar 6 veces a la semana. Pero tu misma eliges
                los horarios de entrenamiento, en cualquier momento del día mas
                cómodo para ti. Los entrenos son en forma de videos de 40-50
                min, donde solo tendrás que seguir a la entrenadora durante este
                tiempo.
              </p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>
                ¿Puedo entrenar en casa o tengo que ir al gimnasio?
              </summary>
              <p className='faq-item-a'>
                Nuestros videos están pensados para que puedas entrenar en casa
                para que sea más cómodo y práctico para ti. Sin embargo, si
                sueles ir al gimnasio, puedes ejecutarlos allí, añadiendo unas
                tobilleras o mancuernas para subir la intensidad.
              </p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>
                ¿Tengo que comer según el menú o abra una lista de productos
                para cada comida y el menú tendré que elaborarlo yo misma?
              </summary>
              <p className='faq-item-a'>
                Las comidas se calcularán completamente de acuerdo necesidades
                calóricas de cada participante y se diseñarán en forma de menú
                para todos los días con 4 o 5 comidas (desayuno, media mañana,
                comida, merienda y cena), dependiendo del menú (Top, Vegano,
                Alternativo). No obstante, si lo deseas, puedes sustituir
                productos, siempre y cuando tengan el mismo o muy parecido valor
                energético.
              </p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>
                ¿Cuántos kilos puedo perder?
              </summary>
              <p className='faq-item-a'>
                Las pautas de pérdida de peso de cada persona son diferentes. Y
                dependen de muchos factores. Pero un resultado promedio es de
                5-6 kg por maratón, perdiendo el peso de forma saludable,
                adquiriendo hábitos saludables, aprendiendo a cocinar sano y sin
                efecto “rebote”.
              </p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>
                ¿Cuánto tiempo estará abierto el acceso a todos los materiales?
              </summary>
              <p className='faq-item-a'>
                El acceso a tu ÁREA PERSONAL y a toda la información es limitado
                y es de 35 días desde el inicio del maratón.
              </p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>
                ¿Cómo recibiré cosmética que viene de regalo?
              </summary>
              <p className='faq-item-a'>
                Al comprar el maratón con REGALO deberás rellenar el formulario
                con tu dirección postal a la que te enviaremos la cosmética.
                RECUERDA que el envío tiene un coste adicional que se sumara al
                precio final. Enviaremos el producto a los 2-3 días siguientes
                de la adquisición y lo recibirás en el tiempo estipulado
                mencionado en el formulario.
              </p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>
                ¿Cómo puedo ganar el IPhone?
              </summary>
              <p className='faq-item-a'>
                El premio final lo obtendrá la participante con el mejor
                resultado.
              </p>
            </details>

            <details className='faq-item'>
              <summary className='faq-item-q'>
                ¿Cómo se elegirá la ganadora?
              </summary>
              <p className='faq-item-a'>
                Cada participante tendrá que subir sus fotos en la primera
                semana del maratón y en los 3 días después de acabarlo. Todas
                las fotos se subirán a la plataforma donde todas las
                participantes tendrán 10 votos para votar los mejores resultados
                a su parecer. Se escogerán las 10 más votadas, de las cuales el
                jurado de BODYMARATON elegirá el mejor resultado a su parecer.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
