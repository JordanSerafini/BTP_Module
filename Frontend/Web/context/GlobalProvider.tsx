import React, { useState } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalContext, { GlobalContextType, ToastType } from "./GlobalContext";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<string>("Home");

  const setToast = (message: string, type: ToastType = "info", options?: ToastOptions) => {
    const toastTypes = {
      info: toast.info,
      success: toast.success,
      warning: toast.warning,
      error: toast.error,
    };

    toastTypes[type](message, options);
  };

  const contextValue: GlobalContextType = { setToast, content, setContent };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
