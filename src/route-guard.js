import React, { useContext } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

// Contexts
import AuthContext from 'store/Auth-context';

const RouteGuard = ({ Component, checkWelcome = true }) => {
    const { account } = useContext(AuthContext);
    const [searchParams] = useSearchParams();

    let redirectionPath = '';

    if (!account) {
        redirectionPath = `/login${searchParams.get('redirect_after_login') ? `?redirect_url=${window.location.href}` : ''}`;
    } else if (account?.is_new && checkWelcome) {
        redirectionPath = `/app/welcome`;
    }

    return !!redirectionPath ? <Navigate replace to={redirectionPath} /> : <Component />;
};

export default RouteGuard;
