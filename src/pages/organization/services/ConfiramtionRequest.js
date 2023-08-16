import { useNavigate } from 'react-router-dom';
import { Box, Grid, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
// import AcceptReqIcon from "../../../../assets/icone/svg/AcceptReqIcon";
import DBox from '../../../components/new/shared/DBox';
import DLoadingWrapper from '../../../components/new/shared/DLoadingWrapper';
import DTableWrapper from '../../../components/new/shared/DTable/DTableWrapper';
import React, { useState } from 'react';
import { ColorWhite } from '../../../assets/theme/color';
import { getErrorForSnackbar } from '../../../utils/helpers';
import DSnackbar from '../../../components/new/shared/DSnackbar';
import OrganizationService from '../../../service/api/organization.service';

const DAcceptDialog = ({ title, loading, onClose, onAccept, service, count }) => {
    const navigate = useNavigate();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const tableColumns = [
        { title: 'عنوان خدمت' },
        { title: 'تامین کننده' },
        { title: 'استان خدمت' },
        { title: 'قیمت واحد (تومان)' },
        { title: 'تعداد' },
        { title: 'مبلغ کل (تومان)' },
    ];
    const createServiceRequest = async (status) => {
        const formData = new FormData();
        formData.append('service_id', service.id);
        formData.append('count', count);
        await OrganizationService.createServiceRequest(formData)
            .then((res) => {
                navigate('/app/organization/services/service-requests');
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
    };
    return (
        <DDialogWrapper open onClose={onClose} onClick={(e) => e.stopPropagation()}>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
            <Box sx={wrapperStyles}>
                <Box sx={{ display: 'flex', paddingBottom: '10px', mb: '20px' }}>
                    <Typography
                        color="rgba(0, 0, 0, 1)"
                        sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                        آیا از درخواست خدمت اطمینان دارید؟
                    </Typography>
                </Box>

                <DBox>
                    <DLoadingWrapper loading={loading.initial}>
                        <Box className={loading.refresh && 'box--isLoading'}>
                            <Grid container spacing={'2rem'}>
                                <Grid item xs={12}>
                                    <DTableWrapper>
                                        <TableHead>
                                            <TableRow>
                                                {tableColumns.map((column, index) => {
                                                    return (
                                                        <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                                            {column.title}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={tableCellStyle}>{service.name}</TableCell>
                                                <TableCell style={tableCellStyle}>{service.supplier.name}</TableCell>
                                                <TableCell style={tableCellStyle}>
                                                    {service.province && service.province.length === 0 && '---'}
                                                    <Box sx={{ display: 'grid' }}>
                                                        {service.province.map((province) => {
                                                            return <Typography>{province.name}</Typography>;
                                                        })}
                                                    </Box>
                                                </TableCell>
                                                <TableCell style={tableCellStyle}>{service.price.toLocaleString()}</TableCell>
                                                <TableCell style={tableCellStyle}>{count}</TableCell>
                                                <TableCell style={tableCellStyle}>
                                                    {(service.price * count).toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </DTableWrapper>
                                </Grid>
                            </Grid>
                        </Box>
                    </DLoadingWrapper>
                </DBox>

                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '10px',
                        marginTop: '40px',
                    }}>
                    <LoadingButton
                        loading={loading.save}
                        onClick={() => {
                            createServiceRequest();
                        }}
                        variant="contained"
                        sx={uploadBtnStyle}>
                        تایید درخواست
                    </LoadingButton>

                    <LoadingButton
                        loading={loading.save}
                        onClick={() => {
                            onClose();
                        }}
                        variant="contained"
                        sx={yellowButtonStyle}>
                        لغو
                    </LoadingButton>
                </Grid>
            </Box>
        </DDialogWrapper>
    );
};
const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
};
const tableHeadStyle = {
    backgroundColor: 'rgba(237, 251, 255, 1)',
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const tableCellStyle = {
    borderColor: 'rgba(217, 217, 217, 1)',
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const uploadBtnStyle = {
    padding: '4px 35px',
    backgroundColor: 'rgba(8, 119, 189, 1)',
    border: '1px solid rgba(8, 119, 189, 1)',
    borderRadius: '5px',
    fontSize: 12,
    color: '#fff',
    textDecoration: 'none',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin: '0 5px',
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(8, 119, 189, 1)',
        color: '#fff',
        textDecoration: 'none',
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(8, 119, 189, 1)',
        color: '#fff',
        textDecoration: 'none',
    },
};
const yellowButtonStyle = {
    width: '15% !important ',
    height: '3.3rem',
    borderRaduis: '10px',
    backgroundColor: 'rgba(247, 201, 6, 1)',
    color: '#000',
    fontSize: '1.2rem',
    boxShadow: 'none !important',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(247, 201, 6, 1)',
        color: '#000',
    },
    '&:disabled': {
        bgcolor: '#B4B4B4',
        color: ColorWhite,
    },
};
export default DAcceptDialog;
