import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Form, Formik } from 'formik';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import DBox from 'components/new/shared/DBox';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import DServiceBox from 'components/new/shared/DServiceBox';
import DPagination from 'components/new/shared/DPagination/Index';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import { DEmployeeCreditChart } from 'components/new/shared/DEmployeeCreditChart';

const modifyArraySearchParam = (param, keys = ['id', 'name']) => {
    if (param.length > 0) {
        return param.reduce((f, c) => {
            const splittedParam = c.split(',');
            f.push({ [keys[0]]: keys[0] === 'id' ? +splittedParam[0] : splittedParam[0], [keys[1]]: splittedParam[1] });
            return f;
        }, []);
    }
    return [];
};

const Services = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState({ initial: true, page: false, filter: false });
    const [page, setPage] = useState(searchParams.get('page') ? +searchParams.get('page') : 1);
    const [totalPage, setTotalPage] = useState(1);
    const [services, setServices] = useState([]);
    const [filters, setFilters] = useState({
        suppliers: modifyArraySearchParam(searchParams.getAll('suppliers')),
        categories: modifyArraySearchParam(searchParams.getAll('categories')),
        provinces: modifyArraySearchParam(searchParams.getAll('provinces')),
        // price: searchParams.get('price') ? prices.filter((item) => item.id === +searchParams.get('price'))[0] : '',
    });
    

    const handlePageChange = (newPage) => {
        if (loading.page) return;
        setLoading({
            ...loading,
            page: true,
        });
        setPage(newPage);
    };
    const filterHandler = (values) => {
        if (loading.filter) return;
        setLoading({ ...loading, filter: true });
        setPage(1);
        setFilters({ ...filters, suppliers: values.suppliers, provinces: values.provinces, categories: values.categories });
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
        if (filters.categories && filters.categories.length > 0) {
            filters.categories.forEach((item, index) => {
                apiParams.append(`categories[${index}]`, item.id);
                routeParams.append(`categories`, `${item.id},${item.name}`);
            });
        }
        if (filters.provinces && filters.provinces.length > 0) {
            filters.provinces.forEach((item, index) => {
                apiParams.append(`provinces[${index}]`, item.id);
                routeParams.append(`provinces`, `${item.id},${item.name}`);
            });
        }
        // if (filters.price) {
        //     if (filters.price.from) apiParams.append('price_from', filters.price.from);
        //     if (filters.price.to) apiParams.append('price_to', filters.price.to);
        //     routeParams.append(`price`, filters.price.id);
        // }

        apiParams.append('page', page);
        routeParams.append(`page`, page);

        navigate({
            pathname: location.pathname,
            search: `?${routeParams.toString()}`,
        });
        apiParams.append('type', 'BASIC');
        apiParams.append('per_page', 12);

        (async () => {
            await dashboardService
                .get(`services?${apiParams.toString()}`)
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

    return (
        <DashboardCard pt="30px">
            <DLoadingWrapper loading={loading.initial} sx={{ p: '32px 0' }}>
                <Grid container>
                    <Grid item xs={12} mb="24px">
                        <Breadcrumb links={breadCrumbLinks} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing="20px">
                            <Grid item xs={3}>
                                <DEmployeeCreditChart />
                            </Grid>
                            <Grid item xs={9}>
                                <DBox
                                    sx={{ padding: '24px 30px' }}
                                    className={(loading.filter || loading.page) && 'box--isLoading'}>
                                    <Grid container>
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{
                                                borderBottom: '1px solid rgba(238, 238, 238, 1)',
                                                pb: '24px',
                                                mb: '24px!important',
                                            }}>
                                            <Formik enableReinitialize={true} initialValues={filters} onSubmit={filterHandler}>
                                                {({ values, setFieldValue, resetForm, handleReset, handleSubmit }) => (
                                                    <Form>
                                                        <Grid
                                                            container
                                                            columnSpacing={'20px'}
                                                            rowSpacing="20px"
                                                            justifyContent="flex-end">
                                                            <Grid item xs={3}>
                                                                <DAutoComplete
                                                                    name="categories"
                                                                    placeholder="انتخاب دسته‌بندی  "
                                                                    buttonProps={{ label: 'دسته‌بندی' }}
                                                                    formControlStyle={{ height: '42px' }}
                                                                    isAsync
                                                                    callOnOpen
                                                                    searchOnType
                                                                    multiple
                                                                    apiPath={`employee/categories`}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <DAutoComplete
                                                                    name="provinces"
                                                                    placeholder="انتخاب استان"
                                                                    buttonProps={{ label: 'استان' }}
                                                                    formControlStyle={{ height: '42px' }}
                                                                    isAsync
                                                                    singleCall
                                                                    callOnOpen
                                                                    multiple
                                                                    apiPath={`province`}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <DAutoComplete
                                                                    name="suppliers"
                                                                    placeholder="انتخاب تامین کننده"
                                                                    buttonProps={{ label: 'تامین کننده' }}
                                                                    formControlStyle={{ height: '42px' }}
                                                                    isAsync
                                                                    callOnOpen
                                                                    searchOnType
                                                                    multiple
                                                                    apiPath={`employee/suppliers`}
                                                                />
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <LoadingButton
                                                                    loading={loading.filter}
                                                                    type="submit"
                                                                    variant="contained"
                                                                    fullWidth
                                                                    size="large"
                                                                    sx={{ fontSize: '14px', boxShadow: 'none' }}>
                                                                    اعمال فیلتر
                                                                </LoadingButton>
                                                            </Grid>

                                                            {/*    <Grid item xs={3}>
                                                    <DSelect
                                                        name="price"
                                                        formControlStyle={{ height: '42px' }}
                                                        placeholder="قیمت"
                                                        optionLabelKey="title"
                                                        defaultOptions={prices}
                                                    />
                                                </Grid>*/}

                                                            <Grid item xs={3}>
                                                                <LoadingButton
                                                                    disabled={loading.filter}
                                                                    type="button"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    size="large"
                                                                    sx={{ fontSize: '14px', boxShadow: 'none' }}
                                                                    startIcon={
                                                                        <DeleteOutlineIcon sx={{ margin: '0 0 0 1rem' }} />
                                                                    }
                                                                    onClick={() => { 
                                                                        resetForm({
                                                                            values: {
                                                                                suppliers: [],
                                                                                categories: [],
                                                                            },
                                                                        });
                                                                        handleSubmit();
                                                                    }}>
                                                                    حذف فیلترها
                                                                </LoadingButton>
                                                            </Grid>
                                                        </Grid>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </Grid>
                                        {services && services.length === 0 && (
                                            <Grid item xs={12}>
                                                <Typography>سرویسی برای نمایش وجود ندارد.</Typography>
                                            </Grid>
                                        )}
                                        <Grid item xs={12}>
                                            <Grid container columnSpacing={'44px'} rowSpacing="30px">
                                                {services.map((service) => (
                                                    <Grid item sm={6} md={4} lg={3} key={service.id}>
                                                        <DServiceBox
                                                        small
                                                            service={service}
                                                            to={`/app/dashboard/services/${service.id}`}
                                                        />
                                                    </Grid>
                                                ))}

                                                {totalPage > 1 && (
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        mt="30px"
                                                        sx={{ display: 'flex', justifyContent: 'center' }}>
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
                    </Grid>
                </Grid>
            </DLoadingWrapper>
        </DashboardCard>
    );
};
const breadCrumbLinks = [{ path: '/app/dashboard/', title: 'پیشخوان' }, { title: 'خدمات رفاهی' }];

export default Services;
