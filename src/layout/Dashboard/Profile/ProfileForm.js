import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { Grid, Typography, Box, Avatar } from '@mui/material';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import JalaliDatePicker from 'components/Common/Form/JalaliDatePicker';
import CustomProfileChekbox from 'components/Common/Checkbox/CustomProfileChekbox';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import DSelect from 'components/new/shared/Form/DSelect';
import CustomInputDocument from 'components/Common/Form/CustomInputDocument';
import CustomAvatar from 'components/Common/Form/CustomAvatar';

//tools
import { getErrorTranslation } from 'utils/helpers';

import { theme } from 'assets/theme/default';
import { ColorGrey } from 'assets/theme/color';
import CustomInputNumber from 'components/Common/Form/CustomInputNumber';

function ProfileForm(props) {
    const {
        handleSubmit,
        loading,
        profile,
        interests,
        maritalStatusOptions,
        genderOption,
        childrenOption,
        handleSelectInterest,
    } = props;
    const autocompleteRef = useRef();

    const { t } = useTranslation();

    const employeeSchema = yup.object().shape({
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
        email: yup.string().nullable().email(t('errors.invalidEmail')),
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

    return (
        <>
            {profile && (
                <Formik
                    enableReinitialize={true}
                    initialValues={profile}
                    validationSchema={employeeSchema}
                    onSubmit={handleSubmit}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <Grid className="column" alignItems="space-between" justifyContent="space-between" container>
                                <Grid item mt="1rem" xs={10} sm={12}>
                                    <CustomAvatar
                                        name="avatar"
                                        src={process.env.REACT_APP_STORAGE_URL + '/' + profile?.avatar}
                                        alt={profile?.name}
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <CustomInputBase
                                        sx={inputStyle}
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
                                        type="number"
                                        showlabel="true"
                                        name="national_code"
                                        title={t('profile.nationalCode')}
                                        placeholder={t('profile.nationalCode')}
                                        weight="true"
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <JalaliDatePicker
                                        sx={autoCompleteStyle}
                                        showlabel="true"
                                        name="birthday"
                                        title={t('profile.dateOfBirth')}
                                        placeholder={t('profile.dateOfBirthP')}
                                        weight="true"
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <DSelect
                                        name="gender"
                                        label={t('profile.gender')}
                                        placeholder="جنسیت را انتخاب کنید"
                                        formControlStyle={autoCompleteStyle}
                                        defaultOptions={genderOption}
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <CustomInputBase
                                        sx={inputStyle}
                                        name="mobile"
                                        type="number"
                                        showlabel="true"
                                        title={t('profile.phoneNumber')}
                                        placeholder={t('profile.phoneNumber')}
                                        weight="true"
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <CustomInputBase
                                        disabled
                                        sx={inputStyle}
                                        name="chart"
                                        showlabel="true"
                                        title={'سطح سازمانی'}
                                        placeholder={'کارشناس  حسابداری'}
                                        weight="true"
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: '5px' }}>{'گروه'}</Typography>
                                    {profile?.groups && (
                                        <Box sx={styleGroup}>
                                            {Object.entries(profile.groups).map(([key, value]) => (
                                                <Box key={key}>{value}</Box>
                                            ))}
                                        </Box>
                                    )}
                                </Grid>

                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <CustomInputBase
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="email"
                                        title={'ایمیل'}
                                        placeholder={t('profile.email')}
                                        weight="true"
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <DSelect
                                        name="is_married"
                                        formControlStyle={autoCompleteStyle}
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
                                        defaultOptions={childrenOption}
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
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
                                <Grid item mt="1rem" xs={10} sm={5.6}>
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
                                    <CustomInputBase
                                        showlabel="true"
                                        sx={inputStyle}
                                        name="postal_code"
                                        title={t('profile.zipCode')}
                                        placeholder={t('profile.zipCode')}
                                        weight="true"
                                    />
                                </Grid>
                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                    <CustomInputBase
                                        sx={inputStyle}
                                        name="address"
                                        showlabel="true"
                                        placeholder={t('firstLogin.address')}
                                        weight="true"
                                    />
                                </Grid>
                                <Box width="100%" minHeight="20rem !important">
                                    <CustomProfileChekbox onSelect={handleSelectInterest} data={interests} label="" />
                                </Box>
                                <Grid item xs={10} sm={6} className="flex" justifyContent="flex-start" mt="1rem">
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{ fontSize: '14px' }}
                                        loading={loading.refresh}>
                                        {t('profile.confirmData')}
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
}

export default ProfileForm;

const inputStyle = {
    backgroundColor: theme.palette.info.input,
    borderRadius: '.8rem !important',

    '& .MuiOutlinedInput-root': {
        height: '5.3rem !important',
        color: ` ${theme.palette.common.black}`,
        '& fieldset': {
            borderRadius: '.8rem !important',
            border: `.1rem solid ${theme.palette.info.border} `,
        },
    },
};
const styleGroup = {
    height: '5.3rem !important',
    color: ` ${theme.palette.common.black}`,
    borderRadius: '.8rem !important',
    border: `.1rem solid ${theme.palette.info.border} `,
    backgroundColor: theme.palette.info.input,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '1rem',
    px: '1rem',

    '& div': {
        color: ` ${theme.palette.common.black}`,
        backgroundColor: theme.palette.info.border,
        height: '3.2rem',
        width: 'auto',
        px: '1rem',
        borderRadius: '.5rem !important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

// const AutocompleteStyle = {
//     '&.MuiAutocomplete-root .MuiOutlinedInput-root': {
//         paddingRight: '1rem',
//         borderRadius: '.8rem !important',
//         height: '5.3rem',
//         backgroundColor: theme.main.palette.info.input,
//     },
// };

const autoCompleteStyle = {
    borderRadius: '.8rem !important',
    backgroundColor: ColorGrey,
    height: '5.3rem',
};
// .required(getErrorTranslation(t('errors.required'), { name: 'ایمیل' })),
// is_married: yup
//     .string()
//     .nullable()
//     .required(getErrorTranslation(t('errors.required'), { name: 'وضعیت تاهل' })),
// married_date: yup
//     .date()
//     .nullable()
//     .when('is_married', {
//         is: 'YES',
//         then: yup
//             .date()
//             .nullable()
//             .required(getErrorTranslation(t('errors.required'), { name: 'تاریخ ازدواج' })),
//         otherwise: yup.date().nullable(),
//     }),
// child: yup
//     .string()
//     .nullable()
//     .required(getErrorTranslation(t('errors.required'), { name: 'تعداد فرزندان' })),
// .required(getErrorTranslation(t('errors.required'), { name: 'کد پستی' })),
// address: yup
//     .string()
//     .nullable()
//     .required(getErrorTranslation(t('errors.required'), { name: 'آدرس' })),
