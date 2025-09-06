class ToastManager {
  constructor() {
    this.toasts = [];
    this.listeners = [];
    this.nextId = 1;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  emit() {
    this.listeners.forEach(listener => listener(this.toasts));
  }

  showToast(text, variant = 'info') {
    const toast = {
      id: this.nextId++,
      text,
      variant,
      timestamp: Date.now()
    };
    
    this.toasts.push(toast);
    this.emit();

    // Auto-remove after 4 seconds
    setTimeout(() => {
      this.removeToast(toast.id);
    }, 4000);

    return toast.id;
  }

  removeToast(id) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.emit();
  }

  successToast(text) {
    return this.showToast(text, 'success');
  }

  errorToast(text) {
    return this.showToast(text, 'fail');
  }

  infoToast(text) {
    return this.showToast(text, 'info');
  }
}

const toastManager = new ToastManager();
export default toastManager;