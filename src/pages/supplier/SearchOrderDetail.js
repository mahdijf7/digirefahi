import {Grid, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material';
import React, {useEffect, useState} from "react";
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import SupplierService from "../../service/api/supplier.service";
import DLoadingWrapper from "../../components/new/shared/DLoadingWrapper";
import DTableWrapper from "../../components/new/shared/DTable/DTableWrapper";

import theme from 'assets/theme';
import {ColorWhite} from "../../assets/theme/color";
import LoadingButton from "@mui/lab/LoadingButton";
import UseIcon from "../../assets/icone/svg/UseIcon";
import DSnackbar from "../../components/new/shared/DSnackbar";

const SearchOrderDetail = ({onClose, searchCode, searchOrders, showOrderDetail, order}) => {
    const [loading, setLoading] = useState({initial: true});
    const [orderDetail, setOrderDetail] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const tableColumns_1 = [
        {title: 'خریدار'},
        {title: 'کد ملی'},
        {title: 'نام سازمان'},
        {title: 'تاریخ ثبت '},


    ];
    const tableColumns_2 = [
        {title: 'خدمت'},
        {title: 'مبلغ خدمت'},
        {title: 'تامین کننده'},
        {title: 'استان خدمت'},

    ];

    const tableColumns_3 = [
        {title: 'عملیات'},
        {title: 'کد رهگیری'},
        {title: 'بار کد'},

    ];


    const getOrder = () => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await SupplierService.get(`orders/${order.id}`, {signal})
                .then((res) => {
             
                    setOrderDetail(res.data.data)
                    let selectCodes = []
                    res.data.data.codes.map(item => {
                        if (item.is_used === 1) {
                            selectCodes.push(item)
                        }
                    })
                    setSelectedItems(selectCodes)
                })
                .catch((err) => {
                 
                });

            setLoading({
                ...loading,
                initial: false,
                filter: false,
                page: false,
            });
        })();

        return () => controller.abort();
    }


    const usedOrderCode = (value) => {
        let req = {code: value}
        SupplierService.usedOrderCode(req)
            .then((res) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'کد با موفقیت استفاده شد.',
                        type: 'success',
                    },
                });
                getOrder()

            })
            .catch((err) => {
                
            });
    }


    useEffect(() => {
        getOrder()
    }, []);

    return (

        <DDialogWrapper open onClose={onClose} size="sg">
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({...snackBarData, show: false})}
            />
            <DDialogHeader title={`  ${searchCode} / ${orderDetail.service && orderDetail.service.name}`}
                           onClose={onClose}/>
            <DLoadingWrapper loading={loading.initial}>
                <Grid container spacing={'2rem'} className={loading.refresh && 'box--isLoading'}
                      style={{marginTop: 15}}>
                    {!order &&
                    <Typography>دیتایی برای نمایش وجود ندارد.</Typography>}
                    <Grid item xs={12}>
                        <DTableWrapper loading={loading}>
                            <TableHead>
                                <TableRow>
                                    {tableColumns_1.map((column, index) => {
                                        return (
                                            <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                                {column.title}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow style={{backgroundColor: '#ffffff',}}>
                                    <TableCell
                                        style={tableCellStyle}>{orderDetail.employee && orderDetail.employee.full_name}</TableCell>
                                    <TableCell
                                        style={tableCellStyle}>{orderDetail.employee && orderDetail.employee.national_code}</TableCell>
                                    <TableCell style={tableCellStyle}>{orderDetail.company_name}</TableCell>
                                    <TableCell
                                        style={tableCellStyle}>{orderDetail.created_at ? `${new Date(orderDetail.created_at).toLocaleTimeString('fa-IR')} - ${new Date(orderDetail.created_at).toLocaleDateString('fa-IR')}` : "-----"}   </TableCell>

                                </TableRow>
                            </TableBody>
                        </DTableWrapper>
                    </Grid>
                    <Grid item xs={12}>
                        <DTableWrapper loading={loading}>
                            <TableHead>
                                <TableRow>
                                    {tableColumns_2.map((column, index) => {
                                        return (
                                            <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                                {column.title}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow style={{backgroundColor: '#ffffff',}}>
                                    <TableCell
                                        style={tableCellStyle}>{orderDetail.service && orderDetail.service.name}</TableCell>
                                    <TableCell
                                        style={tableCellStyle}>{orderDetail.service && orderDetail.service.price}</TableCell>
                                    <TableCell
                                        style={tableCellStyle}>{orderDetail.service && orderDetail.service.supplier}</TableCell>
                                    <TableCell
                                        style={tableCellStyle}>{orderDetail.service && orderDetail.service.province[0] || '---'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </DTableWrapper>
                    </Grid>
                    <Grid item xs={12}>
                        <DTableWrapper loading={loading}>
                            <TableHead>
                                <TableRow>
                                    {tableColumns_3.map((column, index) => {
                                        return (
                                            <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                                {column.title}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderDetail.codes && orderDetail.codes.map(item => (
                                    <TableRow style={{backgroundColor: '#ffffff',}}>
                                        < TableCell
                                            style={tableCellStyle}>
                                            <LoadingButton
                                                variant="contained"
                                                disabled={item.is_used === 1}
                                                sx={yellowButtonStyle}
                                                color="error"
                                                onClick={() => {
                                                    usedOrderCode(item.value);
                                                }}
                                            >
                                                <UseIcon sx={{marginRight: '7px'}}/>
                                                استفاده شد
                                            </LoadingButton>

                                        </TableCell>

                                        <TableCell
                                            style={tableCellStyle}>{item.value}</TableCell>
                                        <TableCell style={tableCellStyle}>{'--'}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </DTableWrapper>


                    </Grid>
                </Grid>
            </DLoadingWrapper>
        </DDialogWrapper>

    );
};


const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const yellowButtonStyle = {

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

export default SearchOrderDetail;
