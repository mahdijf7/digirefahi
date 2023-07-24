import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// Component
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import adminService from 'service/api/adminService';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import theme from 'assets/theme';
import { isEmpty } from 'lodash';
import BarcodeCreator from 'components/Common/Barcode/BarcodeCreator';
 

function FactorDetailDialog({ open, handleClose, factorId }) {
    const employeeTableColumns = [{ title: 'خریدار' }, { title: 'کدملی' }, { title: 'نام سازمان' }];
    const serviceTableColumns = [{ title: 'خدمت' }, { title: 'مبلغ خدمت' }, { title: 'تامین کننده' }, { title: 'تاریخ صدور' }];

    const statusTableColumns = [
        { title: 'شماره خرید' },
        { title: 'کد رهگیری / بن تخفیف' },
        { title: 'بارکد' },
        { title: 'وضعیت' },
        { title: 'تاریخ استفاده' },
    ];

    const [loading, setLoading] = useState(true);
    const [factor, setFactor] = useState({});

    const getTransactions = async () => {
        setLoading(true);
        await adminService
            .getOrderDataById(factorId)
            .then((res) => {
                setLoading(false);
                setFactor(res.data.data);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        factorId && getTransactions();
    }, [factorId]);

    console.log(factor);

    return (
        <div>
            <DDialogWrapper size="sg" open={open} onClose={handleClose}>sd
                <Box position="relative">
                    <DLoadingWrapper loading={loading}>
                        <DDialogHeader title="فاکتور خرید خدمت" onClose={handleClose} />
                        <Box
                            position="absolute"
                            top="-.5rem"
                            right="20rem"
                            gap="2rem"
                            className="flex"
                            bgcolor="primary.light"
                            height="3.6rem"
                            minWidth="5rem"
                            maxWidth="17rem"
                            px="2rem">
                            <Typography color="primary.main">شماره فاکتور </Typography>
                            <Typography color="primary.main">{factor?.number}</Typography>
                        </Box>
                        <Divider sx={{ my: '2rem' }} />
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <DTableWrapper>
                                    <TableHead>
                                        <TableRow>
                                            {employeeTableColumns.map((column, index) => {
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
                                            <TableCell style={tableCellStyle}>{factor?.employee?.full_name}</TableCell>
                                            <TableCell style={tableCellStyle}>{factor?.employee?.national_code}</TableCell>
                                            <TableCell style={tableCellStyle}>{factor?.company_name}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </DTableWrapper>
                            </Grid>
                            <Grid item xs={12}>
                                <DTableWrapper>
                                    <TableHead>
                                        <TableRow>
                                            {serviceTableColumns.map((column, index) => {
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
                                            <TableCell style={tableCellStyle}>{factor?.service?.name}</TableCell>
                                            <TableCell style={tableCellStyle}>
                                                {Number(factor?.service?.price).toLocaleString('IRR')}
                                            </TableCell>
                                            <TableCell style={tableCellStyle}>{factor?.service?.supplier}</TableCell>
                                            <TableCell style={tableCellStyle}>
                                                {new Date(factor?.created_at).toLocaleDateString('fa-IR')}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </DTableWrapper>
                            </Grid>
                            <Grid item xs={12}>
                                <DTableWrapper>
                                    <TableHead>
                                        <TableRow>
                                            {statusTableColumns.map((column, index) => {
                                                return (
                                                    <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                                        {column.title}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {factor?.codes &&
                                            factor?.codes.length > 0 &&
                                            factor?.codes.map((code, index) => (
                                                <TableRow key={index}>
                                                    <TableCell style={tableCellStyle}>{code?.id}</TableCell>
                                                    <TableCell style={tableCellStyle}>{code?.value}</TableCell>
                                                    <TableCell style={tableCellStyle}>
                                                        <BarcodeCreator id={code?.value} />
                                                    </TableCell>
                                                    <TableCell style={tableCellStyle}>
                                                        {code?.is_used ? (
                                                            <Typography component="span" color="green">
                                                                استفاده شده
                                                            </Typography>
                                                        ) : (
                                                            <Typography component="span" color="blue">
                                                                استفاده نشده
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell style={tableCellStyle}>
                                                        {isEmpty(code?.used_date)
                                                            ? '-'
                                                            : new Date(code?.used_date).toLocaleDateString('fa-IR')}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </DTableWrapper>
                            </Grid>
                        </Grid>
                    </DLoadingWrapper>
                </Box>
            </DDialogWrapper>
        </div>
    );
}

const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.2rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    direction: 'ltr',
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default React.memo(FactorDetailDialog);
