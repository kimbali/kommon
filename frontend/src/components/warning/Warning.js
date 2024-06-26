import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProgress } from '../../context/progressContext';
import { lessThan3DaysDifference } from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import frontRoutes from '../../config/frontRoutes';
import Text from '../text/Text';
import Space from '../space/Space';

function Warning() {
  const { pathname } = useLocation();
  const [showWarning, setShowWarning] = useState(false);
  const { userProgress } = useProgress();

  const hasAllPictures = pics => {
    if (pics && pics.front && pics.lateral && pics.back) {
      return true;
    } else {
      return false;
    }
  };

  const showInThisPath =
    pathname !== frontRoutes.register &&
    pathname !== frontRoutes.profile &&
    pathname !== frontRoutes.home &&
    pathname !== frontRoutes.login &&
    pathname.indexOf('/config/') === -1;

  useEffect(() => {
    setShowWarning(false);

    if (
      lessThan3DaysDifference(userProgress?.marathon?.startDate) &&
      !hasAllPictures(userProgress.initialPhotos) &&
      showInThisPath
    ) {
      setShowWarning('init');
    }

    if (
      lessThan3DaysDifference(userProgress?.marathon?.endDate) &&
      !hasAllPictures(userProgress.photoFinish) &&
      showInThisPath
    ) {
      setShowWarning('fin');
    }
  }, [userProgress, pathname]);

  return (
    showWarning && (
      <div className='warning'>
        {showWarning === 'init' && (
          <div>
            <Text isBold>¡Bienvenida a nuestra maratón de un mes! 🎉</Text>
            <Space extraSmall />
            <Text>
              Para poder apreciar tu progreso, necesitamos que sigas los pasos
              que encontraras en tu perfil y tomes fotos antes y después de la
              maratón.
            </Text>
            <Space extraSmall />
          </div>
        )}

        {showWarning === 'fin' && (
          <div>
            <Text isBold>¡Felicitaciones por completar la maratón! 🎉</Text>
            <Space extraSmall />
            <Text>
              No olvides subir tus fotos finales para comparar tu progreso.
              ¡Estamos ansiosos por ver tus resultados! 📸
            </Text>
            <Space extraSmall />
          </div>
        )}

        <Link className='center' to={frontRoutes.profile}>
          Ver mi perfil
        </Link>
        <Space extraSmall />
      </div>
    )
  );
}

export default Warning;
