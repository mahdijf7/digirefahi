import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';

// Component
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import CustomInputNumber from 'components/Common/Form/CustomInputNumber';
import InputFileUploader from 'components/Common/Form/InputFileUploader';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import CustomAvatar from 'components/Common/Form/CustomAvatar';

// Assets
import { ColorGreyBorder, ColorGrey, ColorBlack } from 'assets/theme/color';

function LegalDetailsForm(props) {
    const {
        initialValues,
        handleSubmit,
        loading,
        companyData,
        setSelectedProvince,
        setRowTwoSelectedProvince,
        rowTwoCitySelected,
        rowTwoSelectedProvince,
    } = props;
    const companiesSchemas = yup.object().shape({
        name: yup.string().nullable().required('نام معتبر نیست'),
        email: yup.string().nullable().email('ایمیل معتبر نیست').required('ایمیل معتبر نیست'),
        ceo_name: yup.string().nullable().required('نام مدیرعامل معتبر نیست'),
        ceo_phone: yup.string().nullable().min(11, 'شماره معتبر نیست').max(11, 'شماره معتبر نیست').required('شماره معتبر نیست'),
        agent_name: yup.string().nullable().required('نام نماینده معتبر نیست'),
        agent_phone: yup.string().nullable().min(11, 'شماره معتبر نیست').max(11, 'شماره معتبر نیست'),
        phone: yup.string().nullable().min(8, 'شماره معتبر نیست').max(11, 'شماره معتبر نیست'),
        postal_code: yup.string().nullable().min(10, 'کدپستی معتبر نیست').max(10, 'کدپستی معتبر نیست'),
    });

    console.log(companyData.logo);

    const [logo, setLogo] = useState(null);
    const rowTwoCityRef = useRef(null);

    const { t } = useTranslation();

    const rowTwoProvinceSelected = (province) => {
        setSelectedProvince(province?.id);
        setRowTwoSelectedProvince(province);

        // we need to reset the city dropdown
        rowTwoCityRef.current && rowTwoCityRef.current.reset();
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={companiesSchemas}>
            {({ values, setFieldValue, resetForm, handleReset, handleSubmit }) => (
                <Form>
                    <Grid className="column" alignItems="space-between" justifyContent="space-between" container>
                        <Grid item mt="1rem" xs={10} sm={12}>
                            <CustomAvatar
                                name="logo"
                                src={process.env.REACT_APP_STORAGE_URL + '/' + companyData?.logo}
                                alt={companyData?.name}
                            />
                        </Grid>

                        <Grid item mt="2rem" xs={10} sm={5.1}>
                            <CustomInputBase
                                sx={inputStyle}
                                showlabel="true"
                                name="name"
                                title={'نام سازمان'}
                                placeholder={'نام سازمان'}
                                weight="true"
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <CustomInputBase
                                sx={inputStyle}
                                showlabel="true"
                                name="type"
                                title={'نوع سازمان'}
                                placeholder={'نوع سازمان'}
                                weight="true"
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <CustomInputNumber
                                sx={inputStyle}
                                showlabel="true"
                                name="registration_number"
                                title={'شماره ثبت'}
                                placeholder={'شماره ثبت'}
                                weight="true"
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <CustomInputNumber
                                sx={inputStyle}
                                showlabel="true"
                                name="economic_code"
                                title={'کد اقتصادی'}
                                placeholder={'کد اقتصادی'}
                                weight="true"
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <InputFileUploader
                                sx={inputDocumnetStyle}
                                accept="image/*"
                                name="newspaper_image"
                                title="تصویر روزنامه رسمی"
                                showlabel="true"
                                weight="true"
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <CustomInputBase
                                sx={inputStyle}
                                showlabel="true"
                                name="email"
                                title={'ایمیل'}
                                placeholder={'ایمیل'}
                                weight="true"
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <CustomInputBase
                                sx={inputStyle}
                                showlabel="true"
                                name="ceo_name"
                                title={'نام مدیر عامل'}
                                placeholder={'نام مدیر عامل'}
                                weight="true"
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <CustomInputNumber
                                sx={inputStyle}
                                showlabel="true"
                                name="ceo_phone"
                                title={'شماره همراه مدیر عامل'}
                                placeholder={'شماره همراه مدیر عامل'}
                                weight="true"
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <CustomInputBase
                                sx={inputStyle}
                                showlabel="true"
                                name="agent_name"
                                title={'نام نماینده'}
                                placeholder={'نام نماینده'}
                                weight="true"
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <CustomInputNumber
                                sx={inputStyle}
                                showlabel="true"
                                name="agent_phone"
                                title={'شماره همراه نماینده'}
                                placeholder={'شماره همراه نماینده'}
                                weight="true"
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <CustomInputNumber
                                height="5.3rem"
                                sx={inputStyle}
                                showlabel="true"
                                name="phone"
                                title={'شماره ثابت'}
                                placeholder={'شماره ثابت'}
                                weight="true"
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <CustomInputNumber
                                sx={inputStyle}
                                showlabel="true"
                                name="postal_code"
                                title={'کد پستی'}
                                placeholder={'کد پستی'}
                                weight="true"
                            />
                        </Grid>

                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <DAutoComplete
                                name="province"
                                formControlStyle={inputStyle}
                                weight
                                label={t('profile.province')}
                                buttonProps={{ label: 'استان را انتخاب کنید' }}
                                placeholder="جستجوی استان"
                                isAsync
                                singleCall
                                callOnOpen
                                apiPath={`province`}
                                onSelect={rowTwoProvinceSelected}
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <DAutoComplete
                                name="city"
                                formControlStyle={inputStyle}
                                // defaultValue={companyData?.city_id}
                                ref={rowTwoCityRef}
                                label={t('profile.city')}
                                weight
                                buttonProps={{ label: rowTwoSelectedProvince ? 'شهر' : 'اول استان را انتخاب کنید' }}
                                placeholder="جستجوی شهر"
                                isDisabled={!values.province}
                                isAsync
                                singleCall
                                apiPath={`city/${rowTwoSelectedProvince && rowTwoSelectedProvince.id}`}
                                onSelect={rowTwoCitySelected}
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={12}>
                            <CustomInputBase
                                sx={inputStyle}
                                showlabel="true"
                                name="address"
                                title={'آدرس'}
                                placeholder={'آدرس'}
                                weight="true"
                            />
                        </Grid>
                        <Grid item mt="1rem" xs={10} sm={12}>
                            <CustomInputBase
                                sx={inputStyle}
                                showlabel="true"
                                name="second_address"
                                title={'آدرس دوم (کارخانه)'}
                                placeholder={'آدرس دوم (کارخانه)'}
                                weight="true"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '30px',
                                gap: '2rem',
                            }}>
                            <LoadingButton sx={{ fontSize: '14px' }} type="submit" variant="contained" loading={loading.update}>
                                {'به روز رسانی'}
                            </LoadingButton>

                            <Button sx={{ fontSize: '14px' }} variant="outlined" component={Link} to="/app/admin/companies">
                                بازگشت به لیست سازمان‌ها
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default LegalDetailsForm;

const inputDocumnetStyle = {
    width: '100%',
    height: '4.2rem',
    backgroundColor: ColorGrey,
    color: ` ${ColorBlack}`,
    border: `.1rem solid${ColorGreyBorder} `,
    fontSize: '1.3rem',

    '&:hover': {
        backgroundColor: ColorGrey,
        color: ` ${ColorBlack}`,
        border: `.1rem solid ${ColorBlack} !important `,
    },
};

const inputStyle = {
    borderRadius: '.8rem !important',
    '& .MuiBox-root': {
        borderRadius: '.8rem !important',
        backgroundColor: ColorGrey,
        height: '4.2rem',
        color: ` ${ColorBlack}`,
        '& fieldset': {
            borderRadius: '.8rem !important',
            border: `.1rem solid${ColorGreyBorder} `,
        },

        '&.selected': {},
    },

    '& .MuiOutlinedInput-root': {
        backgroundColor: ColorGrey,
        height: '4.2rem',
        color: ` ${ColorBlack}`,
        '& fieldset': {
            borderRadius: '.8rem !important',
            border: `.1rem solid${ColorGreyBorder} `,
        },
    },
    '&.MuiAutocomplete-root .MuiOutlinedInput-root': {
        paddingRight: '7%',
        borderRadius: '.8rem !important',
    },
};
