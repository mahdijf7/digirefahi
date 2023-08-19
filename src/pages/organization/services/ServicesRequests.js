import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Grid, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// Utils

// Components
import DBox from 'components/new/shared/DBox';
import DPagination from 'components/new/shared/DPagination/Index';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DTableWrapper from '../../../components/new/shared/DTable/DTableWrapper';
import DTableEmpty from '../../../components/new/shared/DTable/DTableEmpty';
import adminService from '../../../service/api/adminService';
import OrganizationRequestListItem from './OrganizationRequestListItem';
import ServiceRequest from './ServiceRequest';
import DServiceBox from '../../../components/new/shared/DServiceBox';
import OrganizationService from '../../../service/api/organization.service';
// import theme from "../../../assets/theme/default";

const breadCrumbLinks = [
    { path: '/app/organization/dashboard/', title: 'پیشخوان' },
    {
        path: '/app/organization/services/service-requests/',
        title: ' مدیریت خدمات ',
    },
    { title: ' خدمت سازمانی' },
];

const tableColumns = [
    { title: 'عنوان خدمت' },
    { title: 'تامین کننده' },
    { title: 'قیمت واحد (تومان)' },
    { title: 'تعداد' },
    { title: 'مبلغ کل (تومان)' },
    { title: 'تاریخ ثبت درخواست' },
    { title: 'وضعیت' },
    { title: 'عملیات' },
];
const prices = [
    { id: 1, title: 'کمتر از 500.000 تومان', from: '', to: 500000 },
    {
        id: 2,
        title: 'بین 500.000 تا 1.000.000 تومان',
        from: 500000,
        to: 1000000,
    },
    {
        id: 3,
        title: 'بین 1.000.000 تا 2.000.000 تومان',
        from: 1000000,
        to: 2000000,
    },
    { id: 4, title: 'بیشتر از 2.000.000 تومان', from: 2000000, to: '' },
];
const modifyArraySearchParam = (param, keys = ['id', 'name']) => {
    if (param.length > 0) {
        return param.reduce((f, c) => {
            const splittedParam = c.split(',');
            f.push({ [keys[0]]: splittedParam[0], [keys[1]]: splittedParam[1] });
            return f;
        }, []);
    }
    return [];
};

