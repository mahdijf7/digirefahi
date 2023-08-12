import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import { DItem } from 'components/new/shared/DItem';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DPagination from 'components/new/shared/DPagination/Index';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import { DEmployeeCreditChart } from 'components/new/shared/DEmployeeCreditChart';
import DBox from 'components/new/shared/DBox';
import CustomInputBase from 'components/Common/Form/CustomInputBase';

const ServicesCategories = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();
    const [loading, setLoading] = useState({ initial: true, page: false, refresh: false });
    const [page, setPage] = useState(searchParams.get('page') ? +searchParams.get('page') : 1);
    const [totalPage, setTotalPage] = useState(1);
    const [suppliers, setSuppliers] = useState([]);
    const [filters, setFilters] = useState({
        name: searchParams.get('name') || '',
    });

    const handlePageChange = (newPage) => {
        if (loading.page) return;
        setLoading({
            ...loading,
            page: true,
        });
        setPage(newPage);
    };
    const search = (values) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });

        setFilters({
            name: values.name,
        });
    };

    useEffect(() => {
        const apiParams = new URLSearchParams();
        const routeParams = new URLSearchParams();

        apiParams.append('page', page);
        apiParams.append('per_page', 12);
        routeParams.append('page', page);

        filters.name && apiParams.append('name', filters.name);
        filters.name && routeParams.append('name', filters.name);

        navigate({
            pathname: location.pathname,
            search: `?${routeParams.toString()}`,
        });

        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await dashboardService
                .get(`suppliers?${apiParams.toString()}`, { signal })
                .then((res) => {
                    setSuppliers(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                })
                .catch((err) => {
                    console.log(5555555);
                });

            setLoading({
                initial: false,
            });
        })();

        return () => controller.abort();
    }, [page, filters]);

    return (
        <DashboardCard pt="30px">
            <DLoadingWrapper loading={loading.initial} sx={{ p: '32px 0' }}>
                <Breadcrumb links={breadCrumbLinks} />

                <Grid container spacing="20px" mt="4px">
                    <Grid item xs={12} lg={3}>
                        <DEmployeeCreditChart />
                    </Grid>
                    <Grid item xs={12} lg={9}>
                        <DBox sx={{ padding: '24px 30px' }} className={(loading.refresh || loading.page) && 'box--isLoading'}>
                            <Grid container>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ borderBottom: '1px solid rgba(238, 238, 238, 1)', pb: '24px', mb: '24px!important' }}>
                                    <Formik enableReinitialize={true} initialValues={filters} onSubmit={search}>
                                        <Form>
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <CustomInputBase name="name" placeholder={t('searchSupplier')} />
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    </Formik>
                                </Grid>
                                {suppliers && suppliers.length === 0 && (
                                    <Grid item xs={12}>
                                        <Typography>تامین‌کننده‌ای برای نمایش وجود ندارد.</Typography>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Grid container columnSpacing={'44px'} rowSpacing="30px">
                                        {suppliers.map((supplier) => (
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={supplier.id}>
                                                <DItem
                                                    name={supplier.name}
                                                    image={supplier.logo}
                                                    to={`/app/dashboard/services?suppliers=${supplier.id},${supplier.name}`}
                                                />
                                            </Grid>
                                        ))}
                                        {totalPage > 1 && (
                                            <Grid item xs={12} mt="30px" sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <DPagination
                                                    current={page}
                                                    totalPages={totalPage}
                                                    onPageChange={handlePageChange}
                                                />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DBox>
                    </Grid>
                </Grid>
            </DLoadingWrapper>
        </DashboardCard>
    );
};
const breadCrumbLinks = [
    { path: '/app/dashboard/', title: 'پیشخوان' },
    { path: '/app/dashboard/services/', title: 'خدمات رفاهی' },
    { title: 'خدمات رفاهی براساس تامین‌کننده' },
];

export default ServicesCategories;
