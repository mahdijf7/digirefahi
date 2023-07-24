import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import Container from 'components/Common/Card/Container';
import { LoadingButton } from '@mui/lab';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import Card from 'components/Common/Card/Card';
import authService from 'service/api/authService';
import { useSnackbar } from 'store/Snackbar-context';
import CustomInputBasePassword from 'components/Common/Form/CustomInputBasePassword';
import DSnackbar from 'components/new/shared/DSnackbar';

import { theme } from 'assets/theme/default';
import AuthContext from 'store/Auth-context';

function UserAcount(props) {
    const [loading, setLoading] = useState(false);
    const { account, logout } = useContext(AuthContext);
    const { t } = useTranslation();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const validationSchema = Yup.object({
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

        console.log(values);
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
                logout();
            })
            .catch((err) => {
                setLoading(false);
                setSnackBarData({
                    show: true,
                    data: {
                        text: err.response.data.massage || 'ارسال با خطا مواجه شد',
                        type: 'error',
                    },
                });
                if (err?.response.status === 422) actions.setErrors(err.response.data.data);
            });
    };

    return (
        <Container minHeight="calc(100vh - 6.6rem)" breadcrumb={AcountUserPassLinkData}>
            <Card p="3rem" className={loading && 'box--isLoading'}>
                <Formik enableReinitialize={true} initialValues={account} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form>
                        <Grid className="column" alignItems="space-between" justifyContent="space-between" container>
                            <Grid item mt="1rem" xs={10} sm={5.6}>
                                <CustomInputBase
                                    disabled
                                    sx={inputStyle}
                                    showlabel="true"
                                    name="username"
                                    title={t('profile.userName')}
                                    placeholder={t('profile.userName')}
                                />
                            </Grid>
                            <Grid item mt="1rem" xs={10} sm={5.6} />
                            <Grid item mt="1rem" xs={10} sm={5.6}>
                                <CustomInputBasePassword
                                    name="password"
                                    showlabel="true"
                                    sx={inputStyle}
                                    title={t('login.newPassword')}
                                    placeholder={t('login.passwordPlaceholder')}
                                />
                            </Grid>
                            <Grid item mt="1rem" xs={10} sm={5.6}>
                                <CustomInputBasePassword
                                    name="verify_password"
                                    showlabel="true"
                                    sx={inputStyle}
                                    title={t('login.repeatPassword')}
                                    placeholder={t('login.passwordPlaceholder')}
                                />
                            </Grid>

                            <Grid item xs={10} sm={12} className="flex" justifyContent="flex-start" mt="5rem">
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ fontSize: '14px' }}
                                    loading={loading}>
                                    {t('profile.update')}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Card>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </Container>
    );
}

export default UserAcount;

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
const AcountUserPassLinkData = [
    { link: 'app/dashboard', title: 'پیشخوان', dash: '/' },
    { link: 'app/dashboard/profile', title: 'حساب کاربری' },
];
