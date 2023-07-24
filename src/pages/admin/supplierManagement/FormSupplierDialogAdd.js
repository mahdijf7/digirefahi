import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, CircularProgress } from '@mui/material';

// Utils
import adminService from 'service/api/adminService';

// Components
import DTabs from 'components/new/shared/DTabs/DTabs';
import DTabsPanel from 'components/new/shared/DTabs/DTabsPanel';
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import PersonalInfoStepAdd from './TabPanelForms/PersonalInfoStepAdd';

const FormSupplierAdd = ({ isOpen, selected, onClose, mode, onRefresh }) => {
    const [activeTabId, setActiveTabId] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const tabs = [{ id: 1, title: t('supplier.personalInfoAdd.title') }];

    const tabChangedHandler = (event, newValue) => {
        setActiveTabId(newValue);
    };

    // useEffect(() => {
    //     if(mode==='edit')
    // }, []);

    const loadingComponent = (
        <Box display="flex" justifyContent="center" pt="32px">
            <CircularProgress />
        </Box>
    );

    return (
        <DDialogWrapper open={isOpen} onClose={onClose}>
            {isLoading ? (
                loadingComponent
            ) : (
                <>
                    <DDialogHeader
                        title={mode === 'add' ? t('supplier.addSupplier') : t('supplier.addSupplier')}
                        onClose={onClose}
                    />

                    <Box sx={wrapperStyles}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <DTabs activeTabId={activeTabId} tabs={tabs} onTabChange={tabChangedHandler} />
                                <DTabsPanel value={1} index={activeTabId}>
                                    <PersonalInfoStepAdd
                                        onChange={onRefresh}
                                        supplierId={selected?.id}
                                        mode={mode}
                                        onClose={onClose}
                                    />
                                </DTabsPanel>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}
        </DDialogWrapper>
    );
};

const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
};

export default FormSupplierAdd;
