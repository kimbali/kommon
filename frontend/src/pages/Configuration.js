import React from 'react';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import RegionsList from '../components/config/RegionsList';

function Configuration() {
  return (
    <div>
      <Text isTitle>Configuration</Text>

      <Space big />

      <RegionsList />
    </div>
  );
}

export default Configuration;
