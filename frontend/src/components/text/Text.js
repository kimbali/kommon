import React from 'react';
import '../../styles/common/mixins.scss';
import './text.scss';
import Button from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Text({
  isTitle = false,
  isSubtitle = false,
  isSectionTitle = false,
  sectionIcon,
  sectionIconClick,
  isCTA = false,
  isPlaceholder = false,
  isBold = false,
  isUppercase = false,
  children,
  danger = false,
  small = false,
  isCurrency = false,
  center = false,
  className = '',
  color = '',
  line = false,
  fontSize = '',
  error,
}) {
  if (isTitle) {
    return (
      <h2 className={`title ${className} ${color} ${center ? 'center' : ''}`}>
        {children}
      </h2>
    );
  }

  if (isSubtitle) {
    return (
      <h3
        className={`subtitle ${className} ${color} ${center ? 'center' : ''}`}
      >
        {children}
      </h3>
    );
  }

  if (isSectionTitle) {
    return (
      <div className={`${className} ${center ? 'center' : ''} section-title`}>
        <div className='section-title__title'>
          <h3 className='section-title__text'>{children}</h3>

          {sectionIcon && (
            <Button onClick={sectionIconClick}>
              <FontAwesomeIcon icon={sectionIcon} />
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (line) {
    return <div className='text line' />;
  }

  return (
    <p
      className={`text ${className} ${isBold ? 'bold' : ''} ${
        isUppercase ? 'uppercase' : ''
      } ${isCTA ? 'cta' : ''} ${isPlaceholder ? 'decolored' : ''} ${
        danger ? 'danger' : ''
      } ${error ? 'error' : ''} ${small ? 'small' : ''} ${
        isCurrency ? 'align-right' : ''
      } ${center ? 'center' : ''} ${color} ${`font-${fontSize}`}`}
    >
      {children}
    </p>
  );
}

export default Text;
