import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import { Grid, Typography, Box } from '@mui/material';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import CustomInputBasePassword from 'components/Common/Form/CustomInputBasePassword';
import { theme } from 'assets/theme/default';
import StepperContext from 'store/Stepper-context';
import authService from 'service/api/authService';

import DSnackbar from 'components/new/shared/DSnackbar';
import { useTranslation } from 'react-i18next';

function StepAddPass(props) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const { handleNext } = useContext(StepperContext);

    const validationSchema = Yup.object().shape({
        password: Yup.string().matches(/^\S*$/, 'رمز عبور معتبر نیست').required(t('login.required')),
        verify_password: Yup.string()
            .oneOf([Yup.ref('password'), null], t('login.samePassword'))
            .required(t('login.required')),
    });

    const fd = new FormData();
    const handleSubmit = async (values, actions) => {
        values.password && fd.append('password', values.password);
        values.verify_password && fd.append('verify_password', values.verify_password);
        postData(actions);
    };

    const postData = async (actions) => {
        setLoading(true);
        await authService
            .update(`account`, fd)
            .then((res) => {
                setLoading(false);
                const { msg } = res?.data.meta;
                setSnackBarData({
                    show: true,
                    data: {
                        text: msg || 'حساب کاربری با موفقیت آپدیت شد .',
                        type: 'success',
                    },
                });
                // setActiveStep(2);
                handleNext();
            })
            .catch((err) => {
                setLoading(false);
                setSnackBarData({
                    show: true,
                    data: {
                        text: err?.response?.data?.massage || 'ارسال با خطا مواجه شد',
                        type: 'error',
                    },
                });
                if (err?.response.status === 422) actions.setErrors(err?.response?.data?.data);
            });
    };

    const initialValues = {
        password: '',
        verify_password: '',
    };

    return (
        <Box
            p="3rem" 
            bgcolor="common.white"
            borderRadius="1.4rem"
            boxShadow={1}
            className={loading.refresh && 'box--isLoading'}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <Grid className="column" container spacing="4rem">
                        <Grid item xs={10} sm={12}>
                            <Typography variant="h2">{t('firstLogin.addNewPassword')}</Typography>
                        </Grid>
                        <Grid sx={{ mt: '15px' }} item xs={12} sm={6}>
                            <CustomInputBasePassword
                                sx={inputStyle}
                                name="password"
                                showlabel="true"
                                placeholder={t('login.password')}
                            />
                        </Grid>
                        <Grid sx={{ mt: '15px' }} item xs={12} sm={6}>
                            <CustomInputBasePassword
                                sx={inputStyle}
                                name="verify_password"
                                showlabel="true"
                                placeholder={t('login.repeatPassword')}
                            />
                        </Grid>

                        <Grid item xs={10} sm={12} className="flex" justifyContent="flex-end" mt="10% ">
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ fontSize: '14px', m: '15px 0' }}
                                loading={loading} >
                                {t('firstLogin.nextStep')}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </Box>
    );
}

export default StepAddPass;

const inputStyle = {
    backgroundColor: theme.palette.info.input,
    borderRadius: '.8rem !important',
    '& .MuiOutlinedInput-root': {
        height: '5.3rem !important',
        color: ` ${theme.palette.common.black}`,
        '& fieldset': {
            border: `.1rem solid ${theme.palette.info.border} `,
        },
    },
};