const ServicesRequests = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState({ initial: true, filter: false, page: false });
    const [filtersOrg, setFiltersOrg] = useState({ page: 1, name: '' });
    const [filters, setFilters] = useState({
        suppliers: modifyArraySearchParam(searchParams.getAll('suppliers')),
        provinces: modifyArraySearchParam(searchParams.getAll('provinces')),
        price: searchParams.get('price') ? prices.filter((item) => item.id === +searchParams.get('price'))[0] : '',
    });
    const [page, setPage] = useState(searchParams.get('page') ? +searchParams.get('page') : 1);
    const [pageOrg, setPageOrg] = useState(searchParams.get('page') ? +searchParams.get('page') : 1);
    const [totalPage, setTotalPage] = useState(1);
    const [totalPageOrg, setTotalPageOrg] = useState(1);
    const [services, setServices] = useState([]);
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(false);
    const [showRequestInfoDialogIsOpen, setShowRequestInfoDialogIsOpen] = useState(false);
    const filterHandler = (values) => {
        if (loading.filter) return;
        setLoading({ ...loading, filter: true });
        setPage(1);
        setFilters({ ...filters, suppliers: values.suppliers, provinces: values.provinces, price: values.price });
    };

    const handlePageChange = (newPage) => {
        if (loading.page) return;
        setLoading({
            ...loading,
            page: true,
        });
        setPage(newPage);
    };

    const handlePageChangeOrg = (newPage) => {
        if (loading.page) return;
        setLoading({
            ...loading,
            page: true,
        });
        setPageOrg(newPage);
    };

    const showRequestInfo = (req) => {
        setSelectedRequest(req);
        setShowRequestInfoDialogIsOpen(true);
    };
    const closeShowRequestInfo = () => {
        setShowRequestInfoDialogIsOpen(false);
    };

    useEffect(() => {
        const apiParams = new URLSearchParams();
        const routeParams = new URLSearchParams();

        if (filters.suppliers && filters.suppliers.length > 0) {
            filters.suppliers.forEach((item, index) => {
                apiParams.append(`suppliers[${index}]`, item.id);
                routeParams.append(`suppliers`, `${item.id},${item.name}`);
            });
        }
        if (filters.provinces && filters.provinces.length > 0) {
            filters.provinces.forEach((item, index) => {
                apiParams.append(`provinces[${index}]`, item.id);
                routeParams.append(`provinces`, `${item.id},${item.name}`);
            });
        }
        if (filters.price) {
            if (filters.price.from) apiParams.append('price_from', filters.price.from);
            if (filters.price.to) apiParams.append('price_to', filters.price.to);
            routeParams.append(`price`, filters.price.id);
        }

        apiParams.append('page', page);
        routeParams.append(`page`, page);

        navigate({
            pathname: location.pathname,
            search: `?${routeParams.toString()}`,
        });
        apiParams.append('type', 'COMPANY');
        apiParams.append('per_page', 10);
        (async () => {
            await OrganizationService.getServices(apiParams.toString())
                .then((res) => {
                    setServices(res.data.data);
                    setTotalPage(res.data.meta.last_page);
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
    }, [filters, page]);

    useEffect(() => {
        
        (async () => {
            const params = new URLSearchParams();
            params.append('page', filtersOrg.page);
            await OrganizationService.get(`service-requests?${params.toString()}`)
                .then((res) => {
                    setRequests(res.data.data);
                    setTotalPageOrg(res.data.meta.last_page);
                })
                .catch((err) => {});
            setLoading({
                ...loading,
                initial: false,
                refresh: false,
                delete: false,
                save: false,
            });
        })();
    }, [filtersOrg]);

    return (
        <DashboardCard pt="2rem">
            <Breadcrumb links={breadCrumbLinks} />

            <DBox className={loading.page && 'box--isLoading'} sx={{ mt: '2rem', p: '26px 29px' }}>
                <DLoadingWrapper loading={loading.initial}>
                    <Box className={loading.refresh && 'box--isLoading'}>
                        <Grid container spacing={'2rem'}>
                            <Grid height="4rem" item xs={3}>
                                <Typography sx={titleStyles}>{'خدمات سازمانی'}</Typography>
                            </Grid>
                            <Grid container columnSpacing={'44px'} rowSpacing="30px" mt={'10px'}>
                                {services && services.length === 0 && <Typography>سرویسی برای نمایش وجود ندارد.</Typography>}
                                {services.map((service) => (
                                    <Grid item md={3} xl={2.4} key={service.id}>
                                        <DServiceBox service={service} to={`/app/organization/services/service-requests/${service.id}`} />
                                    </Grid>
                                ))}

                                {totalPage > 1 && (
                                    <Grid item xs={12} mt="30px" sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <DPagination current={page} totalPages={totalPage} onPageChange={handlePageChange} />
                                    </Grid>
                                )}
                            </Grid>
 
                        </Grid>
                    </Box>
                </DLoadingWrapper>
            </DBox>
            <DBox className={loading.page && 'box--isLoading'} sx={{ mt: '2rem', p: '26px 29px' }}>
                <DLoadingWrapper loading={loading.initial}>
                    <Box className={loading.refresh && 'box--isLoading'}>
                        <Grid container spacing={'2rem'}>
                            <Grid height="4rem" item xs={3}>
                                <Typography sx={titleStyles}>{'نمایش درخواست ها'}</Typography>
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
                                {totalPageOrg > 1 && <DPagination totalPages={totalPageOrg} onPageChange={handlePageChangeOrg} />}
                            </Grid>
                        </Grid>
                    </Box>
                </DLoadingWrapper>
            </DBox>

            {showRequestInfoDialogIsOpen && (
                <ServiceRequest
                    onClose={() => closeShowRequestInfo()}
                    requestId={selectedRequest.id}
                    requestService={selectedRequest}
                    onRefresh={() => setFiltersOrg({ ...filtersOrg })}
                />
            )}
        </DashboardCard>
    );
};
const titleWalletStyles = {
    fontSize: '20px',
    paddingTop: 8,
};
const titleStyles = {
    fontSize: '20px',
};
const tableHeadStyle = {
    // backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default ServicesRequests;
