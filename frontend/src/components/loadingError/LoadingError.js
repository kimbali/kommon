import React from 'react';
import Spinner from '../spinner/Spinner';

function LoadingError({ isLoading, isError }) {
  return (
    <div>
      {isLoading && <Spinner />}

      {isError && <p>{isError?.data?.message || isError.error}</p>}
    </div>
  );
}

export default LoadingError;
