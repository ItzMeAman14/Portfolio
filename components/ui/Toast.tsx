"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface ToastContextType {
  showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const showToast = useCallback((msg: string, duration = 2500) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        id="toast-msg"
        role="status"
        aria-live="polite"
        className={visible ? "show" : ""}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}
