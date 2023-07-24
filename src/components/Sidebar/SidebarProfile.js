import React, { useContext } from 'react';
import { Box } from '@mui/material';

// Utils
import AuthContext from 'store/Auth-context';

// Components
import { SidebarEmpSummary } from './SidebarEmpSummary';
import { SidebarAdminSummary } from './SidebarAdminSummary';
import { SidebarOrgSummary } from './SidebarOrgSummary';
import { SidebarSupplierSummary } from './SidebarSupplierSummary';

function SidebarProfile({ progress }) {
    const { account } = useContext(AuthContext);

    return (
        <Box sx={{ flexDirection: 'column', gap: '3px' }} p=" 5% 10%" display="flex" justifyContent="center">
            {account.role === 'EMPLOYEE' && <SidebarEmpSummary />}
            {account.role === 'ADMIN' && <SidebarAdminSummary />}
            {account.role === 'COMPANY' && <SidebarOrgSummary />}
            {account.role === 'SUPPLIER' && <SidebarSupplierSummary />}
        </Box>
    );
}

export default SidebarProfile;
