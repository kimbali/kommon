import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMarathonsQuery } from '../slices/marathonApiSlice';
import Text from '../components/text/Text';
import IMAGE from '../styles/img/main-img.png';
import { formatDateDayMonth } from '../utils/formatDate';
import Button from '../components/button/Button';
import Space from '../components/space/Space';
import frontRoutes from '../config/frontRoutes';
import { MARATHON_ID } from '../config/constants';
import { useMarathon } from '../context/marathonContext';

function UserMarathons() {
  const { setMarathonId } = useMarathon();
  const navigate = useNavigate();

  const { data: marathonsData } = useGetMarathonsQuery({ isActive: true });

  const handleSelectMarathon = marathon => {
    setMarathonId(marathon._id);
    navigate(`${frontRoutes.main}?${MARATHON_ID}=${marathon._id}`);
  };

  return (
    <div>
      <Text isTitle>Tus maratones</Text>

      <Space medium />

      <div className='user-marathons'>
        {marathonsData?.marathons.length > 0 &&
          marathonsData?.marathons.map((ele, i) => (
            <div className='marathon-card' key={`marathon-card-${i}`}>
              <Text isSubtitle>{ele.name}</Text>

              <Space extraSmall />

              <div className='image-container'>
                <img src={IMAGE} alt='body marathon fit girl' />
                <div className='mask' />
              </div>

              <div>
                {formatDateDayMonth(ele.startDate)} -{' '}
                {formatDateDayMonth(ele.endDate)}
              </div>

              <Space extraSmall />

              <Button onClick={() => handleSelectMarathon(ele)} isPrimary>
                Selecciona
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserMarathons;
