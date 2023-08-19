import React, { useState, useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { Grid, Typography, Button, Box, Switch, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

//componetns
import CustomInputBase from 'components/Common/Form/CustomInputBase';

import JalaliDatePicker from 'components/Common/Form/JalaliDatePicker';
import DSnackbar from 'components/new/shared/DSnackbar';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import DSelect from 'components/new/shared/Form/DSelect';
import CustomAvatar from 'components/Common/Form/CustomAvatar';

//tools
import { employeesTabSchemas } from 'components/Schemas/AdminSchemas';
import adminService from 'service/api/adminService';
import { ColorGrey } from 'assets/theme/color';

const maritalStatusOptions = [
    { name: 'متاهل', id: 'YES' },
    { name: 'مجرد', id: 'NO' },
];
const genderOption = [
    { name: 'زن', id: 'FEMALE' },
    { name: 'مرد', id: 'MALE' },
];
const childrenOption = [
    { name: '0', id: '0' },
    { name: '1', id: '1' },
    { name: '2', id: '2' },
    { name: '3', id: '3' },
    { name: '4', id: '4' },
];
function EmployeeInfoDialogUserInfo({ employeeId, onClose, onSave }) {
    const [loading, setLoading] = useState({ initial: true, save: false });
    const [userData, setUserData] = useState({});
    const [checked, setChecked] = useState(true);
    const autocompleteRef = useRef();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const { t } = useTranslation();

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleSubmit = async (values, actions) => {
        const fd = new FormData();

        values.firstname && fd.append('_method', 'put');
        values.firstname && fd.append('tab', 'detail');
        values.firstname && fd.append('firstname', values.firstname);
        values.lastname && fd.append('lastname', values.lastname);
        values.national_code && fd.append('national_code', values.national_code);
        values.birthday && fd.append('birthday', values.birthday);
        values.mobile && fd.append('mobile', values.mobile);
        values.gender && fd.append('gender', values.gender.id);
        values.child && fd.append('child', values.child.id);
        if (values.is_married) {
            fd.append('is_married', values.is_married.id);
            values.married_date && fd.append('married_date', values.married_date);
        }
        // fd.append('avatar', values.avatar);
        values.province_id && fd.append('province_id', values.province_id.id);
        values.city_id && fd.append('city_id', values.city_id.id);
        values.address && fd.append('address', values.address);
        values.postal_code && fd.append('postal_code', values.postal_code);
        values.email && fd.append('email', values.email);

        // fd.append('company_level', values.company_level);
        fd.append('status', checked ? 'ACTIVE' : 'DEACTIVATE');

        updateEmployee(fd, actions);
    };

    const updateEmployee = async (data, actions) => {
        if (loading.save) return;
        setLoading({ ...loading, save: true });

        await adminService
            .update(`employees/${employeeId}`, data)
            .then((res) => {
                onSave(t('employeeDetailUpdatedSuccessfully'));
            })
            .catch((err) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'ارسال با خطا مواجه شد',
                        type: 'error',
                    },
                });

                if (err?.response.status === 422) actions.setErrors(err.response.data.data);
            });
        setLoading({ ...loading, save: false });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        (async () => {
            await adminService
                .get(`employees/${employeeId}?tab=detail`, { signal })

                .then((res) => {
                    let temp = res.data.data;
                    temp.detail.is_married = maritalStatusOptions.filter((item) => item.id === temp.detail.is_married)[0];
                    temp.detail.child = childrenOption.filter((item) => item.id === temp.detail.child)[0];
                    temp.detail.gender = genderOption.filter((item) => item.id === temp.detail.gender)[0];
                    setChecked(temp?.status === 'ACTIVE' ? true : false);
                    setUserData(temp);
                })
                .catch((err) => {
                
                });
            setLoading({ ...loading, initial: false });
        })();

        return () => controller.abort();
    }, []);

    return (
        <>
            <FormControlLabel
                sx={{ position: 'absolute', top: '2.5rem ', left: '8rem' }}
                control={<Android12Switch name="123" checked={checked} onChange={handleChange} />}
            />
            <Box sx={boxStyle}>
                <DLoadingWrapper loading={loading.initial}>
                    {userData && (
                        <Formik
                            enableReinitialize={true}
                            initialValues={userData.detail || {}}
                            validationSchema={employeesTabSchemas}
                            onSubmit={handleSubmit}>
                            {({ values, setFieldValue }) => (
                                <Form>
                                    <Grid className="column" alignItems="space-between" justifyContent="space-between" container>
                                        {/* <Grid item mt="1rem" xs={10} sm={12}>
                                            <CustomAvatar
                                                name="avatar"
                                                src={process.env.REACT_APP_STORAGE_URL + '/' + userData?.detail?.avatar}
                                                alt={userData?.detail?.name}
                                            />
                                        </Grid> */}
                                        <Grid item mt="1rem" xs={10} sm={5.6}>
                                            <CustomInputBase
                                                showlabel="true"
                                                name="firstname"
                                                title={t('employees.firstName')}
                                                placeholder={t('employees.firstName')}
                                                weight="true"
                                                hasDefaultStyle
                                            />
                                        </Grid>
                                        <Grid item mt="1rem" xs={10} sm={5.6}>
                                            <CustomInputBase
                                                showlabel="true"
                                                name="lastname"
                                                title={t('profile.lastName')}
                                                placeholder={t('profile.lastName')}
                                                weight="true"
                                                hasDefaultStyle
                                            />
                                        </Grid>
                                        <Grid item mt="1rem" xs={10} sm={5.6}>
                                            <CustomInputBase
                                                showlabel="true"
                                                name="email"
                                                title={'ایمیل'}
                                                placeholder={t('profile.email')}
                                                weight="true"
                                                hasDefaultStyle
                                            />
                                        </Grid>
                                        <Grid item mt="1rem" xs={10} sm={5.6}>
                                            <JalaliDatePicker
                                                sx={{ height: '42px', backgroundColor: ColorGrey }}
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
                                                formControlStyle={{ height: '42px', backgroundColor: ColorGrey }}
                                                defaultOptions={genderOption}
                                            />
                                        </Grid>
                                        <Grid item mt="1rem" xs={10} sm={5.6}>
                                            <CustomInputBase
                                                name="mobile" 
                                                showlabel="true"
                                                title={t('profile.phoneNumber')}
                                                placeholder={t('profile.phoneNumber')}
                                                weight="true"
                                                hasDefaultStyle
                                            />
                                        </Grid>
                                        <Grid item mt="1rem" xs={10} sm={5.6}>
                                            <DSelect
                                                name="is_married"
                                                formControlStyle={{ height: '42px', backgroundColor: ColorGrey }}
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
                                            <>
                                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                                    <JalaliDatePicker
                                                        showlabel="true"
                                                        name="married_date"
                                                        title={t('profile.dateOfMarriage')}
                                                        placeholder={t('profile.dateOfMarriage')}
                                                        weight="true"
                                                        sx={{ height: '42px', backgroundColor: ColorGrey }}
                                                    />
                                                </Grid>

                                                <Grid item mt="1rem" xs={10} sm={5.6}>
                                                    <DSelect
                                                        name="child"
                                                        label={t('firstLogin.numbersOfChildren')}
                                                        placeholder={t('firstLogin.chooseNumbersOfChildren')}
                                                        formControlStyle={{ height: '42px', backgroundColor: ColorGrey }}
                                                        defaultOptions={childrenOption}
                                                    />
                                                </Grid>
                                            </>
                                        )}
                                        <Grid item mt="1rem" xs={10} sm={5.6}>
                                            <CustomInputBase
                                                type="number"
                                                showlabel="true"
                                                name="national_code"
                                                title={t('profile.nationalCode')}
                                                placeholder={t('profile.nationalCode')}
                                                weight="true"
                                                hasDefaultStyle
                                            />
                                        </Grid>
                                        <Grid item mt="1rem" xs={10} sm={5.6}>
                                            <CustomInputBase
                                                showlabel="true"
                                                name="postal_code"
                                                title={t('profile.zipCode')}
                                                placeholder={t('profile.zipCode')}
                                                weight="true"
                                                hasDefaultStyle
                                            />
                                        </Grid>
                                        <Grid item mt="1rem" xs={10} sm={5.6}>
                                            <DAutoComplete
                                                name="province_id"
                                                formControlStyle={{ height: '42px', backgroundColor: ColorGrey }}
                                                // defaultValue={userData?.detail?.province_id}
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
                                                formControlStyle={{ height: '42px', backgroundColor: ColorGrey }}
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
                                                name="address"
                                                showlabel="true"
                                                placeholder={t('firstLogin.address')}
                                                weight="true"
                                                hasDefaultStyle
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                gap: '10px',
                                                marginTop: '3.5rem',
                                                mb: '-3rem',
                                            }}>
                                            <Button
                                                disabled={loading.save}
                                                variant="outlined"
                                                sx={{ fontSize: '14px' }}
                                                onClick={onClose}>
                                                انصراف
                                            </Button>
                                            <LoadingButton
                                                loading={loading.save}
                                                variant="contained"
                                                type="submit"
                                                sx={{ fontSize: '14px', boxShadow: 'none' }}>
                                                به‌روزرسانی
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    )}
                    <DSnackbar
                        open={snackBarData.show}
                        info={snackBarData.data}
                        onClose={() => setSnackBarData({ ...snackBarData, show: false })}
                    />
                </DLoadingWrapper>
            </Box>
        </>
    );
}

