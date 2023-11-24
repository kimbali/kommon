import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PlanningSelector from '../components/marathon/PlanningSelector';
import Space from '../components/space/Space';
import Text from '../components/text/Text';
import frontRoutes from '../config/frontRoutes';
import { useMarathon } from '../context/marathonContext';
import { useSelector } from 'react-redux';
import MeditationCard from '../components/meditation/MeditationCard';

function Meditations({ setCurrentDay }) {
  const [handleSelectDay, isError] = useOutletContext();
  const { userInfo } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const { dayDetails, marathon } = useMarathon();
  const [meditationsList, setMeditationsList] = useState([]);

  useEffect(() => {
    if (dayDetails) {
      setMeditationsList(dayDetails.meditations);
    }
  }, [dayDetails]);

  const handleDayChange = day => {
    handleSelectDay(day);
  };

  const handleSelectLevel = level => {
    let list = dayDetails.meditations;

    if (level) {
      list = list.filter(ele => ele.level === level);
    }

    setMeditationsList(list);
  };

  const navigateToDetails = meditation => {
    navigate(frontRoutes.meditationDetailsMain.replace(':id', meditation._id));
  };

  if (!marathon) {
    return null;
  }

  return (
    <div>
      <Text isTitle>Your meditations for today</Text>

      <Space medium />

      <PlanningSelector
        marathon={marathon}
        setCurrentDay={handleDayChange}
        baseUrl={frontRoutes.meditations}
        isFrontoffice
      />

      <Space big />

      {isError && userInfo.isAdmin && (
        <div>You should configure this day on the backoffice</div>
      )}

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
