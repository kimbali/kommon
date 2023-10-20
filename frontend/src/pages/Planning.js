import React, { useState } from 'react';
import MarathonSelector from '../components/marathon/MarathonSelector';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import PlanningSelector from '../components/marathon/PlanningSelector';
import MarathonDiet from '../components/marathon/MarathonDiet';

function Planning() {
  const [currentMarathon, setCurrentMarathon] = useState();

  return (
    <div>
      <Text isTitle>Marathons configuration</Text>

      <Space medium />

      <MarathonSelector setMarathon={setCurrentMarathon} />

      <Space medium />

      <Text isSectionTitle />

      <Space medium />

      {currentMarathon && <PlanningSelector marathon={currentMarathon} />}

      <Space medium />

      {currentMarathon && <MarathonDiet marathon={currentMarathon} />}
    </div>
  );
}

export default Planning;