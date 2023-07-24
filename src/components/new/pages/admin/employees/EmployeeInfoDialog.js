import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';

// Components
import DTabs from 'components/new/shared/DTabs/DTabs';
import DTabsPanel from 'components/new/shared/DTabs/DTabsPanel';
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import EmployeeInfoDialogTransactions from './EmployeeInfoDialogTransactions/EmployeeInfoDialogTransactions';
import EmployeeInfoDialogAccount from './EmployeeInfoDialogAccount';
import EmployeeInfoDialogWallet from './EmployeeInfoDialogWallet';
import EmployeeInfoDialogUserInfo from './EmployeeInfoDialogUserInfo';
import EmployeeInfoDialogInvoice from './EmployeeInfoDialogInvoice/EmployeeInfoDialogInvoice';
import AdminEmployeeChart from './detail/AdminEmployeeChart';

const EmployeeInfoDialogContent = ({ employeeId, title, onClose, getEmployees, onSave }) => {
    const [activeTabId, setActiveTabId] = useState(1);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { t } = useTranslation();
    const tabs = [
        { id: 1, title: t('employees.employeInfo') },
        { id: 2, title: t('employees.organizationStatus') },
        { id: 3, title: t('employees.transactions') },
        { id: 4, title: t('employees.walletDetail') },
        { id: 5, title: 'فاکتورها' },
        { id: 6, title: t('employees.account') },
    ];

    const tabChangedHandler = (event, newValue) => {
        setActiveTabId(newValue);
    };

    return (
        <DDialogWrapper open onClose={onClose}>
            <DDialogHeader title={title} onClose={onClose} />

            <Box sx={wrapperStyles}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DTabs activeTabId={activeTabId} tabs={tabs} onTabChange={tabChangedHandler} />
                        <DTabsPanel value={1} index={activeTabId}>
                            <EmployeeInfoDialogUserInfo getEmployees={getEmployees} employeeId={employeeId} onClose={onClose} onSave={onSave} />
                        </DTabsPanel>
                        <DTabsPanel value={2} index={activeTabId}>
                            <AdminEmployeeChart employeeId={employeeId} onClose={onClose} onSave={onSave} />
                        </DTabsPanel>
                        <DTabsPanel value={3} index={activeTabId}>
                            <EmployeeInfoDialogTransactions employeeId={employeeId} />
                        </DTabsPanel>
                        <DTabsPanel value={4} index={activeTabId}>
                            <EmployeeInfoDialogWallet employeeId={employeeId} />
                        </DTabsPanel>
                        <DTabsPanel value={5} index={activeTabId}>
                            <EmployeeInfoDialogInvoice
                                open={open}
                                handleOpen={handleOpen}
                                handleClose={handleClose}
                                employeeId={employeeId}
                            />
                        </DTabsPanel>
                        <DTabsPanel value={6} index={activeTabId}>
                            <EmployeeInfoDialogAccount getEmployees={getEmployees} employeeId={employeeId} onClose={onClose} />
                        </DTabsPanel>
                    </Grid>
                </Grid>
            </Box>
        </DDialogWrapper>
    );
};

const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
};

export default EmployeeInfoDialogContent;
