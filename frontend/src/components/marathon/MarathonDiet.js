import React, { useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from '../modal/Modal';

function MarathonDiet({ marathon }) {
  const [showDietModal, setShowDietModal] = useState(false);

  return (
    <div>
      <Text
        isSectionTitle
        sectionIcon={faEdit}
        sectionIconClick={() => setShowDietModal(true)}
      >
        Diet
      </Text>

      {!marathon && <Text>There is no diet yet</Text>}

      <Space small />

      {showDietModal && <Modal onClose={setShowDietModal}>yep</Modal>}
    </div>
  );
}

export default MarathonDiet;
