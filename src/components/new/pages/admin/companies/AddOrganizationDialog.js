import { useState } from 'react';
import { Box, CircularProgress, Grid, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import adminService from 'service/api/adminService';
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import DSnackbar from 'components/new/shared/DSnackbar';

const initialValues = {
    name: '',
    type: '',
    ceo_name: '',
    ceo_phone: '',
    agent_name: '',
    agent_phone: '',
    email: '',
    password: '',
    verify_password: '',
};

const validationSchema = Yup.object({
    name: Yup.string().nullable().required('این فیلد اجباری می باشد.'),
    type: Yup.string().nullable(),
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
    password: Yup.string().nullable().required('این فیلد اجباری می باشد.'),
    verify_password: Yup.string().nullable().required('این فیلد اجباری می باشد.'),
});

const AddOrganizationDialog = ({ onClose, onChange, setSnackBarData }) => {
    const [loading, setLoading] = useState({ save: false });
    const { t } = useTranslation();

    const createCompany = async (values) => {
        if (loading.save) return;
        setLoading({ save: true });

        const queryString = new URLSearchParams();
        if (values.name) queryString.append('name', values.name);
        if (values.type) queryString.append('type', values.type);
        if (values.ceo_name) queryString.append('ceo_name', values.ceo_name);
        if (values.ceo_phone) queryString.append('ceo_phone', values.ceo_phone);
        if (values.agent_name) queryString.append('agent_name', values.agent_name);
        if (values.agent_phone) queryString.append('agent_phone', values.agent_phone);
        if (values.email) queryString.append('email', values.email);
        if (values.password) queryString.append('password', values.password);
        if (values.verify_password) queryString.append('verify_password', values.verify_password);
        await adminService
            .createCompany(queryString.toString())
            .then((res) => {
                setLoading({ save: false });
                onChange();
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'سازمان با موفقیت افزوده شد.',
                        type: 'success',
                    },
                });
                onClose();
            })
            .catch((err) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: err?.message,
                        type: 'error',
                    },
                });
            });
        setTimeout(() => {
            setSnackBarData({ show: false, data: null });
        }, 3000);
    };

    return (
        <DDialogWrapper open onClose={onClose}>
            <DDialogHeader title={t('addOrganization')} onClose={onClose} />
            <Box display="grid" mt="24px" sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)', padding: '18px 40px 0px 40px' }}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={createCompany}>
                    <Form>
                        <Grid columnSpacing={8} rowSpacing="14px" container>
                            <Grid item xs={12} md={6}>
                                <CustomInputBase
                                    showlabel="true"
                                    name="name"
                                    title={t('organizationName')}
                                    weight
                                    hasDefaultStyle
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomInputBase
                                    showlabel="true"
                                    name="type"
                                    title={t('organizationType')}
                                    weight
                                    hasDefaultStyle
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomInputBase showlabel="true" name="ceo_name" title={t('ceoName')} weight hasDefaultStyle />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomInputBase
                                    showlabel="true"
                                    name="ceo_phone"
                                    title={t('ceoCellPhone')}
                                    weight
                                    hasDefaultStyle
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomInputBase
                                    showlabel="true"
                                    name="agent_name"
                                    title={t('representativeName')}
                                    weight
                                    hasDefaultStyle
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomInputBase
                                    showlabel="true"
                                    name="agent_phone"
                                    title={t('representativeCellPhone')}
                                    weight
                                    hasDefaultStyle
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomInputBase showlabel="true" name="email" title={t('email')} weight hasDefaultStyle />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item mt="1rem" ml="3rem" xs={10} sm={5.5}>
                                        <CustomInputBase
                                            showlabel="true"
                                            name="password"
                                            placeholder={t('employees.password')}
                                            weight
                                            hasDefaultStyle
                                        />
                                    </Grid>
                                    <Grid item mt="1rem" xs={10} sm={5.5}>
                                        <CustomInputBase
                                            showlabel="true"
                                            name="verify_password"
                                            placeholder={t('employees.confirmPass')}
                                            weight
                                            hasDefaultStyle
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: '10px',
                                    marginTop: '70px',
                                }}>
                                <Button variant="outlined" sx={{ fontSize: '14px' }} onClick={onClose}>
                                    انصراف
                                </Button>
                                <LoadingButton
                                    loading={loading.save}
                                    type="submit"
                                    variant="contained"
                                    sx={{ fontSize: '14px', boxShadow: 'none' }}>
                                    ثبت اطلاعات
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Box>
        </DDialogWrapper>
    );
};

export default AddOrganizationDialog;
