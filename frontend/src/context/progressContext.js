import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState({});
  const [progressId, setProgressId] = useState(null);

  const updateUserProgress = progressData => {
    setUserProgress(progressData);
  };

  return (
    <ProgressContext.Provider
      value={{
        userProgress,
        updateUserProgress,
        progressId,
        setProgressId,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }

  return context;
};
