import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Grid, TableHead, TableRow, TableCell, TableBody, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';

// Utils
import adminService from 'service/api/adminService';

// Components
import DBox from 'components/new/shared/DBox';
import DPagination from 'components/new/shared/DPagination/Index';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DTableWrapper from '../../../components/new/shared/DTable/DTableWrapper';
import DTableEmpty from '../../../components/new/shared/DTable/DTableEmpty';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import OrganizationRequestListItem from './OrganizationRequestListItem';
import ServiceRequest from './ServiceRequest';

// Assets
import theme from 'assets/theme';

const ServicesRequests = () => {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [loading, setLoading] = useState({ initial: true, filter: false });
    const [filters, setFilters] = useState({
        page: searchParams.get('page') ? +searchParams.get('page') : 1,
        name: searchParams.get('name') || '',
    });
    const [totalPage, setTotalPage] = useState(1);
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(false);
    const [showRequestInfoDialogIsOpen, setShowRequestInfoDialogIsOpen] = useState(false);

    const showRequestInfo = (req) => {
        setSelectedRequest(req);
        setShowRequestInfoDialogIsOpen(true);
    };
    const closeShowRequestInfo = () => {
        setShowRequestInfoDialogIsOpen(false);
    };
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
    const updateList = () => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters });
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
                .get(`service-requests?${params.toString()}`, { signal })
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
        <DashboardCard pt="2rem" meta={{ title: 'درخواست خدمت سازمانی' }}>
            <Breadcrumb links={breadCrumbLinks} />

            <DBox className={loading.page && 'box--isLoading'} sx={{ mt: '2rem', p: '26px 29px' }}>
                <DLoadingWrapper loading={loading.initial}>
                    <Box className={loading.refresh && 'box--isLoading'}>
                        <Grid container spacing={'2rem'}>
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
                                        {requests.length > 0 ? (
                                            requests.map((request, index) => (
                                                <OrganizationRequestListItem
                                                    report={request}
                                                    key={request.id}
                                                    style={{
                                                        backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                    }}
                                                    onShow={showRequestInfo}
                                                />
                                            ))
                                        ) : (
                                            <DTableEmpty />
                                        )}
                                    </TableBody>
                                </DTableWrapper>
                            </Grid>
                            <Grid item xs={12} mt="20px" sx={{ display: 'flex', justifyContent: 'center' }}>
                                {totalPage > 1 && <DPagination totalPages={totalPage} onPageChange={handlePageChange} />}
                            </Grid>
                        </Grid>
                    </Box>
                </DLoadingWrapper>
            </DBox>

            {showRequestInfoDialogIsOpen && (
                <ServiceRequest onClose={() => closeShowRequestInfo()} requestId={selectedRequest.id} onRefresh={updateList} />
            )}
        </DashboardCard>
    );
};
const tableColumns = [
    { title: 'نام سازمان' },
    { title: 'عنوان خدمت' },
    { title: 'تامین کننده' },
    { title: 'قیمت واحد (تومان)' },
    { title: 'تعداد' },
    { title: 'مبلغ کل (تومان)' },
    { title: 'تاریخ ثبت درخواست' },
    { title: 'وضعیت' },
    { title: 'عملیات' },
];
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const breadCrumbLinks = [
    { path: '/app/admin/', title: 'پیشخوان' },
    { path: '/app/admin/management-requests/organization-requests/', title: 'مدیریت درخواست‌ها' },
    { title: 'درخواست خدمت سازمانی' },
];
export default ServicesRequests;
