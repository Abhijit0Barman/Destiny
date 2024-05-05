import React, { useContext, createContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined)

  const {isError}=useQuery("validateToken",apiClient.validateToken,{
    retry:false
  })

  return (
    <AppContext.Provider value={{
      showToast: (toastMessage) => {
        // console.log(toastMessage);
        setToast(toastMessage);
      },
    }}>
      {toast && (<Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />)}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
