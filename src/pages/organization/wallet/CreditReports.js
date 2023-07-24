import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Grid, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// Utils
import OrganizationService from 'service/api/organization.service';

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
import WalletReportListItem from './WalletReportListItem';

const tableColumns = [
    { title: 'نوع تراکنش' },
    { title: 'مبلغ (تومان)' },
    { title: 'دسته بندی' },
    { title: 'کارمند' },
    { title: 'شناسه پرداخت' },
    { title: 'وضعیت' },
    { title: 'تاریخ' },
    { title: 'زمان' },
];

const CreditReports = () => {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({ page: searchParams.get('page') ? +searchParams.get('page') : 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [wallet, setWallet] = useState({ remain: 0, amount: 0 });
    const [reports, setReports] = useState([]);

    const handlePageChange = (newPage) => {
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };

    const getWallet = async () => {
        await OrganizationService.getWallet()
            .then((res) => {
                setWallet(res.data.data);
            })
            .catch((err) => {});
    };
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            const params = new URLSearchParams();
            params.append('page', filters.page);
            filters.name && params.append(`name`, filters.name);

            navigate({
                pathname: location.pathname,
                search: `?${params.toString()}`,
            });

            await OrganizationService.get(`transactions?${params.toString()}`, { signal })
                .then((res) => {
                    setReports(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                })
                .catch((err) => {});

            setLoading({
                ...loading,
                initial: false,
                refresh: false,
            });
        })();
        return () => controller.abort();
    }, [filters]);

    useEffect(() => {
        getWallet();
    }, []);

    return (
        <DashboardCard pt="2rem" sx={styleCard}>
            <Breadcrumb links={breadCrumbLinks} />

            <DBox sx={{ mt: '2rem', p: '26px 29px' }}>
                <DLoadingWrapper loading={loading.initial}>
                    <Grid container spacing={'4rem'}>
                        <Grid height="8rem" item xs={2}>
                            <Typography style={titleWalletStyles}>{'کیف پول'}</Typography>
                        </Grid>
                        <Grid height="8rem" item xs={3}>
                            <div style={overallCredit}>
                                <span style={overallCreditTitle}>اعتبار کل </span>
                                <span style={overallCreditTitle}>
                                    {wallet.total} <span style={overallCreditRate}>تومان</span>{' '}
                                </span>
                            </div>
                        </Grid>
                        <Grid height="8rem" item xs={3}>
                            <div style={usedCredit}>
                                <span style={overallCreditTitle}>اعتبار مصرف شده </span>
                                <span style={usedCreditPrice}>
                                    {wallet.amount} <span style={overallCreditRate}>تومان</span>{' '}
                                </span>
                            </div>
                        </Grid>
                        <Grid height="8rem" item xs={3}>
                            <div style={availableCredit}>
                                <span style={overallCreditTitle}>موجودی </span>
                                <span style={availableCreditPrice}>
                                    {wallet.remain} <span style={overallCreditRate}>تومان</span>{' '}
                                </span>
                            </div>
                        </Grid>
                    </Grid>
                </DLoadingWrapper>
            </DBox>

            <DBox sx={{ mt: '2rem', p: '26px 29px' }}>
                <DLoadingWrapper loading={loading.initial}>
                    <Grid container spacing={'2rem'} className={loading.refresh && 'box--isLoading'}>
                        <Grid height="4rem" item xs={3}>
                            <Typography sx={titleStyles}>{'سوابق تراکنش'}</Typography>
                        </Grid>
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
                                    {reports.length > 0 ? (
                                        reports.map((report, index) => (
                                            <WalletReportListItem
                                                report={report}
                                                key={report.id}
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
                            <Grid item xs={12} mt="20px" sx={{ display: 'flex', justifyContent: 'center' }}>
                                <DPagination current={filters.page} totalPages={totalPage} onPageChange={handlePageChange} />
                            </Grid>
                        )}
                    </Grid>
                </DLoadingWrapper>
            </DBox>
        </DashboardCard>
    );
};

const titleStyles = {
    fontSize: '20px',
};

const titleWalletStyles = {
    fontSize: '20px',
    paddingTop: 8,
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
    border: '1px solid #EEEEEE',
    borderRadius: 10,
    borderRight: '10px solid #A6EBFF',
    height: 40,
    textAlign: 'center',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
};

const usedCredit = {
    border: '1px solid #EEEEEE',
    borderRadius: 10,
    borderRight: '10px solid #DDE1E6',
    height: 40,
    textAlign: 'center',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
};
const availableCredit = {
    border: '1px solid #EEEEEE',
    borderRadius: 10,
    borderRight: '10px solid #0877BD',
    height: 40,
    textAlign: 'center',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
};

const overallCreditTitle = {
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    fontWeight: 500,
    fontSize: 14,
    color: '#000',
};
const overallCreditRate = {
    fontSize: 12,
};

const usedCreditPrice = {
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    fontWeight: 500,
    fontSize: 14,
    color: '#656668',
};

const availableCreditPrice = {
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    fontWeight: 500,
    fontSize: 14,
    color: '#0877BD',
};
const breadCrumbLinks = [
    { path: '/app/organization/dashboard/', title: 'پیشخوان' },
    {
        path: '/app/organization/wallet/creditReports/',
        title: ' کیف پول ',
    },
    { title: 'گزارش کیف پول' },
];
export default CreditReports;
