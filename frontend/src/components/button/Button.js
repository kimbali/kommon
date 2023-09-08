import React from 'react';
import Text from '../text/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({
  className = '',
  children,
  onClick,
  isPrimary,
  isSecondary,
  isLink,
  isActive,
  iconRight,
  iconLeft,
  type,
  center,
  disabled,
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
      }`}
    >
      {iconLeft && <FontAwesomeIcon icon={iconLeft} />}

      <Text isCTA>{children}</Text>

      {iconRight && <FontAwesomeIcon icon={iconRight} />}
    </button>
  );
}

export default Button;
