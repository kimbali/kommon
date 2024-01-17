import React, { useState } from 'react';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import Button from '../components/button/Button';
import Modal from '../components/modal/Modal';
import BodyParametersForm from '../components/progress/BodyParametersForm';
import { useTranslation } from 'react-i18next';

function Progress() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState();

  return (
    <div>
      <Text isTitle>{t('yourProgress')}</Text>

      <Space medium />

      <Button isPrimary onClick={() => setShowModal(true)}>
        {t('addParameters')}
      </Button>

      {showModal && (
        <Modal isSecondary onClose={setShowModal}>
          <BodyParametersForm />
        </Modal>
      )}
    </div>
  );
}

export default Progress;
