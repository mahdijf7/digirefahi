import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, CircularProgress, Divider, Stack } from '@mui/material';

// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import { Event } from '@mui/icons-material';
import EventAdd from './EventAdd';

const AddForm = ({ isOpen, onClose, mode, getEvents, update, eventId, event, setSnackBarData, apiService }) => {
    const { t } = useTranslation();

    const loadingComponent = (
        <Box display="flex" justifyContent="center" pt="32px">
            <CircularProgress />
        </Box>
    );

    const dialogWrapperStyles = {
        width: '463px !important',
    };

    const filterdData = event.filter((item) => item.id === eventId);

    return (
        <DDialogWrapper size="xs" sx={dialogWrapperStyles} open={isOpen} onClose={onClose}>
            <>
                <Stack direction="row">
                    <Event fontSize="large" sx={eventStyle} />
                    <DDialogHeader title={update ? 'ویرایش رویداد' : 'افزودن رویداد'} onClose={onClose} />
                </Stack>
                <Divider sx={{ pt: 3 }} />
                <Box sx={wrapperStyles}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <EventAdd
                                apiService={apiService}
                                setSnackBarData={setSnackBarData}
                                filterdData={filterdData}
                                eventId={eventId}
                                update={update}
                                getEvents={getEvents}
                                mode={mode}
                                onClose={onClose}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </>
        </DDialogWrapper>
    );
};

const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '13rem',
};

const eventStyle = {
    margin: '0 10px',
    color: '#147ec1',
};

export default AddForm;
