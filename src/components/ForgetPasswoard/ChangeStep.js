import React, { useState, useContext, useEffect } from 'react';
import { Grid, Typography, Fade, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import { useTranslation } from 'react-i18next';
import MdiMobilePhone from 'assets/icone/svg/MdiMobilePhone';
import ChangePassword from './ChangePassword';
import GetCode from './GetCode';
import authService from 'service/api/authService';
import AuthContext from 'store/Auth-context';
import { ForgetPassStep1, ForgetPassStep2, ForgetPassStep3 } from 'components/Schemas/LoginSchemas';
import DSnackbar from 'components/new/shared/DSnackbar';
import StepperContext from 'store/Stepper-context';
let mobile;

let url;
function ChangeStep(props) {
    const { t } = useTranslation();
    const { login, activeStep, setActiveStep, resetActiveStep, role, account } = useContext(AuthContext);

    const stepperCtx = useContext(StepperContext);

    const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(60);
    const [error, setError] = useState(false);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const isNotNewUser = parseInt(localStorage.getItem('is_new')) === 0;

    useEffect(() => {
        if (role === 'ADMIN') {
            url = '/app/admin';
        } else if (role === 'COMPANY') {
            url = '/app/organization/dashboard/';
        } else if (role === 'EMPLOYEE') {
            isNotNewUser ? (url = '/') : (url = '/app/welcome');
        } else if (role === 'SUPPLIER') {
            url = '/app/supplier/dashboard';
        }
    }, [role]);

    const handleSubmit = async (values) => {
        resetActiveStep();
        postData(values);
        mobile = values.mobile;
    };

    const apiMethods = [
        (data) => authService.PostForgetPass(data),
        (data) => authService.PostVerifyPass(data),
        (data) => authService.PostNewPassword(data),
    ];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep === 3 ? prevActiveStep : prevActiveStep + 1));
    };

    const postData = async (data) => {
        setLoading(true);
        await apiMethods[activeStep - 1](data)
            .then((res) => {
                setLoading(false);
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'باموفقیت ارسال شد',
                        type: 'success',
                    },
                });
                handleNext();
                if (activeStep === 2) {
                    login(res.data.data);
                    localStorage.setItem('token', JSON.stringify(res?.data?.data?.token));
                    localStorage.setItem('role', JSON.stringify(res?.data.data?.user.role));
                    localStorage.setItem('is_new', JSON.stringify(res.data.data.user?.is_new));
                    window.location.reload();
                } else if (activeStep === 3) {
                    window.location.href = url;
                    resetActiveStep();
                }
            })
            .catch((err) => {
                setLoading(false);
                setError(err?.response?.data?.meta?.msg);
            });
    };

    let btnTitle;
    let validationSchema;

    switch (activeStep) {
        case 1:
            btnTitle = 'login.sendCode';
            validationSchema = ForgetPassStep1;
            break;
        case 2:
            btnTitle = 'login.confirm';
            validationSchema = ForgetPassStep2;
            break;
        case 3:
            btnTitle = 'login.confirmPass';
            validationSchema = ForgetPassStep3;
            break;
        default:
            break;
    }

    const initialValues = {
        mobile: '',
        password: '',
        verify_password: '',
        mobile_token: '',
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="form">
                <Fade in={!!error}>
                    <Typography color="red" sx={{ textAlign: 'center', marginTop: '3%' }}>
                        {error}
                    </Typography>
                </Fade>
                <Grid className="column" container>
                    {
                        {
                            1: (
                                <Grid mt={'5%'} item xs={10}>
                                    <CustomInputBase
                                        showlabel="true"
                                        type="number"
                                        name="mobile"
                                        icon={<MdiMobilePhone />}
                                        title={t('login.phoneNumber')}
                                        placeholder={t('login.number')}
                                    />
                                </Grid>
                            ),
                            2: <GetCode mobile={mobile} counter={counter} setCounter={setCounter} t={t} />,
                            3: <ChangePassword t={t} />,
                        }[activeStep]
                    }
                    <Grid mt="15%" xs={10} className="flex" justifyContent="space-between" item>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            size="large"
                            loading={loading}
                            sx={{ fontSize: '14px' }}
                            className="login-button">
                            {t(btnTitle)}
                        </LoadingButton>
                        <Link
                            sx={{
                                fontSize: '1.4rem',
                                ml: '2rem',
                                color: 'primary',
                                borderRaduis: '10px',
                                '&:hover': {},
                            }}
                            href="/login"
                            className="forgetPassword">
                            {t('login.back')}
                        </Link>
                    </Grid>
                    <DSnackbar
                        open={snackBarData.show}
                        info={snackBarData.data}
                        onClose={() => setSnackBarData({ ...snackBarData, show: false })}
                    />
                </Grid>
            </Form>
        </Formik>
    );
}

export default ChangeStep;
