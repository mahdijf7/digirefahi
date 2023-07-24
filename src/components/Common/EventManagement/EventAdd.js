import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import theme from 'assets/theme';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import { LoadingButton } from '@mui/lab';
import JalaliDatePicker from 'components/Common/Form/JalaliDatePicker';

const EventAdd = ({ onClose, eventId, getEvents, update, filterdData, setSnackBarData, apiService }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState([]);

    const initialValues = filterdData[0] || {
        name: '',
        date: '',
    }; 

    const validation = yup.object().shape({
        name: yup.string().nullable().required('نام الزامی است'),
        date: yup.string().nullable().required('تاریخ الزامی است'),
    });

    const queryString = new URLSearchParams();

    const handleSubmit = (values, actions) => {
        update && eventId && queryString.append('_method', 'PUT');
        queryString.append('name', values.name);
        queryString.append('date', values.date);
        if (update && eventId) {
            updateEvent(actions);
        } else {
            createEvent(values, actions);
        }
    };

    const createEvent = async (data, actions) => {
        if (loading) return;
        setLoading(true);

        await apiService
            .update(`events?${queryString}`)
            .then((res) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'رویداد با موفقیت اضافه شد',
                        type: 'success',
                    },
                });
                getEvents();
                onClose();
            })
            .catch((err) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'مشگلی پیش آمد',
                        type: 'error ',
                    },
                });
                err.response.status === 422 && actions.setErrors(err.response.data.data);
            });
        setLoading(false);
    };
    const updateEvent = async (actions) => {
        if (loading) return;
        setLoading(true);

        await apiService
            .update(`events/${eventId}?${queryString}`)
            .then((res) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'رویداد با موفقیت آپدیت شد .',
                        type: 'success',
                    },
                });
                getEvents();
                onClose();
            })
            .catch((err) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'مشگلی پیش آمد',
                        type: 'error',
                    },
                });
                err.response.status === 422 && actions.setErrors(err.response.data.data);
            });
        setLoading(false);
    };

    return (
        <Box
            padding="1rem"
            paddingTop="0rem"
            display="flex"
            flexDirection="column"
            sx={{ maxHeight: '40rem', overflowY: 'auto', overflowX: 'hidden' }}>
            <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validation}>
                <Form>
                    <Grid container spacing={3} sx={{ py: 2 }}>
                        <Grid item xs={12} sm={12}>
                            <CustomInputBase
                                height="4.2rem"
                                borderRadius=".8rem"
                                sx={inputStyle}
                                showlabel="true"
                                name="name"
                                title={t('نام رویداد')}
                                weight
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} justifyContent="center">
                            <JalaliDatePicker
                                sx={inputStyle}
                                name="date"
                                title={t('تاریخ')}
                                showlabel="true"
                                placeholder={t('')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton
                                loading={loading}
                                variant="contained"
                                type="submit"
                                sx={{
                                    fontSize: '14px',
                                    paddingTop: '10px',
                                    height: '3.6rem',
                                    boxShadow: 'none !important',
                                }}>
                                {update ? 'بروزرسانی' : 'افزودن'}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Box>
    );
};

const inputStyle = {
    backgroundColor: theme.main.palette.info.input,
    borderRadius: '.8rem !important',
    '& .MuiOutlinedInput-root': {
        height: '4.2rem !important',
        color: ` ${theme.main.palette.common.black}`,
        '& fieldset': {
            border: `.1rem solid ${theme.main.palette.info.border} `,
        },
    },
};

export default EventAdd;
