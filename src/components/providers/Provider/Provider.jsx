import { createContext, useContext } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export const useProvider = () => useContext(Context);
