import React, { useState } from 'react';
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
  const { marathon } = useMarathon();
  const navigate = useNavigate();
  const [today] = useState(new Date().toISOString());

  const { data: marathonsData } = useGetMarathonsQuery({
    isActive: true,
    startDate: today,
  });

  const handleSelectMarathon = marathon => {
    navigate(`${frontRoutes.userPayment}?${MARATHON_ID}=${marathon._id}`);
  };

  return (
    <div>
      <Text isTitle>{t('yourMarathons')}</Text>

      <Space medium />

      <Text isSubtitle>{t('yourCurrentMarathon')}</Text>

      <Space medium />

      <div className='user-marathons'>
        <MarathonCard
          marathon={marathon}
          handleSelectMarathon={handleSelectMarathon}
          isCurrent
        />
      </div>

      <Space big />

      <Text isSubtitle>{t('nextMarathons')}</Text>

      <Space medium />

      {marathonsData?.marathons?.length > 0 &&
        marathonsData?.marathons
          .filter(ele => ele._id !== marathon?._id)
          .map((ele, i) => (
            <div className='user-marathons'>
              <MarathonCard
                marathon={ele}
                handleSelectMarathon={handleSelectMarathon}
                key={`marathon-card-${i}`}
              />
            </div>
          ))}
    </div>
  );
}

export default UserMarathons;
