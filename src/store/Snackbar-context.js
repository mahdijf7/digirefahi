import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackbarContext = createContext({
  showAlert: (message, severity) => {},
});

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  const showAlert = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setIsOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
