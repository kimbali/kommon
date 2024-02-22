import React from 'react';
import Text from '../text/Text';

function ProgressColumn({ total, text }) {
  return (
    <div className='progress-column'>
      <div
        className={`column ${total ? '' : 'empty'}`}
        style={{ height: `${total || 100}%` }}
      ></div>

      <Text>{text}</Text>
    </div>
  );
}

export default ProgressColumn;
