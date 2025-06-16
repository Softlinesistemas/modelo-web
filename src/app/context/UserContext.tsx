'use client'

import React, { createContext, useState, ReactNode } from 'react';

type AppContextType = {
  showMenu: boolean;
  setShowMenu: (value: boolean) => void;
  showShare: boolean;
  setShowShare: (value: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  showMenu: false,
  setShowMenu: () => {},
  showShare: false,
  setShowShare: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showShare, setShowShare] = useState(false);

  return (
    <AppContext.Provider value={{ showMenu, setShowMenu, showShare, setShowShare }}>
      {children}
    </AppContext.Provider>
  );
};
