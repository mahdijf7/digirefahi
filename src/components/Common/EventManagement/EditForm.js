import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, CircularProgress, Divider, Stack } from '@mui/material';

// Components
import DDialogWrapper from 'pages/organization/EventManagement/List/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import { Event } from '@mui/icons-material';
import EventEdit from 'pages/admin/EventsManagement/List/EventEdit';

const EditForm = ({ isOpen, selected, onClose, mode, getEvents, setSnackBarData }) => {
    // const [activeTabId, setActiveTabId] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const loadingComponent = (
        <Box display="flex" justifyContent="center" pt="32px">
            <CircularProgress />
        </Box>
    );

    const dialogWrapperStyles = {
        width: '463px !important',
    };

    return (
        <DDialogWrapper sx={dialogWrapperStyles} open={isOpen} onClose={onClose}>
            {isLoading ? (
                loadingComponent
            ) : (
                <>
                    <Stack direction="row">
                        <Event fontSize="large" sx={eventStyle} />
                        <DDialogHeader title={t('ویرایش رویداد')} onClose={onClose} />
                    </Stack>
                    <Divider sx={{ pt: 3 }} />
                    <Box sx={wrapperStyles}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <EventEdit
                                    setSnackBarData={setSnackBarData}
                                    getEvents={getEvents}
                                    eventId={selected?.id}
                                    mode={mode}
                                    onClose={onClose}
                                />
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

const eventStyle = {
    margin: '0 10px',
    color: '#147ec1',
};

export default EditForm;