export default EmployeeInfoDialogUserInfo;

const Android12Switch = styled(Switch)(({ theme }) => ({
    width: '65px !important',
    height: '32px !important',
    padding: '3px 0 !important',

    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        backgroundColor: '#FFFFFF !important',
        width: 22,
        height: 22,
        margin: '2px 0 !important',
    },
    '& .MuiSwitch-switchBase': {
        padding: '3px !important',
    },
    '& .MuiSwitch-switchBase+.MuiSwitch-track': {
        backgroundColor: '#D7D7D7 !important',
        opacity: '1 !important',
    },
    '& .MuiSwitch-track': {
        borderRadius: '999px !important',
        '&:before, &:after': {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
        },
        '&:before': {
            content: `'فعال'`,
            left: 12,
            fontSize: 12,
            color: '#fff',
            display: 'none',
        },
        '&:after': {
            content: `"غیرفعال"`,
            right: 6,
            fontSize: 10,
            color: '#FEFEFE',
        },
    },
    '& .Mui-checked+.MuiSwitch-track': {
        backgroundColor: '#75CE79 !important',
        opacity: '1 !important',
        '&:after': {
            display: 'none',
        },
        '&:before': {
            display: 'flex',
        },
    },
    '& .Mui-checked ': {
        transform: 'translateX(38px) !important',
    },
}));

const boxStyle = {
    m: '2rem 4.5rem  0',
};
