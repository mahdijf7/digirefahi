import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Container from 'components/Common/Card/Container';

import CustomInputBase from 'components/Common/Form/CustomInputBase';
import Card from 'components/Common/Card/Card';
import CustomInputBasePassword from 'components/Common/Form/CustomInputBasePassword';

import { theme } from 'assets/theme/default';
import organizationService from 'service/api/organization.service';
import AuthContext from 'store/Auth-context';

function UserAccount() {
    const { t } = useTranslation();
    const { logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState({ username: '', password: '', confirm_password: '' });

    const validationSchema = Yup.object({
        username: Yup.string(),
        password: Yup.string().required(t('login.required')),
        confirm_password: Yup.string()
            .required(t('login.required'))
            .oneOf([Yup.ref('password'), null], 'رمز عبور ها مثل هم نیستن'),
    });

    const getData = async () => {
        setLoading(false);
        await organizationService
            .getCompanyInfo()
            .then((res) => {
          
                setCompany({ ...res.data.data, password: '', confirm_password: '' });
            })
            .catch((err) => {});
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (data) => {
        setLoading(true);
        const values = {
            password: data.password,
            verify_password: data.confirm_password,
        };
        await organizationService
            .updateAccount(values)
            .then((res) => {
                logout();
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            });
    };

    return (
        <Container minHeight="calc(100vh - 6.6rem)" breadcrumb={AcountUserPassLinkData}>
            <Card p="3rem">
                <Formik enableReinitialize initialValues={company} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                                />
                            </Grid>
                            <Grid item mt="1rem" xs={10} sm={5.6}>
                                <CustomInputBasePassword
                                    name="confirm_password"
                                    showlabel="true"
                                    sx={inputStyle}
                                    title={t('login.repeatPassword')}
                                />
                            </Grid>

                            <Grid item xs={10} sm={12} className="flex" justifyContent="flex-start" mt="5rem">
                                <LoadingButton type="submit" variant="contained" size="large" sx={{fontSize: '14px'}} disabled={loading}>
                                    {t('profile.update')}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Card>
        </Container>
    );
}

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

export default UserAccount;
