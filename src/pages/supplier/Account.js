import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@mui/material'; 

// Utils
import SupplierService from 'service/api/supplier.service';

// Components
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import CustomInputBasePassword from 'components/Common/Form/CustomInputBasePassword';
import DSnackbar from 'components/new/shared/DSnackbar';

import { theme } from 'assets/theme/default';
import AuthContext from 'store/Auth-context';
import DBox from 'components/new/shared/DBox';
import { LoadingButton } from '@mui/lab';

function Account(props) {
    const [loading, setLoading] = useState({ initial: true, update: false });
    const { logout } = useContext(AuthContext);
    const { t } = useTranslation();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const [account, setAccount] = useState(false);

    const validationSchema = Yup.object({
        password: Yup.string().matches(/^\S*$/, 'رمز عبور معتبر نیست').required(t('login.required')),
        verify_password: Yup.string()
            .oneOf([Yup.ref('password'), null], t('login.samePassword'))
            .required(t('login.required')),
    });

    const update = async (values, actions) => {
        if (loading.update) return;
        setLoading({ ...loading, update: true });

        const params = new URLSearchParams();
        values.password && params.append('password', values.password);
        values.verify_password && params.append('verify_password', values.verify_password);

        await SupplierService
            .update(`account?${params.toString()}`)
            .then((res) => {
                const { msg } = res?.data.meta;
                setSnackBarData({
                    show: true,
                    data: {
                        text: msg || 'حساب کاربری با موفقیت آپدیت شد .',
                        type: 'success',
                    },
                });
                logout();
            })
            .catch((err) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: err.response.data.massage || 'ارسال با خطا مواجه شد',
                        type: 'error',
                    },
                });
                if (err?.response.status === 422) actions.setErrors(err.response.data.data);
            });

        setLoading({ ...loading, update: false });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        (async () => {
            await SupplierService
                .get(`account`, { signal })
                .then((res) => {
                    setAccount({ username: res.data.data.username });
                })
                .catch((err) => {
                    console.log(err);
                });
            setLoading({ ...loading, initial: false });
        })();

        return () => controller.abort();
    }, []);

    return (
        <DashboardCard pt="2rem">
            <Breadcrumb links={breadCrumbLinks} />
            <DLoadingWrapper loading={loading.initial}>
                {account && (
                    <DBox sx={{ p: '24px 30px', mt: '24px' }}>
                        <Formik initialValues={account} validationSchema={validationSchema} onSubmit={update}>
                            <Form>
                                <Grid container>
                                    <Grid item xs={10} mx="auto">
                                        <Grid container spacing="30px">
                                            <Grid item xs={12}>
                                                <Grid container spacing="30px">
                                                    <Grid item xs={12} sm={6}>
                                                        <CustomInputBase
                                                            disabled
                                                            sx={inputStyle}
                                                            showlabel="true"
                                                            name="username"
                                                            title={t('profile.userName')}
                                                            placeholder={t('profile.userName')}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <CustomInputBasePassword
                                                    name="password"
                                                    showlabel="true"
                                                    sx={inputStyle}
                                                    title={t('login.newPassword')}
                                                    placeholder={t('login.passwordPlaceholder')}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <CustomInputBasePassword
                                                    name="verify_password"
                                                    showlabel="true"
                                                    sx={inputStyle}
                                                    title={t('login.repeatPassword')}
                                                    placeholder={t('login.passwordPlaceholder')}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={12} className="flex" justifyContent="flex-end" mt="20px">
                                                <LoadingButton
                                                sx={{fontSize: '14px'}}
                                                    variant="contained"
                                                    size="large"
                                                    type="submit"
                                                    loading={loading.update}>
                                                    {t('profile.update')}
                                                </LoadingButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Formik>
                    </DBox>
                )}
            </DLoadingWrapper>

            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DashboardCard>
    );
}

export default Account;

const inputStyle = {
    backgroundColor: theme.palette.info.input,
    borderRadius: '.8rem !important',

    '& .MuiOutlinedInput-root': {
        borderRadius: '.8rem !important',
        height: '5.3rem !important',
        color: ` ${theme.palette.common.black}`,
        '& fieldset': {
            border: `.1rem solid ${theme.palette.info.border} `,
        },
    },
};
const breadCrumbLinks = [{ path: '/app/dashboard/', title: 'پیشخوان' }, { title: 'حساب کاربری' }];
