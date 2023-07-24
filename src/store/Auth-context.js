import React, { useState, useCallback, useEffect } from 'react';

import authService from 'service/api/authService';
const AuthContext = React.createContext({
    token: '',
    role: '',
    account: null,
    activeStep: '',
    setActiveStep: '',
    isLoading: true,
    login: (token) => {},
    logout: () => {},
    forgetPass: (step) => {},
    addActiveStep: () => {},
    resetActiveStep: () => {},
    validateToken: () => {},
});

export const AuthContextProvider = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const [role, setRole] = useState(localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null);
    const [activeStep, setActiveStep] = useState(parseInt(localStorage.getItem('activeStep')) || 1);

    const logoutHandler = useCallback(() => {
        localStorage.clear();
        window.location.reload();
    }, []);

    const loginHandler = (account) => {
        setAccount(account);
        setToken(account.token);
        setRole(account.user.role);
    };

    const addActiveStep = (newStep) => {
        setActiveStep(newStep);
    };

    const resetActiveStep = () => {
        localStorage.removeItem('activeStep');
    };

    async function validateToken() {
        await authService
            .getMe(role)
            .then((res) => {
  
                setAccount(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log('error occured!');
                setIsLoading(false);
            });
    }

    useEffect(() => {
        localStorage.setItem('activeStep', activeStep);
    }, [activeStep]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            validateToken();
        } else setIsLoading(false);
    }, []);

    const contextValue = {
        token: token,
        account,
        validateToken,
        login: loginHandler,
        logout: logoutHandler,
        role,
        activeStep,
        setActiveStep,
        addActiveStep,
        resetActiveStep,
        isLoading: isLoading,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
