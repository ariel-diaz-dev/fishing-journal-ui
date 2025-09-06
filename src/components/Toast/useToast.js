import { useEffect, useState } from 'react';
import toastManager from './toastManager';

export const useToast = () => {
  const [toasts, setToasts] = useState(toastManager.toasts);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return unsubscribe;
  }, []);

  return {
    toasts,
    showToast: toastManager.showToast.bind(toastManager),
    successToast: toastManager.successToast.bind(toastManager),
    errorToast: toastManager.errorToast.bind(toastManager),
    infoToast: toastManager.infoToast.bind(toastManager),
    removeToast: toastManager.removeToast.bind(toastManager)
  };
};

// Static methods for use outside components
export const toast = {
  showToast: toastManager.showToast.bind(toastManager),
  successToast: toastManager.successToast.bind(toastManager),
  errorToast: toastManager.errorToast.bind(toastManager),
  infoToast: toastManager.infoToast.bind(toastManager)
};