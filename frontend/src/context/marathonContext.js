import React, { createContext, useContext, useState } from 'react';

const MarathonContext = createContext();

export const MarathonProvider = ({ children }) => {
  const [marathon, setMarathon] = useState(null);
  const [marathonId, setMarathonId] = useState(null);
  const [dayDetails, setDayDetails] = useState(null);
  const [dayDetailsLoading, setDayDetailsLoading] = useState(null);

  const updateMarathon = newMarathon => {
    setMarathon(newMarathon);
    setMarathonId(newMarathon?._id);
  };

  return (
    <MarathonContext.Provider
      value={{
        marathon,
        updateMarathon,
        marathonId,
        setMarathonId,
        dayDetails,
        setDayDetails,
        dayDetailsLoading,
        setDayDetailsLoading,
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
