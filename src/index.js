// import ReactDOM from "react-dom";
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from './assets/theme';
import './index.scss';
import { LayoutProvider } from './store/LayoutContext';
import './i18n';
import { StepperContextProvider } from 'store/Stepper-context';
import { AuthContextProvider } from 'store/Auth-context';
import { SnackbarProvider } from 'store/Snackbar-context';
import { Provider } from 'react-redux';
import store from 'store/redux/index';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme.main}>
    <Provider store={store}>
      <SnackbarProvider>
        <LayoutProvider>
          <AuthContextProvider>
              <StepperContextProvider>
                <CssBaseline />
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </StepperContextProvider>
          </AuthContextProvider>
        </LayoutProvider>
      </SnackbarProvider>
    </Provider>
  </ThemeProvider>
);
