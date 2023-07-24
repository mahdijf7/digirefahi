import { Form, Formik, FieldArray } from 'formik';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';
import CustomInputBase from 'components/Common/Form/CustomInputBase';

// Utils
import adminService from 'service/api/adminService';
import sharedService from 'service/api/shared.service';
import { getErrorForSnackbar, getErrorTranslation } from 'utils/helpers';

// Components
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DSnackbar from 'components/new/shared/DSnackbar';
import SupplierAboutAddress from 'components/new/pages/admin/suppliers/detail/about/SupplierAboutAddress';

const AboutSupplier = ({ supplierId, onSave, onClose }) => {
    const [loading, setLoading] = useState({
        initial: true,
        update: false,
    });
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const [provinces, setProvinces] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const { t } = useTranslation();
    const validationSchema = Yup.object({
        service_description: Yup.string().nullable(),
        description: Yup.string().nullable(),
        website: Yup.string().nullable(),
        address: Yup.array().of(
            Yup.object().shape({
                phone: Yup.number('8787')
                    .positive()
                    .typeError(getErrorTranslation(t('errors.numberType'), { name: t('phone') }))
                    .required(getErrorTranslation(t('errors.required'), { name: t('phone') })),
                description: Yup.string()
                    .nullable()
                    .required(getErrorTranslation(t('errors.required'), { name: 'جزئیات آدرس' })),
                city: Yup.object()
                    .nullable()
                    .required(getErrorTranslation(t('errors.required'), { name: 'شهر' })),
                province: Yup.object()
                    .nullable()
                    .required(getErrorTranslation(t('errors.required'), { name: 'استان' })),
            })
        ),
    });

    const updateSupplier = async (values, actions) => {
        console.log(values, 7777);
        if (loading.update) return;
        setLoading({ ...loading, update: true });

        const queryParams = new URLSearchParams();
        queryParams.append('tab', 'about');
        queryParams.append('_method', 'put');
        if (values.service_description) queryParams.append('service_description', values.service_description);
        if (values.description) queryParams.append('description', values.description);
        if (values.website) queryParams.append('website', values.website);
        if (values.address && values.address.length > 0) {
            values.address.forEach((address, index) => {
                address.phone && queryParams.append(`addresses[${index}][phone]`, address.phone);
                address.description && queryParams.append(`addresses[${index}][description]`, address.description);
                address.province && queryParams.append(`addresses[${index}][province_id]`, address.province.id);
                address.city && queryParams.append(`addresses[${index}][city_id]`, address.city.id);
                address.id && queryParams.append(`addresses[${index}][id]`, address.id);
            });
        }

        await adminService
            .update(`suppliers/${supplierId}?${queryParams}`)
            .then((res) => {
                onSave(t('supplierUpdatedSuccessfully'));
            })
            .catch((err) => {
                const errorMsg = err?.response?.data?.data && getErrorForSnackbar(err.response.data.data);
                errorMsg &&
                    setSnackBarData({
                        show: true,
                        data: {
                            text: errorMsg,
                            type: 'error',
                        },
                    });
            });

        setLoading({ ...loading, update: false });
    };
    const addAddress = (arrayHelpers) => {
        arrayHelpers.push({ city: null, province: null, description: '', phone: '', fakeId: new Date().getMilliseconds() });
    };
    const getProvinces = async () => {
        await sharedService
            .getProvinces({ id: supplierId, tab: 'about' })
            .then((res) => {
                setProvinces(res.data.data);
                setLoading({
                    initial: false,
                });
            })
            .catch((err) => {
                console.log('error occured!');
            });
    };
    useEffect(() => {
        (async () => {
            await adminService
                .getSupplier({ id: supplierId, tab: 'about' })
                .then((res) => {
                    setSupplier(res.data.data);
                    getProvinces();
                })
                .catch((err) => {
                    console.log('error occured!');
                });
        })();
    }, []);

    return (
        <DLoadingWrapper loading={loading.initial} sx={{ p: '4rem 4rem 0 4rem' }}>
            <Box display="flex" flexDirection="column">
                <Formik
                    enableReinitialize={true}
                    initialValues={supplier}
                    validationSchema={validationSchema}
                    onSubmit={updateSupplier}>
                    {({ values }) => (
                        <Form>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container spacing={3} sx={{ py: 2 }}>
                                        <Grid item xs={12}>
                                            <CustomInputBase
                                                showlabel="true"
                                                name="service_description"
                                                title={t('supplier.aboutSupplier.services')}
                                                weight
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomInputBase
                                                showlabel="true"
                                                name="description"
                                                title={t('supplier.aboutSupplier.description')}
                                                weight
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <CustomInputBase
                                                showlabel="true"
                                                name="website"
                                                title={t('supplier.aboutSupplier.website')}
                                                weight
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3" color="primary" sx={{ pb: '5px', fontWeight: 600 }}>
                                                {t('supplier.aboutSupplier.addresses')}
                                            </Typography>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container columnSpacing={2}>
                                        <Grid item xs={6} sm={2.5}>
                                            <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>استان</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={2.5}>
                                            <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>شهر</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>
                                                {t('addressDetail')}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>{t('phone')}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <FieldArray
                                        name="address"
                                        render={(arrayHelpers) => (
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Grid container rowSpacing={3.5} sx={{ pt: '6px' }}>
                                                        {values.address &&
                                                            values.address.map((address, index) => (
                                                                <SupplierAboutAddress
                                                                    key={address.id || address.fakeId}
                                                                    address={address}
                                                                    provinces={provinces}
                                                                    baseName={`address[${index}].`}
                                                                    onDelete={() => arrayHelpers.remove(index)}
                                                                />
                                                            ))}
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={2} mt="35px">
                                                    <Button
                                                        variant="contained"
                                                        size="large"
                                                        type="button"
                                                        onClick={() => addAddress(arrayHelpers)}>
                                                        <AddIcon />
                                                        {t('supplier.aboutSupplier.addAddress')}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={1} useFlexGap justifyContent="flex-end">
                                        <Button
                                            variant="outlined"
                                            disabled={loading.update}
                                            onClick={onClose}
                                            sx={{ mx: 1, fontSize: '14px' }}>
                                            {t('supplier.cancel')}
                                        </Button>
                                        <LoadingButton
                                            loading={loading.update}
                                            variant="contained"
                                            type="submit"
                                            sx={{ fontSize: '14px', boxShadow: 'none' }}>
                                            {t('supplier.submit')}
                                        </LoadingButton>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>

            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DLoadingWrapper>
    );
};

export default AboutSupplier;
