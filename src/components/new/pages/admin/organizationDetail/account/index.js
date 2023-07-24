import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

//component
import CustomInputBase from 'components/Common/Form/CustomInputBase'; 
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import CustomInputBasePassword from 'components/Common/Form/CustomInputBasePassword';
import DSnackbar from 'components/new/shared/DSnackbar';

//api call
import adminService from 'service/api/adminService';

// Assets
import { theme } from 'assets/theme/default';
import { useParams } from 'react-router-dom';

const EditAccount = () => {
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [userData, setUserData] = useState('');
    const { t } = useTranslation();
    const { companyId } = useParams();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    }); 

    const Validation_Schema = Yup.object({
        username: Yup.string(''),
        password: Yup.string('').required(t('login.required')),
        verify_password: Yup.string('')
            .required(t('login.required'))
            .oneOf([Yup.ref('password'), null], 'رمز عبور ها مثل هم نیستن'),
    });

    const getData = async (tab) => {
        setLoading(true);
        await adminService
            .getAccountCompany({ companyId: companyId, tab: 'account' })
            .then((res) => {
                setUserData(res.data.data?.username);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const updateAccountCompany = async (data, actions) => {
        
        setButtonLoading(true);
        await adminService
            .updateAccountCompany({ companyId: companyId, password: data.password, verify_password: data.verify_password })
            .then((res) => {
                setButtonLoading(false);
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'حساب کاربری با موفقیت ویرایش شد.',
                        type: 'success',
                    },
                });
            })
            .catch((err) => {
                setButtonLoading(false);
                 
                setSnackBarData({
                    show: true,
                    data: {
                        text: err.response.data.meta.msg || 'مشکلی پیش آمد',
                        type: 'error',
                    },
                });

                if (err?.response.status === 422) actions.setErrors(err.response.data.data);
            });
    };

    useEffect(() => {
        getData('account');
    }, []);

    return (
        <Box sx={wrapperStyles}>
            <DLoadingWrapper loading={loading}>
                {userData && (
                    <Formik
                        validationSchema={Validation_Schema}
                        initialValues={{
                            username: userData,
                            password: '',
                            verify_password: '',
                        }}
                        onSubmit={updateAccountCompany}>
                        <Form>
                            <Grid spacing="0.8rem" alignItems="space-between" justifyContent="space-between" container>
                                <Grid item mt="1rem" xs={10} sm={5.1}>
                                    <CustomInputBase
                                        height="4.2rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="username"
                                        title={t('employees.userName')}
                                        placeholder={t('employees.userName')}
                                        weight="true"
                                        disabled
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5}></Grid>
                                <Grid item mt="1rem" ml="3rem" xs={10} sm={5.1}>
                                    <CustomInputBasePassword
                                        height="4.2rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="password"
                                        title={t('employees.password')}
                                        placeholder={t('employees.password')}
                                        weight="true"
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.1}>
                                    <CustomInputBasePassword
                                        height="4.2rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="verify_password"
                                        title={t('employees.confirmPass')}
                                        placeholder={t('employees.confirmPass')}
                                        weight="true"
                                    />
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: '10px',
                                        marginTop: '100px',
                                    }}>
                                    <Button
                                        sx={{ fontSize: '14px' }}
                                        variant="outlined"
                                        component={Link}
                                        to="/app/admin/companies/">
                                        بازگشت به لیست سازمان‌ها
                                    </Button>

                                    <LoadingButton
                                        loading={buttonLoading}
                                        type="submit"
                                        variant="contained"
                                        sx={{ fontSize: '14px'  }}>
                                        به روز رسانی
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                )}
            </DLoadingWrapper>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </Box>
    );
};
const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    padding: '0 30px',
};
const inputStyle = {
    backgroundColor: theme.palette.info.input,
    borderRadius: '.8rem !important',

    '& .MuiOutlinedInput-root': {
        height: '5.3rem',
        color: ` ${theme.palette.common.black}`,
        '& fieldset': {
            borderRadius: '.8rem !important',
            border: `.1rem solid ${theme.palette.info.border} `,
        },
    },
    '&.MuiAutocomplete-root .MuiOutlinedInput-root': {
        paddingRight: '7%',
        borderRadius: '.8rem !important',
    },
    '& .MuiAutocomplete-endAdornment': {
        right: '90% !important',
        '& svg': {
            width: '3rem',
            height: '3rem',
        },
    },
};

export default EditAccount;
