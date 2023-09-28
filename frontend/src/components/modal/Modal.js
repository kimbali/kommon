import React, { useEffect } from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPortal } from 'react-dom';

function Modal({
  onClose,
  children,
  scroll = false,
  className = '',
  isSecondary = false,
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  return createPortal(
    <div
      className={`modal ${className}${isSecondary ? ' secondary-modal' : ''}`}
    >
      <div className={`modal-content ${scroll ? 'scroll' : ''}`}>
        <button className='close-icon' onClick={() => onClose(false)}>
          <FontAwesomeIcon icon={faClose} />
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
