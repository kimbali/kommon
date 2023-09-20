import React from 'react';
import Modal from './Modal';
import Text from '../text/Text';
import Button from '../button/Button';
import Space from '../space/Space';

function ConfirmModal({ onConfirm, onClose, title, text }) {
  return (
    <Modal onClose={onClose}>
      <Text isTitle>{title}</Text>

      <Space extraSmall />

      <Text>{text}</Text>

      <Space medium />

      <div className='content-on-the-right'>
        <Button onClick={() => onClose(false)} isSecondary>
          Cancel
        </Button>

        <Button onClick={onConfirm} isPrimary>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
