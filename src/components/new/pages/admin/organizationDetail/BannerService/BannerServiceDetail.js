import React, { useEffect, useState } from 'react';
import { TableRow, Button, Stack, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadIcon from '@mui/icons-material/Download';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';

//api call
import adminService from 'service/api/adminService';

function BannerServiceDetail({
    setIsOpen,
    service,
    index,
    style,
    loading,
    setLoading,
    getBannerData,
    handleDelete,
    handleOpenModal,
}) {
    const { name, status, image, id } = service;

    const navigate = useNavigate();
    const { t } = useTranslation();
   

    const updateBannerStatus = async (id, status) => {
        setLoading({
            ...loading,
            refresh: true,
        });
        const switchStatus = status === 'ACTIVE' ? 'DEACTIVATED' : 'ACTIVE';
        const queryString = new URLSearchParams();

        queryString.append('_method', 'put');
        queryString.append('status', switchStatus);
  

        await adminService
            .updateBanner(id, queryString)
            .then((res) => {
                getBannerData();
            })
            .catch((err) => {
        
                setLoading({
                    initial: false,
                    refresh: false,
                });
            });
    };

    const handleDownload = async (downloadUrl) => {
        try {
            const response = await fetch('/proxy-image?url=' + encodeURIComponent(downloadUrl));
            const blob = await response.blob();
            const filename = downloadUrl.split('/').pop();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${filename}`; // Set the desired filename for the downloaded image
            link.click();

            URL.revokeObjectURL(url);
            console.log(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <TableRow style={style}>
            <DTableCell>
                <img style={imageStyle} src={process.env.REACT_APP_STORAGE_URL + '/' + image} alt="" />
            </DTableCell>
            <DTableCell> {name || '---'}</DTableCell>
            <DTableCell>{status === 'ACTIVE' ? 'منتشر شده' : 'منتشر نشده' || '---'}</DTableCell>
            <DTableCell>
                <Button
                    onClick={() => updateBannerStatus(id, status)}
                    variant="contained"
                    sx={{ fontSize: '14px', width: '8.5rem', color: 'white' }}
                    color={status === 'ACTIVE' ? 'brandWarning' : 'primary'}>
                    {status === 'ACTIVE' ? 'غیر فعال' : 'انتشار'}
                </Button>
            </DTableCell>
            <DTableCell>
                <Stack direction="row" justifyContent="center">
                    <IconButton onClick={() => handleDownload(process.env.REACT_APP_STORAGE_URL + '/' + image)} download="name">
                        <DownloadIcon fontSize="large" sx={{ color: '#F7C906', cursor: 'pointer' }} />
                    </IconButton>

                    <IconButton onClick={() => handleOpenModal(id)}>
                        <BorderColorIcon fontSize="large" sx={{ color: 'primary.main', cursor: 'pointer' }} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(id)}>
                        <DeleteOutlineIcon fontSize="large" sx={{ color: '#F77A06', cursor: 'pointer' }} />
                    </IconButton>
                </Stack>
            </DTableCell>
        </TableRow>
    );
}
const imageStyle = { width: '5.7rem', height: '5.7rem', borderRadius: '.5rem' };

export default BannerServiceDetail;
