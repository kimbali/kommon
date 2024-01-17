import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMarathonsQuery } from '../slices/marathonApiSlice';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import frontRoutes from '../config/frontRoutes';
import { MARATHON_ID } from '../config/constants';
import { useMarathon } from '../context/marathonContext';
import MarathonCard from '../components/marathon/MarathonCard';
import { useTranslation } from 'react-i18next';

function UserMarathons() {
  const { t } = useTranslation();
  const { setMarathonId } = useMarathon();
  const navigate = useNavigate();

  const { data: marathonsData } = useGetMarathonsQuery({ isActive: true });

  const handleSelectMarathon = marathon => {
    setMarathonId(marathon._id);
    navigate(`${frontRoutes.main}?${MARATHON_ID}=${marathon._id}`);
  };

  return (
    <div>
      <Text isTitle>{t('yourMarathons')}</Text>

      <Space medium />

      <div className='user-marathons'>
        {marathonsData?.marathons.length > 0 &&
          marathonsData?.marathons.map((ele, i) => (
            <MarathonCard
              marathon={ele}
              handleSelectMarathon={handleSelectMarathon}
              key={`marathon-card-${i}`}
            />
          ))}
      </div>
    </div>
  );
}

export default UserMarathons;
