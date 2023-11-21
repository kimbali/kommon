import React, { createContext, useContext, useState } from 'react';

const MarathonContext = createContext();

export const MarathonProvider = ({ children }) => {
  const [marathonContext, setMarathonContext] = useState(null);
  const [marathonId, setMarathonId] = useState(null);

  const updateMarathonContext = newMarathonId => {
    setMarathonContext(newMarathonId);
  };

  return (
    <MarathonContext.Provider
      value={{
        marathonContext,
        updateMarathonContext,
        marathonId,
        setMarathonId,
      }}
    >
      {children}
    </MarathonContext.Provider>
  );
};

export const useMarathon = () => {
  const context = useContext(MarathonContext);

  if (!context) {
    throw new Error('useMarathon must be used within a MarathonProvider');
  }

  return context;
};

//  const { marathonId, updateMarathonId } = useMarathon();
