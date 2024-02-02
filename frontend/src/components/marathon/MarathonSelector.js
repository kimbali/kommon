import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../input/Input';
import Modal from '../modal/Modal';
import { useGetMarathonsQuery } from '../../slices/marathonApiSlice';
import Button from '../button/Button';
import MarathonForm from './MarathonForm';
import Text from '../text/Text';
import formatDate from '../../utils/formatDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faEdit,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import frontRoutes from '../../config/frontRoutes';
import { useMarathon } from '../../context/marathonContext';
import { MARATHON_ID } from '../../config/constants';
import { useTranslation } from 'react-i18next';

function MarathonSelector({ setMarathon }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { marathonId, updateMarathon, setMarathonId } = useMarathon();

  const [marathonOptions, setmarathonOptions] = useState([]);
  const [marathonSelected, setMarathonSelected] = useState(null);
  const [showNewMarathonModal, setShowNewMarathonModal] = useState(false);

  const { data: marathonsData, refetch: refetchMarathons } =
    useGetMarathonsQuery({});

  const handleMarathonChange = ({ value }) => {
    setMarathonSelected({ label: value.name || value.startDate, value });

    navigate(`${frontRoutes.planning}?${MARATHON_ID}=${value._id}`, {
      replace: true,
    });
  };

  const createMarathonOptions = () => {
    const options = marathonsData?.marathons.map((ele, index) => {
      return { label: ele.name || `${t('marathon')} ${index}`, value: ele };
    });

    setmarathonOptions(options);
    return options;
  };

  useEffect(() => {
    const options = createMarathonOptions();

    if (marathonId) {
      const marathonSelectedByID = options?.find(
        ele => ele.value._id === marathonId
      );

      if (marathonSelectedByID) {
        setMarathonSelected(marathonSelectedByID);
        updateMarathon(marathonSelectedByID.value);
      }
    }
  }, [marathonsData, marathonId]);

  const handleOnConfirmMarathon = marathon => {
    const currentMarathon = marathon
      ? {
          label: marathon.name,
          value: marathon,
        }
      : null;

    setMarathonSelected(currentMarathon);
    setMarathon(marathon);
    setShowNewMarathonModal(false);
    refetchMarathons();

    if (marathon) {
      navigate(
        `${frontRoutes.planning}?${MARATHON_ID}=${marathon?._id || ''}`,
        {
          replace: true,
        }
      );
    } else {
      setMarathonId('');
      navigate(`${frontRoutes.planning}`, {
        replace: true,
      });
    }
  };

  const handleNewMarathon = () => {
    setShowNewMarathonModal(true);
    setMarathonSelected(null);
    setMarathon(null);
  };

  const handleGoToLiveMarathon = marahton => {
    navigate(`${frontRoutes.main}?${MARATHON_ID}=${marahton._id}`, {
      replace: true,
    });
  };

  return (
    <>
      <div className='content-left-and-right'>
        <div className='buttons-container'>
          <Button iconLeft={faPlus} isPrimary onClick={handleNewMarathon}>
            {t('newMarathon')}
          </Button>

          <Input
            placeholder={t('selectMarathon')}
            isSingleSelect
            options={marathonOptions}
            onChange={handleMarathonChange}
            selectedOption={marathonSelected}
            name='marathon'
          />

          {marathonSelected && (
            <Button
              isSecondary
              iconLeft={faEdit}
              onClick={() => setShowNewMarathonModal(true)}
            >
              {t('marathon')}
            </Button>
          )}

          {marathonSelected && (
            <div className='marathon-details'>
              <div>
                <Text>
                  <span>{t('marathonPlan')}: </span>
                  {marathonSelected.value.planning?.name}
                </Text>
              </div>

              <div className='start-end-date'>
                <span>
                  <FontAwesomeIcon icon={faCalendarDays} />
                </span>
                <Text>{formatDate(marathonSelected?.value.startDate)}</Text>
                <Text>-</Text>
                <Text>{formatDate(marathonSelected?.value.endDate)}</Text>
              </div>
            </div>
          )}
        </div>

        {marathonSelected?.value && (
          <div>
            <Button
              onClick={() => handleGoToLiveMarathon(marathonSelected?.value)}
              isSecondary
            >
              {t('goToLive')}
            </Button>
          </div>
        )}
      </div>

      {showNewMarathonModal && (
        <Modal onClose={setShowNewMarathonModal} isSecondary>
          <MarathonForm
            onSucces={handleOnConfirmMarathon}
            onCancel={() => setShowNewMarathonModal(false)}
            marathon={marathonSelected?.value}
          />
        </Modal>
      )}
    </>
  );
}

export default MarathonSelector;
