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
import { faCalendarDays, faEdit } from '@fortawesome/free-solid-svg-icons';
import frontRoutes from '../../config/frontRoutes';
import { useMarathon } from '../../context/marathonContext';
import { MARATHON_ID } from '../../config/constants';
import { useTranslation } from 'react-i18next';

function MarathonSelector() {
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
    updateMarathon(marathon);
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

  const handleGoToLiveMarathon = marahton => {
    navigate(`${frontRoutes.main}?${MARATHON_ID}=${marahton._id}`, {
      replace: true,
    });
  };

  return (
    <>
      <div className='marathon-selector-buttons'>
        <div className='buttons-container'>
          <Input
            placeholder={t('selectMarathon')}
            isSingleSelect
            options={marathonOptions}
            onChange={handleMarathonChange}
            selectedOption={marathonSelected}
            name='marathon'
          />

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

        <div className='buttons-container'>
          {marathonSelected && (
            <Button
              className='edit-marathon'
              isPrimary
              iconLeft={faEdit}
              onClick={() => setShowNewMarathonModal(true)}
            >
              {t('marathon')}
            </Button>
          )}

          {marathonSelected?.value && (
            <Button
              onClick={() => handleGoToLiveMarathon(marathonSelected?.value)}
              isSecondary
              className='simulacion'
            >
              {t('goToLive')}
            </Button>
          )}
        </div>
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
