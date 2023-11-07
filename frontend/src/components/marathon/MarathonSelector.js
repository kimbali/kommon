import React, { useEffect, useState } from 'react';
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
import Space from '../space/Space';

function MarathonSelector({ setMarathon, planName }) {
  const [marathonOptions, setmarathonOptions] = useState([]);
  const [marathonSelected, setMarathonSelected] = useState(null);
  const [showNewMarathonModal, setShowNewMarathonModal] = useState(false);

  const { data: marathonsData, refetch: refetchMarathons } =
    useGetMarathonsQuery({});

  useEffect(() => {
    const options = marathonsData?.marathons.map((ele, index) => {
      return { label: ele.name || `Marathon ${index}`, value: ele };
    });

    setmarathonOptions(options);
  }, [marathonsData]);

  const handleMarathonChange = ({ value }) => {
    setMarathonSelected({ label: value.name || value.startDate, value });
    setMarathon(value);
  };

  const handleOnConfirmMarathon = marathon => {
    const currentMarathon = marathon
      ? {
          label: marathon.name,
          value: marathon,
        }
      : null;

    setMarathonSelected(currentMarathon);
    setMarathon(currentMarathon.value);
    setShowNewMarathonModal(false);
    refetchMarathons();
  };

  const handleNewMarathon = () => {
    setShowNewMarathonModal(true);
    setMarathonSelected(null);
    setMarathon(null);
  };

  return (
    <>
      <div className='content-left-and-right'>
        <div className='buttons-container'>
          <Button iconLeft={faPlus} isPrimary onClick={handleNewMarathon}>
            New marathon
          </Button>

          <Input
            placeholder='Select a marathon'
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
              Marathon
            </Button>
          )}

          {marathonSelected && (
            <div className='marathon-details'>
              <div>
                <Text>
                  <span>Marathon plan:</span> {planName}
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
