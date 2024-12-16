import { createContext, Dispatch, SetStateAction } from "react";
import { ToastOptions } from "react-toastify";

export type ToastType = "info" | "success" | "warning" | "error";

export interface GlobalContextType {
  setToast: (message: string, type?: ToastType, options?: ToastOptions) => void;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export default GlobalContext;
