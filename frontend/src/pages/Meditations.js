import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PlanningSelector from '../components/marathon/PlanningSelector';
import Space from '../components/space/Space';
import Text from '../components/text/Text';
import frontRoutes from '../config/frontRoutes';
import { useMarathon } from '../context/marathonContext';
import MeditationCard from '../components/meditation/MeditationCard';
import { useUser } from '../context/userContext';
import { useTranslation } from 'react-i18next';

function Meditations() {
  const { t } = useTranslation();
  const [isError] = useOutletContext();
  const { user } = useUser();

  const navigate = useNavigate();
  const { dayDetails, marathon } = useMarathon();
  const [meditationsList, setMeditationsList] = useState([]);

  useEffect(() => {
    if (dayDetails) {
      setMeditationsList(dayDetails.meditations);
    }
  }, [dayDetails]);

  const navigateToDetails = meditation => {
    navigate(frontRoutes.meditationDetailsMain.replace(':id', meditation._id));
  };

  if (!marathon) {
    return null;
  }

  return (
    <div>
      <Text isTitle>{t('todayMeditations')}</Text>

      <Space medium />

      <PlanningSelector baseUrl={frontRoutes.meditations} isFrontoffice />

      <Space big />

      {isError && user.isAdmin && <div>{t('configureInBackoffice')}</div>}

      {!isError &&
        meditationsList.length > 0 &&
        meditationsList.map((ele, i) => (
          <div key={`meditation-${i}`}>
            <MeditationCard data={ele} onClick={() => navigateToDetails(ele)} />

            <Space medium />
          </div>
        ))}
    </div>
  );
}

export default Meditations;
