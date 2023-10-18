import React from 'react';
import MarathonSelector from '../components/marathon/MarathonSelector';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import PlanningSelector from '../components/marathon/PlanningSelector';

function Planning() {
  return (
    <div>
      <Text isTitle>Marathons configuration</Text>

      <Space medium />

      <MarathonSelector />

      <Space medium />

      <PlanningSelector />
    </div>
  );
}

export default Planning;
