import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, Divider, Grid, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';

//component
import CustomInputSearch from '../../Common/Form/CustomInputSearch';

//styles
import theme from 'assets/theme';
import TrashBin from 'assets/icone/svg/Admin/TrashBin';
import '../../../assets/style/dashboard.scss';
import { ColorPrimary, ColorBlack, ColorGrey, ColorGreyBorder } from 'assets/theme/color';

import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import DSelect from 'components/new/shared/Form/DSelect';
import { useNavigate, useLocation } from 'react-router-dom';

function ServiceAdminFilter({ filterHandler, filters }) {
    const { t } = useTranslation();

    return (
        <>
            <Formik initialValues={filters} onSubmit={filterHandler}>
                {({ values, setFieldValue, resetForm, handleReset, handleSubmit }) => (
                    <Form style={{ marginBottom: '2rem' }}>
                        <Grid spacing="3rem" container>
                            <Grid item sm={12}>
                                <Box width="31%">
                                    <CustomInputSearch
                                        sx={{ width: '100% !important' }}
                                        placeholder={t('dashboard.search')}
                                        name="name"
                                    />
                                </Box>
                                <Divider sx={{ mt: '3rem' }} />
                            </Grid>

                            <Grid item sm={2.4}>
                                <DSelect
                                    name="type"
                                    formControlStyle={inputStyle}
                                    placeholder="نوع خدمت"
                                    // buttonProps={{ label: t('serviceList.typeOfSercivce') }}
                                    defaultOptions={[
                                        { id: 'BASIC', name: 'عمومی' },
                                        { id: 'COMPANY', name: 'سازمانی' },
                                    ]}
                                />
                            </Grid>
                            <Grid item sm={2.4}>
                                <DAutoComplete
                                    name="category"
                                    multiple
                                    formControlStyle={inputStyle}
                                    callOnOpen
                                    buttonProps={{ label: t('dashboard.category') }}
                                    placeholder="جستجوی دسته بندی ها"
                                    isAsync
                                    singleCall
                                    apiPath={`admin/categories`}
                                />
                            </Grid>
                            <Grid item sm={2.4}>
                                <DAutoComplete
                                    name="suppliers"
                                    callOnOpen
                                    multiple
                                    formControlStyle={inputStyle}
                                    buttonProps={{ label: 'تامین کننده' }}
                                    placeholder="جستجوی تامین کننده"
                                    isAsync
                                    singleCall
                                    apiPath={`admin/suppliers`}
                                />
                            </Grid>
                            <Grid item sm={2.4}>
                                <DAutoComplete
                                    name="provinces"
                                    multiple
                                    callOnOpen
                                    formControlStyle={inputStyle}
                                    buttonProps={{ label: 'استان' }}
                                    placeholder="جستجوی استان"
                                    isAsync
                                    singleCall
                                    apiPath={`province`}
                                />
                            </Grid>

                            <Grid item sm={2.4}>
                                <DAutoComplete
                                    name="ticket_type_ides"
                                    multiple
                                    callOnOpen
                                    formControlStyle={inputStyle}
                                    buttonProps={{ label: 'نوع بلیط' }}
                                    isAsync
                                    singleCall
                                    apiPath={`admin/services-get-ticket-type`}
                                />
                            </Grid>
                            <Grid item sm={2.4} mr="auto">
                                <LoadingButton
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    loading={false}
                                    type="submit"
                                    sx={{ fontSize: '14px' }}>
                                    {t('serviceList.applyFilter')}
                                </LoadingButton>
                            </Grid>
                            <Grid item sm={2.4}>
                                <Button
                                    onClick={() => {
                                        resetForm({
                                            values: {
                                                category: [],
                                                supplier: [],
                                                province: [],
                                                ticket_type_ides: [],
                                                name: '',
                                                type: '',
                                            },
                                        });
                                        handleSubmit();
                                    }}
                                    sx={linkStyle}>
                                    <TrashBin />
                                    {t('serviceList.removeFilters')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <Divider sx={{ m: ' 3rem 0' }} />
        </>
    );
}

export default ServiceAdminFilter;

const inputStyle = {
    '& .MuiBox-root': {
        height: '3.6rem',
    },
};

const linkStyle = {
    width: '100%',
    bgcolor: 'common.white',
    height: '3.6rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: ColorPrimary,
    borderRadius: '.5rem',
    gap: '.5rem',
    fontSize: '1.1rem',
    border: `.1rem solid ${ColorPrimary}`,
    textDecoration: 'none',

    '&:hover': {
        bgcolor: 'common.white',
        color: ColorPrimary,
    },
};
// const handleSubmitCategory = useCallback((value) => handleSubmit({ category: value }), [handleSubmit]);
