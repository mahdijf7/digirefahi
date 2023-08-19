import { useState, useEffect } from 'react';
import { Grid, TableCell, TableHead, TableRow, TableBody, Box } from '@mui/material';

// Utils
import organizationService from 'service/api/organization.service';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import OrderHistoryDetail from 'layout/Admin/Reports/OrdersHistory/OrdersHistoryDetail';
import OrdersHistoryInvoiceDetail from 'layout/Admin/Reports/OrdersHistory/OrdersHistoryInvoiceDetail';
import DashboardCard from 'components/Common/Card/DashboardCard';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';

// Assets
import theme from 'assets/theme';
import DBox from 'components/new/shared/DBox';

const breadCrumbLinks = [
    { path: '/app/organization/dashboard', title: 'پیشخوان' },
    { path: '/app/organization/reports/orders-history/', title: 'گزارشات' },
    { title: 'تاریخچه سفارشات' },
];

function OrganizationOrderHistory(props) {
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({ page: 1, name: '' });
    const [totalPage, setTotalPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const [invoiceId, setInvoiceId] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSelectDetail = (id) => {
        console.log(id, 'GETTING THE ID');
        setInvoiceId(id);
        handleOpen();
    };

    const tableColumns = [
        { title: 'عنوان خدمت' },
        { title: 'خریدار' },
        { title: 'کد ملی' },
        { title: 'نام سازمان' },
        { title: 'مبلغ (تومان)' },
        { title: 'تاریخ ثبت درخواست' },
        { title: 'جزئیات' },
    ];

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };
    const queryString = new URLSearchParams();
    queryString.append('page', filters.page);
    filters.name && queryString.append('name', filters.name);

    const getTransactions = async () => { 
        setLoading({
            ...loading,
            refresh: true,
        });
        await organizationService
            .get(`orders?${queryString}`)
            .then((res) => { 
                setLoading({
                    initial: false,
                    refresh: false,
                });

                setTransactions(res.data.data);
                setTotalPage(res.data.meta.last_page);
            })
            .catch((err) => { 
                setLoading({
                    initial: false,
                    refresh: false,
                });
            });
    };

    useEffect(() => {
        getTransactions();
    }, [filters]);
    return (
        <DashboardCard pt="2rem" sx={styleCard}>
            <Breadcrumb links={breadCrumbLinks} />

            <DLoadingWrapper loading={loading.initial}>
                <DBox sx={wrapperStyles} className={loading.refresh && 'box--isLoading'}>
                    <Grid container>
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
                                    {transactions.length > 0 ? (
                                        transactions.map((trnsaction, index) => (
                                            <OrderHistoryDetail
                                                onSelectDetail={onSelectDetail}
                                                open={open}
                                                handleOpen={handleOpen}
                                                handleClose={handleClose}
                                                trnsaction={trnsaction}
                                                key={trnsaction.id}
                                                style={{
                                                    backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <DTableEmpty />
                                    )}
                                </TableBody>
                            </DTableWrapper>
                        </Grid>

                        {totalPage > 1 && (
                            <Grid item xs={12}>
                                <Box mt="2rem">
                                    <DPagination totalPages={totalPage} onPageChange={handlePageChange} />
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </DBox>
            </DLoadingWrapper>
            <OrdersHistoryInvoiceDetail
                apiService={organizationService}
                invoiceId={invoiceId}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
        </DashboardCard>
    );
}

export default OrganizationOrderHistory;

const styleCard = {
    '& button': {
        boxShadow: 'none !important',
        '@media (max-width: 1250px)': {
            fontSize: '1rem  !important',
        },
    },
};

const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    padding: '24px 30px',
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
