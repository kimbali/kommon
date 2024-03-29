import React from 'react';
import Modal from './Modal';
import Text from '../text/Text';
import Button from '../button/Button';
import Space from '../space/Space';
import { useTranslation } from 'react-i18next';

function ConfirmModal({
  onConfirm,
  onClose,
  title,
  text,
  description = '',
  confirmLabel,
  disableConfirm = false,
}) {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose} isSecondary>
      <Text isTitle>{title}</Text>

      <Space extraSmall />

      <Text>{text}</Text>

      {description && (
        <>
          <Space small />
          <Text>{description}</Text>
        </>
      )}

      <Space medium />

      <div className='content-on-the-right'>
        <Button onClick={() => onClose(false)} isSecondary>
          {t('cancel')}
        </Button>

        <Button disabled={disableConfirm} onClick={onConfirm} isPrimary>
          {confirmLabel || t('confirma')}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
