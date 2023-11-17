import React from 'react';

function Spinner({ type = '' }) {
  return (
    // <div className={type}>
    //   <div></div>
    // </div>

    <div className={type}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
