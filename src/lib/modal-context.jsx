import * as React from 'react';
import { getStrictContext } from './get-strict-context';

// Create the modal context
const [ModalProvider, useModalContext] = getStrictContext('ModalProvider');

// Modal state interface
const initialState = {
  isOpen: false,
  type: 'info', // 'success', 'error', 'info'
  title: '',
  message: '',
  duration: null, // Auto-close duration in milliseconds, null for no auto-close
  showCloseButton: true,
  onConfirm: null,
  confirmText: 'OK',
  cancelText: 'Cancel',
  showCancelButton: false,
};

function modalReducer(state, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        ...action.payload,
        isOpen: true,
      };
    case 'HIDE_MODAL':
      return {
        ...state,
        isOpen: false,
      };
    case 'RESET_MODAL':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

// Provider component
function ModalProviderComponent({ children }) {
  const [state, dispatch] = React.useReducer(modalReducer, initialState);

  // Auto-close functionality
  React.useEffect(() => {
    if (state.isOpen && state.duration) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_MODAL' });
      }, state.duration);

      return () => clearTimeout(timer);
    }
  }, [state.isOpen, state.duration]);

  const modalAPI = React.useMemo(() => ({
    // Show success modal
    showSuccess: (title, message, options = {}) => {
      dispatch({
        type: 'SHOW_MODAL',
        payload: {
          type: 'success',
          title,
          message,
          confirmText: 'OK',
          showCancelButton: false,
          ...options,
        },
      });
    },

    // Show error modal
    showError: (title, message, options = {}) => {
      dispatch({
        type: 'SHOW_MODAL',
        payload: {
          type: 'error',
          title,
          message,
          confirmText: 'OK',
          showCancelButton: false,
          ...options,
        },
      });
    },

    // Show info modal
    showInfo: (title, message, options = {}) => {
      dispatch({
        type: 'SHOW_MODAL',
        payload: {
          type: 'info',
          title,
          message,
          confirmText: 'OK',
          showCancelButton: false,
          ...options,
        },
      });
    },

    // Show confirmation modal
    showConfirm: (title, message, options = {}) => {
      dispatch({
        type: 'SHOW_MODAL',
        payload: {
          type: 'confirm',
          title,
          message,
          confirmText: options.confirmText || 'Confirm',
          cancelText: options.cancelText || 'Cancel',
          showCancelButton: true,
          ...options,
        },
      });
    },

    // Hide modal
    hideModal: () => {
      dispatch({ type: 'HIDE_MODAL' });
    },

    // Reset modal state
    resetModal: () => {
      dispatch({ type: 'RESET_MODAL' });
    },

    // Get current modal state
    getState: () => state,
  }), [state]);

  return (
    <ModalProvider value={modalAPI}>
      {children}
    </ModalProvider>
  );
}

// Custom hooks for using modal functionality
export const useModal = () => {
  const modal = useModalContext();
  
  return {
    ...modal,
    // Convenience methods
    showSuccess: modal.showSuccess,
    showError: modal.showError,
    showInfo: modal.showInfo,
    showConfirm: modal.showConfirm,
    hideModal: modal.hideModal,
  };
};

// Hook for direct modal state access
export const useModalState = () => {
  const modal = useModalContext();
  return modal.getState();
};

export { ModalProvider, useModalContext };
export default ModalProviderComponent;
