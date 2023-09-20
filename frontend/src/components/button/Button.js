import React from 'react';
import Text from '../text/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({
  className = '',
  children,
  onClick,
  isPrimary = false,
  isSecondary = false,
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
      } ${isLink ? 'link' : ''} ${isActive ? 'active' : ''} ${
        center ? 'center' : ''
      } ${onlyIcon ? 'only-icon' : ''} ${small ? 'small' : ''}`}
    >
      {iconLeft && <FontAwesomeIcon icon={iconLeft} />}

      {!onlyIcon && <Text isCTA>{children}</Text>}

      {iconRight && <FontAwesomeIcon icon={iconRight} />}
    </button>
  );
}

export default Button;
