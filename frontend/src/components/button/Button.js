import React from 'react';
import Text from '../text/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({
  className = '',
  children,
  onClick,
  isPrimary = false,
  isSecondary = false,
  isThird = false,
  isLink = false,
  isActive = false,
  iconRight,
  iconLeft,
  type = 'button',
  center = false,
  disabled,
  onlyIcon = false,
  small = false,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`button ${className} ${isPrimary ? 'primary' : ''} ${
        isSecondary ? 'secondary' : ''
      } ${isThird ? 'third' : ''} ${isLink ? 'link' : ''} ${
        isActive ? 'active' : ''
      } ${center ? 'center' : ''} ${onlyIcon ? 'only-icon' : ''} ${
        small ? 'small' : ''
      }`}
    >
      {iconLeft && <FontAwesomeIcon icon={iconLeft} className='left' />}

      {!onlyIcon && <Text isCTA>{children}</Text>}

      {iconRight && <FontAwesomeIcon icon={iconRight} className='right' />}
    </button>
  );
}

export default Button;
