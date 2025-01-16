import React, { useState, useMemo, useCallback } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalContext, { ToastType, ModalData } from "./GlobalContext";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<string>("Home");
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [refreshState, setRefreshState] = useState<boolean>(false);

  // Gestion des toasts
  const setToast = useCallback(
    (message: string, type: ToastType = "info", options?: ToastOptions) => {
      const toastTypes = {
        info: toast.info,
        success: toast.success,
        warning: toast.warning,
        error: toast.error,
      };
      toastTypes[type](message, options);
    },
    []
  );

  const refresh = useCallback(() => {
    setRefreshState((prev) => !prev);
  }, []);

  const openModal = useCallback((data: ModalData) => {
    setModalData(data);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalData(null);
    setIsModalOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      setToast,
      content,
      setContent,
      openModal,
      closeModal,
      modalData,
      isModalOpen,
      refresh,
      refreshState,
    }),
    [content, modalData, isModalOpen, refreshState]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
      {isModalOpen && modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 shadow-lg max-w-md w-full">
            {modalData.title && <h2 className="text-lg font-bold mb-2">{modalData.title}</h2>}
            <div className="mb-4">{modalData.content}</div>
            <div className="flex justify-end gap-2">
              {modalData.actions || (
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Fermer
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;