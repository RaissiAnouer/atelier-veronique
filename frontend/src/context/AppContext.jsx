import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [cart, setCart] = useState([]);

  const clearUser = () => {
    setUser(null);
  };

  const contextValue = {
    user,
    setUser,
    clearUser,
    openCart,
    setOpenCart,
    cart,
    setCart,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
