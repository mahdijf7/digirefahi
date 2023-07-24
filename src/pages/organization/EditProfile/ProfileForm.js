import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Components
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import CustomInputNumber from 'components/Common/Form/CustomInputNumber';
import InputFileUploader from 'components/Common/Form/InputFileUploader';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import CustomAvatar from 'components/Common/Form/CustomAvatar';

//style
import UserProfileEdit from 'assets/icone/svg/UserProfileEdit';
import { ColorGreyBorder, ColorGrey, ColorBlack } from 'assets/theme/color';

function ProfileDetailsForm(props) {
    const { handleSubmit, loading, profile, validationSchema } = props;

    const autocompleteRef = useRef();

    const { t } = useTranslation();

    return (
        <Formik initialValues={profile} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({ values, setFieldValue }) => (
                <Form>
                    <Grid className="column" alignItems="space-between" justifyContent="space-between" container>
                        <Grid item mt="1rem" xs={10} sm={12}>
                            <CustomAvatar
                                name="logo"
                                src={process.env.REACT_APP_STORAGE_URL + '/' + profile?.logo}
                                alt={profile?.name}
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
                                title={'نوع شرکت'}
                                placeholder={'نوع شرکت'}
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
                                placeholder={'تصویر روزنامه رسمی'}
                                showlabel="true"
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
                                name="province_id"
                                formControlStyle={inputStyle}
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
                        <Grid item mt="1rem" xs={10} sm={5.1}>
                            <DAutoComplete
                                name="city_id"
                                ref={autocompleteRef}
                                formControlStyle={inputStyle}
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
                                justifyContent: 'flex-start',
                                marginTop: '30px',
                                paddingBottom: '30px',
                                gap: '2rem',
                            }}>
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                size="large"
                                loading={loading.update}
                                sx={{ fontSize: '14px' }}>
                                {'ذخیره اطلاعات'}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default ProfileDetailsForm;

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
