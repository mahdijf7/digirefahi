import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

//component
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import CustomInputBasePassword from 'components/Common/Form/CustomInputBasePassword';
import DSnackbar from 'components/new/shared/DSnackbar';

//api call
import organizationService from 'service/api/organization.service';

// Assets
import { theme } from 'assets/theme/default';

const EmployeeInfoDialogAccount = ({ getEmployees, onClose, employeeId }) => {
    const [loading, setLoading] = useState(false);
    const [buttonLoading, SetButtonLoading] = useState(false);
    const [userData, setUserData] = useState('');
    const { t } = useTranslation();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const Validation_Schema = Yup.object({
        username: Yup.string(''),
        password: Yup.string('').required('رمزعبور معتبر نیست'),
        confirmPass: Yup.string('')
            .required('رمزعبور معتبر نیست')
            .oneOf([Yup.ref('password'), null], 'رمز عبور یکسان نیست'),
    });

    function delayedReturn() {
        return new Promise((resolve) => {
            setTimeout(() => {
                onClose();
                getEmployees();
            }, 1000);
        });
    }
    const queryString = new URLSearchParams();

    const handleSubmit = (values) => {
        queryString.append('_method', 'put');
        queryString.append('tab', 'account');
        queryString.append('password', values.password);
        queryString.append('verify_password', values.confirmPass);
        queryString.append('username', values.username);
        updateEmployee(values); 
    };

    const getData = async (tab) => {
        setLoading(true);
        await organizationService
            .get(`employees/${employeeId}?tab=account`)
            .then((res) => {
                setUserData(res.data.data?.username);
                setLoading(false);
            })
            .catch((err) => { 
                setLoading(false);
            });
    };

    const updateEmployee = async (data) => {
        SetButtonLoading(true);
        await organizationService
            .update(`employees/${employeeId}?${queryString}`)
            .then((res) => {
                SetButtonLoading(false);
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'حساب کاربری با موفقیت ویرایش شد.',
                        type: 'success',
                    },
                });
                delayedReturn();
 
            })
            .catch((err) => {
                SetButtonLoading(false);
                setSnackBarData({
                    show: true,
                    data: {
                        text: err?.response?.data?.meta?.msg || 'مشگلی پیش آمد',
                        type: 'error',
                    },
                });
             
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
                            confirmPass: '',
                        }}
                        onSubmit={handleSubmit}>
                        <Form>
                            <Grid spacing="0.8rem" alignItems="space-between" justifyContent="space-between" container>
                                <Grid item mt="1rem" xs={10} sm={5.5}>
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
                                <Grid item mt="1rem" ml="3rem" xs={10} sm={5.5}>
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
                                <Grid item mt="1rem" xs={10} sm={5.5}>
                                    <CustomInputBasePassword
                                        height="4.2rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="confirmPass"
                                        title={t('employees.confirmPass')}
                                        placeholder={t('employees.confirmPass')}
                                        weight="true"
                                    />
                                </Grid>

                                <Grid item xs={6} sx={buttonBoxStyle}>
                                    <Button variant="outlined" onClick={onClose}>
                                        انصراف
                                    </Button>
                                    <LoadingButton variant="contained" loading={buttonLoading} type="submit">
                                        به‌روزرسانی
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
const buttonBoxStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '100px',
    mr: 'auto',
    '& button': {
        fontSize: '14px',
        boxShadow: 'none',
        width: '27%',
        borderRadius: '.5rem',
    },
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

export default EmployeeInfoDialogAccount;
