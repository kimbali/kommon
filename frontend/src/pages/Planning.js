import React from 'react';
import MarathonSelector from '../components/marathonSelector/MarathonSelector';
import Text from '../components/text/Text';
import Space from '../components/space/Space';

function Planning() {
  return (
    <div>
      <Text isTitle>Marathons configuration</Text>

      <Space medium />

      <MarathonSelector />
    </div>
  );
}

export default Planning;
