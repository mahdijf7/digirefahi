import React, { useEffect } from 'react';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';
import theme from 'assets/theme';
import Card from 'components/Common/Card/Card';
import Container from 'components/Common/Card/Container';
import { Form, Formik } from 'formik';
import CustomInputSearch from 'components/Common/Form/CustomInputSearch';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'store/Snackbar-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import RequestsTable from 'components/Table/Requests';

const {
    main: { palette },
} = theme;
function ManagementsRequests(props) {
    const { showAlert } = useSnackbar();
    const { t } = useTranslation();
    const Validation_Schema = Yup.object({
        search: Yup.string(''),
    });

    useEffect(() => {
        // const bannerApi = new bannerService();
        // bannerApi
        //   .getBannerList()
        //   .then((res) => setBannerList(res))
        //   .catch((err) => showAlert(err?.message, "error"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Initial_Values = {
        search: '',
    };

    const handleSubmit = async (values) => {
        console.log(values);
    };

    return (
        <Container breadcrumb={[{ link: 'app/dashboard', title: 'پیشخوان' }]}>
            <Card height="auto" p="2rem">
                <Grid container spacing="2rem">
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between" spacing={1.25}>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Formik
                                    initialValues={Initial_Values}
                                    validationSchema={Validation_Schema}
                                    onSubmit={handleSubmit}>
                                    <Form className="flex" style={{ width: '100%', justifyContent: 'space-between ' }}>
                                        <CustomInputSearch placeholder={t('dashboard.search')} name="search" />
                                    </Form>
                                </Formik>
                            </Box>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                startIcon={<FontAwesomeIcon icon={faFileExcel} />}
                                sx={{ mr: 1 }}>
                                <Typography variant="h5" style={{ marginRight: '10px' }}>
                                    خروجی اکسل
                                </Typography>
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={styleBox}>
                            <RequestsTable content={content} />
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box sx={styleBox} />
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
}

export default ManagementsRequests;
const styleBox = {
    // bgcolor: palette.primary.main,
    height: '60rem',
    width: '100%',
};
const content = [
    {
        id: 0,
        organizationName: 'سامانه جامع ساعی',
        serviceType: 'تور قشم',
        supplier: 'علی بابا',
        unitPrice: '3000',
        quantity: '100',
        totalPrice: '300000',
        startDate: '',
        status: 'pending',
    },
    {
        id: 1,
        organizationName: 'سامانه جامع ساعی',
        serviceType: 'تور قشم',
        supplier: 'علی بابا',
        unitPrice: '3000',
        quantity: '100',
        totalPrice: '300000',
        startDate: '',
        status: 'approve',
    },
    {
        id: 2,
        organizationName: 'سامانه جامع ساعی',
        serviceType: 'تور قشم',
        supplier: 'علی بابا',
        unitPrice: '3000',
        quantity: '100',
        totalPrice: '300000',
        startDate: '',
        status: 'rejected',
    },
];
