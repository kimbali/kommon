import React from 'react';
import Modal from './Modal';
import Text from '../text/Text';
import Button from '../button/Button';
import Space from '../space/Space';

function ConfirmModal({
  onConfirm,
  onClose,
  title,
  text,
  description = '',
  confirmLabel = 'Confirm',
}) {
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
          Cancel
        </Button>

        <Button onClick={onConfirm} isPrimary>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
