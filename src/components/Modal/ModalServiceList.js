import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, DialogContent, DialogTitle, Dialog } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Edit from 'assets/icone/svg/Admin/Edit';
import { styled } from '@mui/material/styles';
import ServiceListForm from 'layout/Admin/SeviceManagement/ServiceList/ServiceListForm';
import adminService from 'service/api/adminService';

function ModalServiceList({ snackBarData, setSnackBarData, open, page, setOpen, selectedService, getServiceList }) {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const { t } = useTranslation();

    const formData = new FormData();
    const handleSubmit = async (values) => {
        // formData.append('_method', 'put');
        values.value && formData.append('value', values.value);
        values.name && formData.append('name', values.name);
        selectedFile && formData.append('file', values.file);

        editServiceList(selectedService?.id, formData);
    };

    console.log(selectedService, 'getting the selected list ', 45345353);

    const editServiceList = async (id, value) => {
 
        setLoading(true);
        await adminService
            .update(`services/${id}/change-value`, value)
            .then((res) => {
                setLoading(false);
                setOpen(false);
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'ویرایش با موفقیت انجام شد',
                        type: 'success',
                    },
                });
                getServiceList(page); 
            })
            .catch((err) => {
                setLoading(false);
                setSnackBarData({
                    show: true,
                    data: {
                        text: err?.response?.data.message || 'ارسال با خطا مواجه شد',
                        type: 'error',
                    },
                });
            });
    };

    return (
        <CustomDialog fullWidth open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="alert-dialog-title">
                <CustomTypo>
                    <Edit />
                    {t('serviceList.inventoryModification')}
                </CustomTypo>
                <Divider />
            </DialogTitle>
            <Box px="2rem" >
                <DialogContent>
                    <ServiceListForm
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        loading={loading}
                        selectedService={selectedService}
                        handleSubmit={handleSubmit}
                        setOpen={setOpen}
                    />
                </DialogContent>
            </Box>
        </CustomDialog>
    );
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
    direction: 'rtl',
    '& .MuiDialog-paper': {
        padding: ' 0 2rem ',
        width: '58.8rem',
        maxHeight: '35.9rem',
        backgroundColor: theme.palette.common.white,
        borderRadius: '1rem !important ',
        overflow: 'hidden',
    },
}));
const CustomTypo = styled(Typography)(({ theme }) => ({
    fontSize: '1.8rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '1rem 0 2rem ',
    fontWeight: '600 !important',
    '& svg': {
        marginLeft: '1rem',
    },
}));

export default ModalServiceList;
