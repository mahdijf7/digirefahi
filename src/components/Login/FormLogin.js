import { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Box, Typography, Fade, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import { useTranslation } from 'react-i18next';
import 'assets/style/login.scss';
import Profile from 'assets/icone/svg/ProfileLogin';
import Password from 'assets/icone/svg/Password';
import CustomInputBasePassword from 'components/Common/Form/CustomInputBasePassword';
import authService from 'service/api/authService';
import AuthContext from 'store/Auth-context';

import StepperContext from 'store/Stepper-context';
import DSnackbar from 'components/new/shared/DSnackbar';

const FormLogin = (props) => {
    const [searchParams] = useSearchParams();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { login, token, role, logout } = useContext(AuthContext);
    const stepperCtx = useContext(StepperContext);
    const [error, setError] = useState(false);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const Validation_Schema = Yup.object({
        username: Yup.string('').required(t('login.required')),
        password: Yup.string('').required(t('login.required')),
    });

    const Initial_Values = {
        // username: '32415890120',
        // password: '123456',
        username: '',
        password: '',
    };

    const handleSubmit = async (values) => {
        postData(values);
    };

    const postData = async (data) => {
        setLoading(true);
        await authService
            .postLogin(data)
            .then((res) => {
                const { token, user } = res?.data?.data;
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'باموفقیت وارد شدید.',
                        type: 'success',
                    },
                });
                setLoading(false);
                // login(res.data.data);

                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('role', JSON.stringify(user.role));

                console.log(searchParams.get('redirect_url'));
                if (searchParams.get('redirect_url') && !user.is_new) {
                    window.location.href = searchParams.get('redirect_url');
                } else {
                    if (user.role === 'ADMIN') {
                        window.location.href = '/app/admin/';
                    } else if (user.role === 'COMPANY') {
                        window.location.href = '/app/organization/dashboard/';
                    } else if (user.role === 'EMPLOYEE') {
                        user.is_new === 0 ? (window.location.href = '/') : (window.location.href = '/app/welcome');
                        stepperCtx.handleSetActiveStep(user.is_new);
                    } else if (user.role === 'SUPPLIER') {
                        window.location.href = '/app/supplier/dashboard';
                    } else {
                        logout();
                    }
                }
            })
            .catch((err) => {
                setLoading(false);
                setError(err?.response?.data?.meta?.msg);
            });
    };

    return (
        <>
            <Fade in={!!error}>
                <Typography color="red" sx={{ textAlign: 'center', marginTop: '3%' }}>
                    {error}
                </Typography>
            </Fade>
            <Formik initialValues={Initial_Values} validationSchema={Validation_Schema} onSubmit={handleSubmit}>
                <Form>
                    <Grid className="column" container>
                        <Grid item xs={10}>
                            <CustomInputBase
                                name="username"
                                showlabel="true"
                                icon={<Profile />}
                                placeholder={t('login.username')}
                            />
                        </Grid>
                        <Grid sx={{ mt: '15px' }} item xs={10}>
                            <CustomInputBasePassword
                                icon={<Password />}
                                name="password"
                                showlabel="true"
                                placeholder={t('login.password')}
                            />
                        </Grid>
                        <Grid sx={{ m: '1.5rem 0 5% 0 ' }} item xs={6}>
                            {/* <CustomInputBase name="captcha" showlabel="true" placeholder={t('login.captcha')} /> */}
                        </Grid>
                        <Grid item xs={4}></Grid>

                        <Grid item xs={6}>
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ fontSize: '14px' }}
                                loading={loading}
                                className="login-button">
                                {t('login.title')}
                            </LoadingButton>
                        </Grid>
                        <Grid
                            sx={{
                                m: '15px  0',
                                height: '40px !important',
                                display: 'flex',
                                alignItems: 'center',

                                justifyContent: 'flex-end',
                            }}
                            item
                            xs={6}>
                            <Link
                                sx={{
                                    fontSize: '1.4rem',
                                    m: '0 22%',
                                    color: 'primary',
                                    borderRaduis: '10px',
                                    '&:hover': {},
                                }}
                                href="/forget-password"
                                className="forgetPassword">
                                {t('login.forget')}
                            </Link>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </>
    );
};

export default FormLogin;
