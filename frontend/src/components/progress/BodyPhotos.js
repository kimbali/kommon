import React from 'react';
import BodyTemplate from './BodyTemplate';
import { useTranslation } from 'react-i18next';
import FRONT_SILUETE from '../../styles/assets/siluete_frente.png';
import BACK_SILUETE from '../../styles/assets/siluete_dorso.png';
import LATERAL_SILUETE from '../../styles/assets/siluete_perfil.png';

function BodyPhotos({ photos, download }) {
  const { t } = useTranslation();

  return (
    <div className='body-fotos'>
      <BodyTemplate
        title={t('front')}
        photo={photos?.front}
        siluete={FRONT_SILUETE}
        download={download}
      />
      <BodyTemplate
        title={t('lateral')}
        photo={photos?.lateral}
        siluete={LATERAL_SILUETE}
        download={download}
      />
      <BodyTemplate
        title={t('back')}
        photo={photos?.back}
        siluete={BACK_SILUETE}
        download={download}
      />
    </div>
  );
}

export default BodyPhotos;
