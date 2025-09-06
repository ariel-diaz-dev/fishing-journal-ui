import React from 'react';
import { useToast } from './useToast';
import Toast from './index';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 1100 }}>
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            marginBottom: '10px',
            marginTop: index === 0 ? '20px' : '0'
          }}
        >
          <Toast
            id={toast.id}
            text={toast.text}
            variant={toast.variant}
            onDismiss={removeToast}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;