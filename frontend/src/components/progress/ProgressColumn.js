import React from 'react';
import Text from '../text/Text';

function ProgressColumn({ total, date }) {
  return (
    <div className='progress-column'>
      <div
        className={`column ${total ? '' : 'empty'}`}
        style={{ height: `${total || 100}%` }}
      ></div>

      <Text>
        {date?.start}-{date?.end}
      </Text>
    </div>
  );
}

export default ProgressColumn;
