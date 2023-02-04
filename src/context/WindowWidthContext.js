import { createContext, useState, useContext, useEffect } from "react";

const WindowWidthContext = createContext(null);

export const useWindowWidthContextContext = () => {
   const context = useContext(WindowWidthContext);

   if (context === undefined) {
      throw new Error('Appcontext must be within appContextProvider')
   }

   return context;
}

const WindowWidthContextProvider = ({ children }) => {
   const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 480;
  const isDesktop = width >= 1280;

   return ( 
      <WindowWidthContext.Provider value={{
         isMobile,
         isDesktop
      }}>
         {children}
      </WindowWidthContext.Provider>
    );
}
 
export default WindowWidthContextProvider;