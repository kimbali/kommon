import React, { createContext, useContext, useState } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  const updateConfig = newConfig => {
    setConfig(newConfig);
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        landingConfig: config?.landingConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }

  return context;
};
