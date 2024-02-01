import React, { createContext, useContext, useState } from 'react';

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState();

  return (
    <DateContext.Provider
      value={{
        currentDate,
        setCurrentDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => {
  const context = useContext(DateContext);

  if (!context) {
    throw new Error('useMarathon must be used within a MarathonProvider');
  }

  return context;
};
