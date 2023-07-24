import React, { useEffect, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Divider, FormLabel, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import theme from 'assets/theme';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import adminService from 'service/api/adminService';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import UploadFile from 'components/Common/Form/UploadFile';
import { tab } from '@testing-library/user-event/dist/tab';
import CustomInputDocument from 'components/Common/Form/CustomInputDocument';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import { values } from 'lodash';

const initialValues = {
    name: '',
    type: '',
    registration_number: '',
    brand: '',
    ceo_name: '',
    ceo_phone: '',
    agent_name: '',
    agent_phone: '',
    email: '',
    logo: '',
    province: '',
    city: '',
    address: '',
};

const validationSchema = Yup.object({
    name: Yup.string().nullable().required('این فیلد اجباری می باشد.'),
    type: Yup.string().nullable(),
    registration_number: Yup.string().nullable(),
    brand: Yup.string().nullable(),
    ceo_name: Yup.string().nullable().required('این فیلد اجباری می باشد.'),
    ceo_phone: Yup.string()
        .nullable()
        .matches(/^(\+\d{1,3}[- ]?)?\d{11}$/, 'شماره همراه صحیح نمی باشد.')
        .required('این فیلد اجباری می باشد.'),
    agent_name: Yup.string().nullable().required('این فیلد اجباری می باشد.'),
    agent_phone: Yup.string()
        .nullable()
        .matches(/^(\+\d{1,3}[- ]?)?\d{11}$/, 'شماره همراه صحیح نمی باشد.')
        .required('این فیلد اجباری می باشد.'),
    email: Yup.string().nullable().email('فرمت ایمیل صحیح نمی باشد.').required('این فیلد اجباری می باشد.'),
    logo: Yup.mixed().nullable().required('این فیلد اجباری می باشد.'),
    address: Yup.string().nullable(),
});

const PersonalInfoStep = ({ onClose, supplierId, onChange }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [supplier, setSupplier] = useState(initialValues);
    const rowTwoCityRef = useRef(null);

    //api-services
    const getSupplier = async () => {
        await adminService
            .getSupplier({ id: supplierId, tab: 'detail' })
            .then((res) => {
                setSupplier(res.data.data);
                setLoading({ initial: false, refresh: false });
            })
            .catch((err) => {
                setLoading({ initial: false, refresh: false });
            });
    };

    const updateSupplier = async (values, actions) => {
        if (loading.refresh) return;
        setLoading({ ...loading, refresh: true });

        const formData = new FormData();
        if (values.name) formData.append('name', values.name);
        if (values.type) formData.append('type', values.type);
        if (values.registration_number) formData.append('registration_number', values.registration_number);
        if (values.brand) formData.append('brand', values.brand);
        if (values.ceo_name) formData.append('ceo_name', values.ceo_name);
        if (values.ceo_phone) formData.append('ceo_phone', values.ceo_phone);
        if (values.agent_name) formData.append('agent_name', values.agent_name);
        if (values.agent_phone) formData.append('agent_phone', values.agent_phone);
        if (values.email) formData.append('email', values.email);
        if (values.logo) formData.append('logo', values.logo);
        if (values?.province?.id) formData.append('province_id', values.province.id);
        if (values?.city?.id) formData.append('city_id', values.city.id);
        if (values.address) formData.append('address', values.address);
        formData.append('_method', 'put');
        formData.append('tab', 'detail');

        await adminService
            .updateSupplier(formData, supplierId)
            .then((res) => {
                onChange();
                onClose();
            })
            .catch((err) => {
                err.response.status === 422 && actions.setErrors(err.response.data.data);
            });

        setLoading({ ...loading, refresh: false });
    };

    useEffect(() => {
        getSupplier();
    }, []);

    return (
        <Box
            padding="4rem"
            paddingTop="0rem"
            display="flex"
            flexDirection="column"
            sx={{ minWidth: '15rem', overflow: 'hidden !important' }}>
            <Formik
                enableReinitialize={true}
                initialValues={supplier}
                validationSchema={validationSchema}
                onSubmit={updateSupplier}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={3} sx={{ py: 2 }}>
                            <DLoadingWrapper loading={loading.initial} sx={{ py: 4 }}>
                                <Grid item xs={12} sm={6}>
                                    <CustomInputBase
                                        height="4.2rem"
                                        borderRadius=".8rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="name"
                                        title={t('supplier.personalInfo.name')}
                                        weight
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomInputBase
                                        height="4.2rem"
                                        borderRadius=".8rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="type"
                                        title={t('supplier.personalInfo.type')}
                                        weight
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomInputBase
                                        height="4.2rem"
                                        borderRadius=".8rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="registration_number"
                                        title={t('supplier.personalInfo.registrationNO')}
                                        weight
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomInputBase
                                        height="4.2rem"
                                        borderRadius=".8rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="brand"
                                        title={t('supplier.personalInfo.brandName')}
                                        weight
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomInputBase
                                        height="4.2rem"
                                        borderRadius=".8rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="ceo_name"
                                        title={t('supplier.personalInfo.CEOName')}
                                        weight
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomInputBase
                                        height="4.2rem"
                                        borderRadius=".8rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="ceo_phone"
                                        title={t('supplier.personalInfo.CEOMobile')}
                                        weight
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomInputBase
                                        height="4.2rem"
                                        borderRadius=".8rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="agent_name"
                                        title={t('supplier.personalInfo.AgentName')}
                                        weight
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomInputBase
                                        height="4.2rem"
                                        borderRadius=".8rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="agent_phone"
                                        title={t('supplier.personalInfo.AgentMobile')}
                                        weight
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomInputBase
                                        height="4.2rem"
                                        borderRadius=".8rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="email"
                                        title={t('supplier.personalInfo.email')}
                                        weight
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <UploadFile name="logo" accept="image/*" />
                                </Grid>
                                {/* <Grid item xs={12} sm={6}>
                                    <CustomInputDocument
                                    styleWrapper={{paddingTop: '27px'}}
                                        sx={buttonStyle}
                                        onSelect={handleImageSelect}
                                        accept="image/*"
                                        name="logo">
                                        <span>
                                            <IconButton size="large" color="info" sx={{ borderRadius: '4px' }}>
                                                <RemoveRedEyeIcon />
                                            </IconButton>
                                            <IconButton size="large" color="info" sx={{ borderRadius: '4px' }}>
                                                <FileDownloadIcon />
                                            </IconButton>
                                            <IconButton size="large" color="info" sx={{ borderRadius: '4px' }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </span>
                                    </CustomInputDocument>
                            </Grid> */}

                                <Grid item xs={12} sm={6}> 
                                    <FormLabel
                                        sx={{
                                            alignSelf: 'flex-start',
                                            marginBottom: '1%',
                                            fontSize: '1.3rem',
                                            fontWeight: '600',
                                            color: '#000',
                                        }}>
                                        استان
                                    </FormLabel>
                                    <DAutoComplete
                                        name="province"
                                        formControlStyle={{ ...inputStyle, height: '4.2rem' }}
                                        showlabel="true"
                                        weight="true"
                                        title={t('profile.province')}
                                        buttonProps={{ label: 'استان را انتخاب کنید' }}
                                        placeholder="جستجوی استان"
                                        isAsync
                                        singleCall
                                        apiPath={`province`}
                                        onSelect={() => {
                                            setFieldValue('city', '');
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel
                                        sx={{
                                            alignSelf: 'flex-start',
                                            marginBottom: '1%',
                                            fontSize: '1.3rem',
                                            fontWeight: '600',
                                            color: '#000',
                                        }}>
                                        شهر
                                    </FormLabel>
                                    <DAutoComplete
                                        formControlStyle={{ ...inputStyle, height: '4.2rem' }}
                                        ref={rowTwoCityRef}
                                        showlabel="true"
                                        title={t('profile.city')}
                                        weight="true"
                                        buttonProps={{ label: values.province ? 'شهر' : 'اول استان را انتخاب کنید' }}
                                        placeholder="جستجوی شهر"
                                        isDisabled={!values.province}
                                        name="city"
                                        isAsync
                                        singleCall
                                        apiPath={`city/${values.province && values.province.id}`}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomInputBase
                                        height="4.2rem"
                                        borderRadius=".8rem"
                                        sx={inputStyle}
                                        showlabel="true"
                                        name="address"
                                        title={t('supplier.personalInfo.officeAddress')}
                                        weight
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={1.25} justifyContent="flex-end">
                                        <Button variant="outlined" onClick={onClose} sx={{ mx: 1, fontSize: '14px' }}>
                                            {t('supplier.cancel')}
                                        </Button>
                                        <LoadingButton
                                            loading={loading.refresh}
                                            variant="contained"
                                            type="submit"
                                            sx={{ fontSize: '14px', boxShadow: 'none' }}>
                                            {t('supplier.update')}
                                        </LoadingButton>
                                    </Stack>
                                </Grid>
                            </DLoadingWrapper>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

const buttonStyle = {
    borderRadius: '0.8rem',
    paddingTop: '27px',
    height: '4.2rem',
    display: 'flex',
    width: '100%',
    lineHeight: '1.4375em',
    background: '#f2f2f7',
    boxSizing: 'border-box',
    border: '0.1rem solid #D1D1D6',
};
const logoStyle = {
    display: 'flex',
    marginTop: 'auto !important',
    alignItems: 'flex-start',
    justifyContent: 'center',
    '& img': {
        borderRadius: '50%',
        width: '80px',
        height: '80px',
    },
};

const inputStyle = {
    backgroundColor: theme.main.palette.info.input,
    borderRadius: '.8rem !important',
    '& .MuiOutlinedInput-root': {
        height: '4.2rem !important',
        color: ` ${theme.main.palette.common.black}`,
        '& fieldset': {
            border: `.1rem solid ${theme.main.palette.info.border} `,
        },
    },
};

export default PersonalInfoStep;
