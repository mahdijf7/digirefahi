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
import PersonalInfoStep from './TabPanelForms/PersonalInfoStep';
import AboutSupplier from './TabPanelForms/AboutSupplier';
import Services from './TabPanelForms/Services';
import Factors from './TabPanelForms/Factors';
import Account from './TabPanelForms/Account';

const FormSupplier = ({ isOpen, selected, onClose, mode, onRefresh, onSave }) => {
    const [activeTabId, setActiveTabId] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const tabs = [
        { id: 1, title: t('supplier.personalInfo.title') },
        { id: 2, title: t('supplier.aboutSupplier.title') },
        { id: 3, title: t('supplier.services.title') },
        { id: 4, title: t('supplier.factors.title') },
        { id: 5, title: t('supplier.account.title') },
    ];

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
                        title={mode === 'add' ? t('supplier.addSupplier') : t('supplier.editSupplier')}
                        onClose={onClose}
                    />

                    <Box sx={wrapperStyles}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <DTabs activeTabId={activeTabId} tabs={tabs} onTabChange={tabChangedHandler} />
                                <DTabsPanel value={1} index={activeTabId}>
                                    <PersonalInfoStep
                                        onChange={onRefresh}
                                        supplierId={selected?.id}
                                        mode={mode}
                                        onClose={onClose}
                                    />
                                </DTabsPanel>
                                <DTabsPanel value={2} index={activeTabId}>
                                    <AboutSupplier supplierId={selected?.id} onSave={onSave} onClose={onClose} />
                                </DTabsPanel>
                                <DTabsPanel value={3} index={activeTabId}>
                                    <Services selectedId={selected?.id} />
                                </DTabsPanel>
                                <DTabsPanel value={4} index={activeTabId}>
                                    <Factors selectedId={selected?.id} />
                                </DTabsPanel>
                                <DTabsPanel value={5} index={activeTabId}>
                                    <Account onClose={onClose} onChange={onRefresh} supplierId={selected?.id} />
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

export default FormSupplier;
