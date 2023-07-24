import { useState, useEffect } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// Component
import CustomInputBase from 'components/Common/Form/CustomInputBase'; 
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import CustomInputBasePassword from 'components/Common/Form/CustomInputBasePassword';
import DSnackbar from 'components/new/shared/DSnackbar';

//api call
import adminService from 'service/api/adminService';

// Assets
import { theme } from 'assets/theme/default';

const Account = ({ getSupplier, onClose, supplierId, onChange }) => {
    const [loading, setLoading] = useState({ initial: true, update: false });
    const [userData, setUserData] = useState('');
    const { t } = useTranslation();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const Validation_Schema = Yup.object({
        username: Yup.string(''),
        password: Yup.string('').required(t('login.required')),
        confirmPass: Yup.string('')
            .required(t('login.required'))
            .oneOf([Yup.ref('password'), null], 'رمز عبور ها مثل هم نیستن'),
    });

    function delayedReturn() {
        return new Promise((resolve) => {
            setTimeout(() => {
                onChange();
                onClose();
            }, 1000);
        });
    }

    const updateSupplier = async (values, actions) => {
        if (loading.update) return;
        setLoading({ ...loading, update: true });

        const params = new URLSearchParams();
        params.append('_method', 'put');
        params.append('tab', 'account');
        values.password && params.append('password', values.password);
        values.confirmPass && params.append('verify_password', values.confirmPass);

        await adminService
            .update(`suppliers/${supplierId}?${params.toString()}`)
            .then((res) => {
                delayedReturn();
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'حساب کاربری با موفقیت ویرایش شد.',
                        type: 'success',
                    },
                });
            })
            .catch((err) => {
                console.log(err, 123);
                if (err?.response.status === 422 && err.response.data.data) actions.setErrors(err.response.data.data);
                else {
                    setSnackBarData({
                        show: true,
                        data: {
                            text: err?.response?.data?.meta?.msg || 'مشگلی پیش آمد',
                            type: 'error',
                        },
                    });
                }
            });

        setLoading({ ...loading, update: false });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await adminService
                .getSupplier({ id: supplierId, tab: 'account' }, { signal })
                .then((res) => {
                    setUserData(res.data.data?.username);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });

            setLoading({ initial: false });
        })();

        return () => controller.abort();
    }, []);

    return (
        <Box sx={wrapperStyles}>
            <DLoadingWrapper loading={loading.initial}>
                {userData && (
                    <Formik
                        validationSchema={Validation_Schema}
                        initialValues={{
                            username: userData,
                            password: '',
                            confirmPass: '',
                        }}
                        onSubmit={updateSupplier}>
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

                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: '10px',
                                        marginTop: '100px',
                                    }}>
                                    <Button variant="outlined" sx={{ fontSize: '14px' }} onClick={onClose}>
                                        انصراف
                                    </Button>
                                    <LoadingButton
                                        loading={loading.update}
                                        type="submit"
                                        variant="contained"
                                        sx={{ fontSize: '14px' }}>
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

export default Account;
