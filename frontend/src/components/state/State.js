import React from 'react';
import PropTypes from 'prop-types';
import Text from '../text/Text';

export const stateItem = {
  ACTIVE: 'Abierto',
  PENDING: 'Completado',
  SUCCESS: 'Pagado',
};

function State({ state }) {
  const getLabel = () => {
    if (state === stateItem.ACTIVE) return 'Abierto';
    if (state === stateItem.PENDING) return 'Pendiente';
    if (state === stateItem.SUCCESS) return 'Finalizado';
  };

  const getStatusClass = () => {
    if (state === stateItem.ACTIVE) return 'active';
    if (state === stateItem.PENDING) return 'pending';
    if (state === stateItem.SUCCESS) return 'success';
  };

  return (
    <div className={`state-pill ${getStatusClass()}`}>
      <Text>{getLabel()}</Text>
    </div>
  );
}

State.propTypes = {
  state: PropTypes.oneOf([
    stateItem.ACTIVE,
    stateItem.PENDING,
    stateItem.SUCCESS,
  ]).isRequired,
};

export default State;
