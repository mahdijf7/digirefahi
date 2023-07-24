import React, {useEffect, useState} from 'react';
import {Box, Grid, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material';

// Utils
import OrganizationService from 'service/api/supplier.service';

// Components
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DPagination from 'components/new/shared/DPagination/Index';
import DBox from 'components/new/shared/DBox';
// Assets
import theme from '../../../assets/theme';
import UsedTicketsListItem from "./UsedTicketsListItem";
import CreditRequest from "../../organization/wallet/CreditRequest";
import UsedTicket from "./UsedTicket";
import SupplierService from "../../../service/api/supplier.service";

const tableColumns = [
    {title: 'عنوان خدمت'},
    {title: 'خریدار'},
    {title: 'کد ملی'},
    {title: 'نام سازمان'},
    {title: 'مبلغ (تومان)'},
    {title: 'تاریخ ثبت'},
    {title: 'جزئیات'},
];
const breadCrumbLinks = [
    {path: '/app/supplier/dashboard', title: 'پیشخوان'},
    {title: 'بلیط های استفاده شده'},
];

const UsedTickets = () => {
    const [loading, setLoading] = useState({initial: true, refresh: false});
    const [filters, setFilters] = useState({page: 1, name: ''});
    const [totalPage, setTotalPage] = useState(1);
    const [wallet, setWallet] = useState({remain: 0, amount: 0});
    const [orders, setOrders] = useState([]);
    const [showTicketInfoDialogIsOpen, setShowTicketInfoDialogIsOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(false);


    const handlePageChange = (newPage) => {
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({...filters, page: newPage});
    };
    const queryString = new URLSearchParams();
    queryString.append('name', filters.name);
    queryString.append('page', filters.page);

    useEffect(() => {
  
        (async () => {
            const params = new URLSearchParams();
            params.append('page', filters.page);
            await SupplierService.get(`orders?${params.toString()}`)
                .then((res) => {
                    setOrders(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                })
                .catch((err) => {
                });
            setLoading({
                ...loading,
                initial: false,
                refresh: false,
                delete: false,
                save: false,
            });
        })();
    }, [filters]);


    useEffect(() => {
             SupplierService.get(`orders-detail`)
                .then((res) => {
                    setWallet(res.data.data);
                })
                .catch((err) => {
                });

    }, []);

const onShowTicketInfo=(ticket)=>{
  
    setShowTicketInfoDialogIsOpen(true)
    setSelectedTicket(ticket)
}
const closeShowTicketInfo=()=>{
setShowTicketInfoDialogIsOpen(false)
}


    return (
        <DashboardCard pt="2rem" sx={styleCard}>
            <Breadcrumb links={breadCrumbLinks}/>



                <DBox
                    sx={{ mt: "2rem" , p:"26px 29px"}}>
                <DLoadingWrapper loading={loading.initial}>
                    <Grid container spacing={'4rem'}>
                        <Grid height="8rem" item xs={12}>
                            <span>آخرین بلیط های فروخته شده</span>
                        </Grid>
                        <Grid height="8rem" item xs={3} style={{paddingTop:"1.5rem"}} >
                            <div style={overallCredit}><span style={overallCreditTitle}>درآمد کل(تومان) </span><span
                                style={overallCreditTitle}>{wallet.total_income} </span>
                            </div>
                        </Grid>
                        <Grid height="8rem" item xs={3} style={{paddingTop:"1.5rem"}}>
                            <div style={serviceCount}><span style={overallCreditTitle}>تعداد خدمت ارائه شده </span><span
                                style={usedCreditPrice}>{(wallet.total_services)} </span></div>
                        </Grid>
                        <Grid height="8rem" item xs={3} style={{paddingTop:"1.5rem"}}>
                            <div style={oraganCount}><span style={overallCreditTitle}>تعداد سازمان </span>
                                <span
                                style={availableCreditPrice}>{wallet.total_companies}
                                </span></div>
                        </Grid>
                        <Grid height="8rem" item xs={3} style={{paddingTop:"1.5rem"}}>
                            <div style={employeeCount}><span style={overallCreditTitle}>تعداد کارمند (نفر) </span><span
                                style={availableCreditPrice}>{wallet.total_employees}
                            </span></div>
                        </Grid>

                    </Grid>
                </DLoadingWrapper>

        </DBox>



                <DBox
                    sx={{ mt: "2rem" , p:"26px 29px"}}>
                <DLoadingWrapper loading={loading.initial}>
                    <Grid container spacing={'2rem'} className={loading.refresh && 'box--isLoading'}>

                        <Grid item xs={12}>
                            <DTableWrapper loading={loading}>
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
                                    {orders.length > 0 ? (
                                        orders.map((report, index) => (

                                            <UsedTicketsListItem
                                                report={report}
                                                key={report.id}
                                                onShow={onShowTicketInfo}
                                                style={{
                                                    backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <DTableEmpty/>
                                    )}
                                </TableBody>
                            </DTableWrapper>
                        </Grid>
                        <Grid item xs={12} mt="20px" sx={{display: 'flex', justifyContent: 'center'}}>
                            {totalPage > 1 && <DPagination totalPages={totalPage} onPageChange={handlePageChange}/>}
                        </Grid>
                    </Grid>
                </DLoadingWrapper>

        </DBox>
            {showTicketInfoDialogIsOpen && (
                <UsedTicket onClose={() => closeShowTicketInfo()} requestId={selectedTicket.id} />
            )}

        </DashboardCard>
    );
};

const titleStyles = {
    fontSize: '20px',

};

const titleWalletStyles = {
    fontSize: '20px',
    paddingTop: 8

};

const styleCard = {
    '& button': {
        boxShadow: 'none !important',
        '@media (max-width: 1250px)': {
            fontSize: '1rem  !important',
        },
    },
};

const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const overallCredit = {
    border: "1px solid #EEEEEE",
    borderRadius: 10,
    borderRight: "10px solid rgba(8, 189, 113, 1)",
    height: 40,
    textAlign: 'center',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
};

const serviceCount = {
    border: "1px solid #EEEEEE",
    borderRadius: 10,
    borderRight: "10px solid rgba(247, 201, 6, 1)",
    height: 40,
    textAlign: 'center',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
};
const employeeCount = {
    border: "1px solid #EEEEEE",
    borderRadius: 10,
    borderRight: "10px solid rgba(8, 119, 189, 1)",
    height: 40,
    textAlign: 'center',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
};

const oraganCount = {
    border: "1px solid #EEEEEE",
    borderRadius: 10,
    borderRight: "10px solid rgba(0, 77, 136, 1)",
    height: 40,
    textAlign: 'center',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
};

const overallCreditTitle = {
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    fontWeight: 500,
    fontSize: 14,
    color: "#000",

};
const overallCreditRate = {
    fontSize: 12,
};

const usedCreditPrice = {
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    fontWeight: 500,
    fontSize: 14,
    color: "#656668",
};

const availableCreditPrice = {
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    fontWeight: 500,
    fontSize: 14,
    color: "#0877BD",
};
export default UsedTickets;
