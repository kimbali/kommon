import React from 'react';
import './text.scss';
import Button from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Text({
  isTitle,
  isSubtitle,
  isSectionTitle,
  sectionIcon,
  sectionIconClick,
  isCTA,
  isPlaceholder,
  isBold,
  children,
  danger,
  small,
  isCurrency,
  center,
  className = '',
}) {
  if (isTitle) {
    return (
      <h2 className={`title ${className} ${center ? 'center' : ''}`}>
        {children}
      </h2>
    );
  }

  if (isSubtitle) {
    return (
      <h3 className={`subtitle  ${className} ${center ? 'center' : ''}`}>
        {children}
      </h3>
    );
  }

  if (isSectionTitle) {
    return (
      <div className='section-title'>
        <div className='section-title__title'>
          <h3 className='section-title__text'>{children}</h3>

          {sectionIcon && (
            <Button onClick={sectionIconClick}>
              <FontAwesomeIcon icon={sectionIcon} />
            </Button>
          )}
        </div>

        <div className='section-title__line'></div>
      </div>
    );
  }

  return (
    <p
      className={`text ${className} ${isBold ? 'bold' : ''} ${
        isCTA ? 'uppercase' : ''
      } ${isPlaceholder ? 'decolored' : ''} ${danger ? 'danger' : ''} ${
        small ? 'small' : ''
      } ${isCurrency ? 'align-right' : ''} ${center ? 'center' : ''}`}
    >
      {children}
    </p>
  );
}

export default Text;
