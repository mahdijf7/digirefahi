import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Grid, TableBody, TableCell, TableHead, TableRow, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';

// Utils
import adminService from 'service/api/adminService';

// Components
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DPagination from 'components/new/shared/DPagination/Index';
import DBox from 'components/new/shared/DBox';
import DSnackbar from '../../../components/new/shared/DSnackbar';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import WalletRequestsListItem from './WalletRequestsListItem';

// Assets
import theme from '../../../assets/theme';
import CreditRequest from './CreditRequest';

const AdminCreditRequests = () => {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({
        page: searchParams.get('page') ? +searchParams.get('page') : 1,
        name: searchParams.get('name') || '',
    });
    const [totalPage, setTotalPage] = useState(1);
    const [requests, setRequests] = useState([]);
    const [showRequestInfoDialogIsOpen, setShowRequestInfoDialogIsOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(false);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };
    const filterHandler = (values) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, name: values.name, page: 1 });
    };
    const showRequestInfo = (req) => {
        setSelectedRequest(req);
        setShowRequestInfoDialogIsOpen(true);
    };
    const closeShowRequestInfo = () => {
        setShowRequestInfoDialogIsOpen(false);
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            const params = new URLSearchParams();
            params.append('page', filters.page);
            params.append('per_page', 10);
            filters.name && params.append(`name`, filters.name);

            navigate({
                pathname: location.pathname,
                search: `?${params.toString()}`,
            });

            await adminService
                .get(`credit-requests?${params.toString()}`, { signal })
                .then((res) => {
                    setRequests(res.data.data);
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

    return (
        <DashboardCard pt="2rem" sx={styleCard} meta={{ title: 'درخواست افزایش اعتبار' }}>
            <Breadcrumb links={breadCrumbLinks} />

            <DBox sx={{ mt: '2rem', p: '26px 29px' }}>
                <DLoadingWrapper loading={loading.initial}>
                    <Grid container spacing={'2rem'} className={loading.refresh && 'box--isLoading'}>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', borderBottom: '1px solid #EEEEEE', pb: '12px' }}>
                                <Formik enableReinitialize={true} initialValues={filters} onSubmit={filterHandler}>
                                    {({}) => (
                                        <Form>
                                            <CustomInputBase
                                                name="name"
                                                placeholder={t('searchRequest')}
                                                wrapperSx={{ width: '400px' }}
                                                inputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <SearchIcon sx={{ fontSize: '20px' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
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
                                    {requests.length > 0 ? (
                                        requests.map((request, index) => (
                                            <WalletRequestsListItem
                                                request={request}
                                                key={request.id}
                                                style={{
                                                    backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                }}
                                                onShowRequestInfo={showRequestInfo}
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
                                <DPagination current={filters.page} totalPages={totalPage} onPageChange={handlePageChange} />{' '}
                            </Grid>
                        )}
                    </Grid>
                </DLoadingWrapper>
                <DSnackbar
                    open={snackBarData.show}
                    info={snackBarData.data}
                    onClose={() => setSnackBarData({ ...snackBarData, show: false })}
                />
            </DBox>
            {showRequestInfoDialogIsOpen && (
                <CreditRequest
                    onClose={() => closeShowRequestInfo()}
                    requestId={selectedRequest.id}
                    onRefresh={() => setFilters({ ...filters })}
                />
            )}
        </DashboardCard>
    );
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
const breadCrumbLinks = [
    { path: '/app/admin/', title: 'پیشخوان' },
    { path: '/app/admin/management-requests/credit-requests/', title: 'مدیریت درخواست‌ها' },
    { title: 'درخواست افزایش اعتبار' },
];

const tableColumns = [
    { title: 'نام سازمان' },
    { title: 'شناسه درخواست' },
    { title: 'مبلغ (تومان)' },
    { title: 'تاریخ ثبت درخواست' },
    { title: 'وضعیت' },
    { title: 'عملیات' },
];

export default AdminCreditRequests;
