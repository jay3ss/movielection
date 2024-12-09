import React from "react";

import { AppContext, AppContextState } from "./AppContext";

export const useAppContext = (): AppContextState => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  return context;
};
