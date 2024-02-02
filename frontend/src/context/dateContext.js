import React, { createContext, useContext, useEffect, useState } from 'react';

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [outOfMarathon, setOutOfMarathon] = useState(false);
  const [currentDate, setCurrentDate] = useState();
  const [currentWeek, setCurrentWeek] = useState({ value: 1 });
  const [monthArray, setMonthArray] = useState();
  const [currentDay, setCurrentDay] = useState();

  useEffect(() => {
    if (currentDate?.week && currentDate?.weekDay) {
      setOutOfMarathon(true);
    }
  }, [currentDay]);

  return (
    <DateContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        currentDay,
        setCurrentDay,
        currentWeek,
        setCurrentWeek,
        monthArray,
        setMonthArray,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => {
  const context = useContext(DateContext);

  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }

  return context;
};
