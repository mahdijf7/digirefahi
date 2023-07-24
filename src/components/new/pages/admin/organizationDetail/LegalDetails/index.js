import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import LegalDetailsForm from './LegalDetailsForm';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DSnackbar from 'components/new/shared/DSnackbar';

import adminService from 'service/api/adminService';

function LegalDetails({ companyId }) {
    const [companyData, setCompanyData] = useState({});
    const [loading, setLoading] = useState({ initial: true, update: false, refresh: false });
    const [rowTwoSelectedProvince, setRowTwoSelectedProvince] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const initialValues = {
        name: companyData?.name || '',
        type: companyData?.type || '',
        registration_number: companyData?.registration_number || '',
        email: companyData?.email || '',
        ceo_name: companyData?.ceo_name || '',
        ceo_phone: companyData?.ceo_phone || '',
        agent_name: companyData?.agent_name || '',
        agent_phone: companyData?.agent_phone || '',
        phone: companyData?.phone || '',
        postal_code: companyData?.postal_code || '',
        address: companyData?.address || '',
        province: companyData?.province || '',
        city: companyData?.city || '',
        second_address: companyData?.second_address || '',
        newspaper_image: companyData?.newspaper_image || '',
        logo: companyData?.logo || '',
        economic_code: companyData.economic_code || '',
    };

    const fd = new FormData();
    const handleSubmit = async (values, actions) => {
        console.log(values);
        fd.append('_method', 'put');
        fd.append('tab', 'detail');
        fd.append('name', values.name);
        fd.append('type', values.type);
        fd.append('registration_number', values.registration_number);
        fd.append('email', values.email);
        fd.append('ceo_name', values.ceo_name);
        fd.append('ceo_phone', values.ceo_phone);
        fd.append('economic_code', values.economic_code);
        fd.append('agent_name', values.agent_name);
        fd.append('agent_phone', values.agent_phone);
        fd.append('phone', values.phone);
        fd.append('postal_code', values.postal_code);
        fd.append('address', values.address);
        values.province && fd.append('province_id', values.province.id);
        values.city && fd.append('city_id', values.city.id);
        fd.append('second_address', values.second_address);
        fd.append('newspaper_image', values.newspaper_image);
        fd.append('logo', values.logo);

        updateLegalDetail(fd, actions);
    };

    const rowTwoCitySelected = (city) => {
        setSelectedCity(city?.id);
    };

    const getLegalDetail = async (tab) => {
        setLoading((prev) => {
            return { ...prev, refresh: true };
        });
        await adminService
            .getCompany(companyId, tab)
            .then((res) => {
                setCompanyData(res.data.data);
                setLoading((prev) => {
                    return { ...prev, initial: false, refresh: false };
                });
            })
            .catch((err) => {
                setLoading((prev) => {
                    return { ...prev, initial: false, refresh: false };
                });
            });
    };
    const updateLegalDetail = async (data, actions) => {
        setLoading((prev) => {
            return { ...prev, update: true };
        });
        await adminService
            .updateCompany(companyId, data)
            .then((res) => {
                setLoading((prev) => {
                    return { ...prev, update: false };
                });

                setSnackBarData({
                    show: true,
                    data: {
                        text: 'مشخصات حقوقی سازمان با موفقیت ویرایش شد.',
                        type: 'success',
                    },
                });
                getLegalDetail('detail');
            })
            .catch((err) => {
                setLoading((prev) => {
                    return { ...prev, update: false };
                });
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'ارسال با خطا مواجه شد',
                        type: 'error',
                    },
                });

                if (err?.response.status === 422) actions.setErrors(err.response.data.data);
            });
    };

    useEffect(() => {
        getLegalDetail('detail');
    }, []);

    return (
        <Box>
            <DLoadingWrapper sx={{ mt: '30px' }} loading={loading.initial}>
                <Box sx={wrapperStyles} className={loading.refresh && 'box--isLoading'}>
                    <LegalDetailsForm
                        rowTwoSelectedProvince={rowTwoSelectedProvince}
                        setSelectedProvince={setSelectedProvince}
                        setRowTwoSelectedProvince={setRowTwoSelectedProvince}
                        rowTwoCitySelected={rowTwoCitySelected}
                        selectedProvince={selectedProvince}
                        selectedCity={selectedCity}
                        companyData={companyData}
                        loading={loading}
                        initialValues={initialValues}
                        handleSubmit={handleSubmit}
                    />
                </Box>
            </DLoadingWrapper>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </Box>
    );
}

export default LegalDetails;

const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    padding: '0 30px',
};
