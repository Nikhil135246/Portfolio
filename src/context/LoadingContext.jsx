import { createContext, useContext } from "react";

// Context to share loading state across components
export const LoadingContext = createContext({
  isLoaded: false,
});

export const useLoadingContext = () => useContext(LoadingContext);
