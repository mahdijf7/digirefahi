import React, { useState, useContext, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { Grid, Typography } from '@mui/material';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import JalaliDatePicker from 'components/Common/Form/JalaliDatePicker';
import Card from 'components/Common/Card/Card';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import DSelect from 'components/new/shared/Form/DSelect';
import CustomInputNumber from 'components/Common/Form/CustomInputNumber';
import DSnackbar from 'components/new/shared/DSnackbar';

import theme from 'assets/theme';
import userService from 'service/api/userService';
import StepperContext from 'store/Stepper-context';
import { ColorGrey } from 'assets/theme/color';

import { getErrorForSnackbar, getErrorTranslation } from 'utils/helpers';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';

export const genderOption = [
    { name: 'زن', id: 'FEMALE' },
    { name: 'مرد', id: 'MALE' },
];
export const childrenOption = [
    { name: '0', id: '0' },
    { name: '1', id: '1' },
    { name: '2', id: '2' },
    { name: '3', id: '3' },
    { name: '4', id: '4' },
];
export const maritalStatusOptions = [
    { name: 'متاهل', id: 'YES' },
    { name: 'مجرد', id: 'NO' },
];

function StepAddProfileData(props) {
    const [loading, setLoading] = useState({ initial: true, update: false });
    const { handleNext } = useContext(StepperContext);
    const [profileData, setProfileData] = useState([]);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const { t } = useTranslation();
    const autocompleteRef = useRef();

    const validationSchema = yup.object().shape({
        firstname: yup
            .string()
            .nullable()
            .required(getErrorTranslation(t('errors.required'), { name: 'نام' })),
        lastname: yup
            .string()
            .nullable()
            .required(getErrorTranslation(t('errors.required'), { name: 'نام خانوادگی' })),
        // national_code: yup
        //     .string()
        //     .min(10, 'کدملی معتبر نیست')
        //     .max(10, 'کدملی معتبر نیست')
        //     .nullable()
        //     .required(getErrorTranslation(t('errors.required'), { name: 'کدملی' })),
        birthday: yup
            .string()
            .nullable()
            .required(getErrorTranslation(t('errors.required'), { name: 'تاریخ تولد' })),
        gender: yup
            .object()
            .nullable()
            .required(getErrorTranslation(t('errors.required'), { name: 'جنسیت' })),
        mobile: yup
            .number()
            .nullable()
            .required(getErrorTranslation(t('errors.required'), { name: 'شماره موبایل' })),
        email: yup.string().nullable().email(t('ایمیل  معتبر نیست')),
        province_id: yup
            .object()
            .nullable()
            .required(getErrorTranslation(t('errors.required'), { name: 'استان' })),

        city_id: yup
            .object()
            .nullable()
            .required(getErrorTranslation(t('errors.required'), { name: 'شهر' })),

        postal_code: yup.string().nullable().min(10, 'کدپستی معتبر نیست').max(10, 'کدپستی معتبر نیست'),
        is_married: yup
            .object()
            .nullable()
            .required(getErrorTranslation(t('errors.required'), { name: 'وضعیت تاهل' })),
    });

    const queryString = new URLSearchParams();

    const handleSubmit = async (values, actions) => {
        values.firstname && queryString.append('firstname', values.firstname);
        values.lastname && queryString.append('lastname', values.lastname);
        values.national_code && queryString.append('national_code', values.national_code);
        values.birthday && queryString.append('birthday', values.birthday);
        values.mobile && queryString.append('mobile', values.mobile);
        values.gender && queryString.append('gender', values.gender.id);
        values.child && queryString.append('child', values.child.id);
        if (values.is_married) {
            queryString.append('is_married', values.is_married.id);
            values.married_date && queryString.append('married_date', values.married_date);
        }
        values.province_id && queryString.append('province_id', values.province_id.id);
        values.city_id && queryString.append('city_id', values.city_id.id);
        values.address && queryString.append('address', values.address);
        values.postal_code && queryString.append('postal_code', values.postal_code);
        values.email && queryString.append('email', values.email);

        updateProfile(actions);
    };

    const updateProfile = async (actions) => {
        setLoading({ ...loading, update: true });
        await userService
            .update(`/employee/profile?${queryString}`)
            .then((res) => {
                setLoading({ ...loading, update: false });
                const { msg } = res?.data.meta;
                setSnackBarData({
                    show: true,
                    data: {
                        text: msg || 'حساب کاربری با موفقیت آپدیت شد .',
                        type: 'success',
                    },
                });
                handleNext();
            })
            .catch((err) => {
                setLoading({ ...loading, update: false });
                setSnackBarData({
                    show: true,
                    data: {
                        text: err.response.data.message || 'ارسال با خطا مواجه شد',
                        type: 'error',
                    },
                });
                if (err?.response.status === 422) actions.setErrors(err.response.data.data);
            });
    };
    const getProfileData = async () => {
        setLoading({ ...loading, initial: true });
        await userService
            .getProfile()
            .then((res) => {
                let temp = res.data.data.profile;
                temp.is_married = maritalStatusOptions.filter((item) => item.id === temp.is_married)[0];
                temp.child = childrenOption.filter((item) => item.id === temp.child)[0];
                temp.gender = genderOption.filter((item) => item.id === temp.gender)[0] || null;

                setLoading({ ...loading, initial: false });
                setProfileData(temp);
            })
            .catch((err) => {
                setLoading({ ...loading, initial: false });
            });
    };

    useEffect(() => {
        getProfileData();
    }, []);

    return (
        <Card
            p="1.3rem 3rem 3rem 3rem"
            mb="6rem"
            minHeight="15rem"
            position="relative"
            className={loading.update && 'box--isLoading'}>
            <DLoadingWrapper sx={{ mt: '20px' }} loading={loading.initial}>
                <Formik
                    enableReinitialize={true}
                    initialValues={profileData}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ values, setFieldValue, errors, resetForm }) => (
                        <Form>
                            <Grid sx={containerStyle} container>
                                <Grid item mt="1rem" xs={10} sm={12}>
                                    <Typography variant="h2">{t('firstLogin.pleaseCompleteYourProfile')}</Typography>
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <CustomInputBase
                                        sx={inputStyle}
                                        height="5.3rem"
                                        showlabel="true"
                                        name="firstname"
                                        title={t('employees.firstName')}
                                        placeholder={t('employees.firstName')}
                                        weight="true"
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <CustomInputBase
                                        sx={inputStyle}
                                        height="5.3rem"
                                        showlabel="true"
                                        name="lastname"
                                        title={t('profile.lastName')}
                                        placeholder={t('profile.lastName')}
                                        weight="true"
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <CustomInputNumber
                                        disabled
                                        sx={inputStyle}
                                        height="5.3rem"
                                        showlabel="true"
                                        name="national_code"
                                        title={t('profile.nationalCode')}
                                        placeholder={t('profile.nationalCode')}
                                        weight="true"
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <JalaliDatePicker
                                        weight
                                        sx={inputStyle}
                                        name="birthday"
                                        title={t('firstLogin.dateOfBirth')}
                                        showlabel="true"
                                        placeholder={t('firstLogin.chooseDateOfBirth')}
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <DSelect
                                        name="gender"
                                        label={t('profile.gender')}
                                        placeholder="جنسیت را انتخاب کنید"
                                        formControlStyle={autoCompleteStyle}
                                        wrapperStyles={wrapperStyles}
                                        defaultOptions={genderOption}
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <CustomInputBase
                                        weight
                                        height="5.3rem"
                                        borderradius=".8rem"
                                        sx={inputStyle}
                                        name="email"
                                        showlabel="true"
                                        title={t('firstLogin.email')}
                                        placeholder={t('firstLogin.chooseEmail')}
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <DSelect
                                        name="is_married"
                                        formControlStyle={autoCompleteStyle}
                                        wrapperStyles={wrapperStyles}
                                        placeholder="وضعیت تاهل را انتخاب کنید"
                                        defaultOptions={maritalStatusOptions}
                                        label={t('profile.marialStatus')}
                                        onSelect={(newValue) => {
                                            if (newValue?.id && newValue.id === 'NO') {
                                                setFieldValue('child', '');
                                                setFieldValue('married_date', '');
                                            }
                                        }}
                                    />
                                </Grid>
                                {values.is_married && values.is_married.id === 'YES' && (
                                    <Grid item mt="1rem" xs={10} sm={5.6}>
                                        <JalaliDatePicker
                                            weight
                                            showlabel="true"
                                            name="married_date"
                                            placeholder={t('firstLogin.chooseMarrageDate')}
                                            sx={inputStyle}
                                        />
                                    </Grid>
                                )}
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <DSelect
                                        name="child"
                                        label={t('firstLogin.numbersOfChildren')}
                                        placeholder={t('firstLogin.chooseNumbersOfChildren')}
                                        formControlStyle={autoCompleteStyle}
                                        wrapperStyles={wrapperStyles}
                                        defaultOptions={childrenOption}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    mt={values.is_married && values.is_married.id === 'YES' ? '1rem' : '2rem'}
                                    xs={10}
                                    sm={5.6}>
                                    <DAutoComplete
                                        name="province_id"
                                        formControlStyle={autoCompleteStyle}
                                        weight
                                        label={t('profile.province')}
                                        buttonProps={{ label: 'استان را انتخاب کنید' }}
                                        placeholder="جستجوی استان"
                                        isAsync
                                        singleCall
                                        callOnOpen
                                        apiPath={`province`}
                                        onSelect={() => {
                                            setFieldValue('city_id', '');
                                            autocompleteRef.current && autocompleteRef.current.reset();
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    mt={values.is_married && values.is_married.id === 'YES' ? '1rem' : '2rem'}
                                    xs={10}
                                    sm={5.6}>
                                    <DAutoComplete
                                        name="city_id"
                                        ref={autocompleteRef}
                                        formControlStyle={autoCompleteStyle}
                                        label={t('profile.city')}
                                        weight
                                       
                                        buttonProps={{ label: values.province_id ? 'شهر' : 'اول استان را انتخاب کنید' }}
                                        placeholder="جستجوی شهر"
                                        isDisabled={!values.province_id}
                                        isAsync
                                        singleCall
                                        apiPath={`city/${values.province_id && values.province_id.id}`}
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <CustomInputNumber
                                        weight
                                        showlabel="true"
                                        height="5.3rem"
                                        borderradius=".8rem"
                                        sx={inputStyle}
                                        name="postal_code"
                                        placeholder={t('firstLogin.zipCode')}
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <CustomInputBase
                                        weight
                                        height="5.3rem"
                                        borderradius=".8rem"
                                        sx={inputStyle}
                                        name="address"
                                        showlabel="true"
                                        placeholder={t('firstLogin.address')}
                                    />
                                </Grid>

                                <Grid item sm={6} />
                                <Grid item xs={10} sm={12} className="flex" justifyContent="flex-end" mt="5rem">
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        loading={loading.update}
                                        sx={{ fontSize: '14px' }}>
                                        {t('firstLogin.nextStep')}
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                <DSnackbar
                    open={snackBarData.show}
                    info={snackBarData.data}
                    onClose={() => setSnackBarData({ ...snackBarData, show: false })}
                />
            </DLoadingWrapper>
        </Card>
    );
}

export default React.memo(StepAddProfileData);

const containerStyle = {
    display: 'flex',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    [theme.main.breakpoints.down('sm')]: {
        justifyContent: 'center',
    },
};
const inputStyle = {
    backgroundColor: theme.main.palette.info.input,
    borderRadius: '.8rem !important',

    '& .MuiOutlinedInput-root': {
        borderRadius: '.8rem !important',
        height: '5.3rem',
        color: ` ${theme.main.palette.common.black}`,
        '& fieldset': {
            border: `.1rem solid ${theme.main.palette.info.border} `,
        },
    },
};

const autoCompleteStyle = {
    borderRadius: '.8rem !important',
    backgroundColor: ColorGrey,
    height: '5.3rem',
};
const wrapperStyles = {
    height: '5.3rem',
};
