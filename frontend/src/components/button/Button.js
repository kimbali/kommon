import React from 'react';
import Text from '../text/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({
  big = false,
  center = false,
  children,
  className = '',
  disabled,
  iconLeft,
  iconRight,
  isActive = false,
  isLink = false,
  isPrimary = false,
  isSecondary = false,
  isThird = false,
  onClick,
  onlyIcon = false,
  small = false,
  type = 'button',
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
      } ${big ? 'big' : ''}`}
    >
      {iconLeft && <FontAwesomeIcon icon={iconLeft} className='left' />}

      {!onlyIcon && <Text isCTA>{children}</Text>}

      {iconRight && <FontAwesomeIcon icon={iconRight} className='right' />}
    </button>
  );
}

export default Button;
