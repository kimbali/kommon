import React, { useEffect, useState } from 'react';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import Button from '../components/button/Button';
import Modal from '../components/modal/Modal';
import BodyParametersForm from '../components/progress/BodyParametersForm';
import { useTranslation } from 'react-i18next';
import BodyParameter from '../components/progress/BodyParameter';
import { useProgress } from '../context/progressContext';
import { useDate } from '../context/dateContext';

function Progress() {
  const { t } = useTranslation();

  const { updateUserProgress, userProgress } = useProgress();
  const { monthArray } = useDate();

  const [showModal, setShowModal] = useState();
  const [weeksDates, setWeeksDates] = useState([]);

  useEffect(() => {
    if (monthArray) {
      const weekColumns = monthArray.reduce((acc, ele) => {
        let accUpdated = acc;

        accUpdated.push({
          start: ele[0].getDate(),
          end: ele[ele.length - 1].getDate(),
        });

        return accUpdated;
      }, []);

      setWeeksDates(weekColumns);
    }
  }, [monthArray, userProgress]);

  const handleOnSave = progress => {
    setShowModal();
    updateUserProgress(progress);
  };

  return (
    <div>
      <Text isTitle>{t('yourProgress')}</Text>

      {!userProgress && (
        <>
          <Space medium />
          <Text>{t('joinToAMaraton')}</Text>
        </>
      )}

      <Space medium />

      <Button
        disabled={!userProgress}
        isPrimary
        onClick={() => setShowModal(true)}
      >
        {t('addParameters')}
      </Button>

      <Space medium />

      <div className='progress-graphs'>
        <BodyParameter
          title={t('weight')}
          progress={userProgress?.weight}
          measure='kg'
          weeksDates={weeksDates}
        />

        <BodyParameter
          title={t('waist')}
          progress={userProgress?.waist}
          measure='cm'
          weeksDates={weeksDates}
        />

        <BodyParameter
          title={t('chest')}
          progress={userProgress?.chest}
          measure='cm'
          weeksDates={weeksDates}
        />

        <BodyParameter
          title={t('buttocks')}
          progress={userProgress?.buttocks}
          measure='cm'
          weeksDates={weeksDates}
        />
      </div>

      <Space big />

      {showModal && (
        <Modal isSecondary onClose={setShowModal}>
          <BodyParametersForm onSave={handleOnSave} />
        </Modal>
      )}
    </div>
  );
}

export default Progress;
