import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Box, Button, Icon, Grid, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { LoadingButton } from '@mui/lab';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import DServiceBox from 'components/new/shared/DServiceBox';
import DBox from 'components/new/shared/DBox';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import DSelect from 'components/new/shared/Form/DSelect';
import DPagination from 'components/new/shared/DPagination/Index';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';

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

const OrganizationServiceBasic = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState({ initial: true, filter: false, page: false });
    const [filters, setFilters] = useState({
        suppliers: modifyArraySearchParam(searchParams.getAll('suppliers')),
        provinces: modifyArraySearchParam(searchParams.getAll('provinces')),
        price: searchParams.get('price') ? prices.filter((item) => item.id === +searchParams.get('price'))[0] : '',
    });
    const [page, setPage] = useState(searchParams.get('page') ? +searchParams.get('page') : 1);
    const [totalPage, setTotalPage] = useState(1);
    const [services, setServices] = useState([]);

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
        apiParams.append('type', 'BASIC');
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

    return (
        <DashboardCard pt="2rem">
            <Breadcrumb links={breadCrumbLinks} />
            <DBox className={loading.page && 'box--isLoading'} sx={{ mt: '2rem' }}>
                <DLoadingWrapper loading={loading.initial} sx={{ p: '32px 0' }}>
                    <Grid item xs={12}>
                        <Formik initialValues={filters} onSubmit={filterHandler}>
                            {({ values, setFieldValue, resetForm, handleReset, handleSubmit }) => (
                                <Form>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Box></Box>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{
                                                borderBottom: '1px solid #EEEEEE',
                                                borderTop: '1px solid #EEEEEE',
                                                p: '20px 32px',
                                            }}>
                                            <Grid container columnSpacing={'20px'} rowSpacing="20px" justifyContent="flex-end">
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
                                                        apiPath={`company/suppliers`}
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
                                                    <DSelect
                                                        name="price"
                                                        formControlStyle={{ height: '42px' }}
                                                        placeholder="قیمت"
                                                        optionLabelKey="title"
                                                        defaultOptions={prices}
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
                                                <Grid item xs={3}>
                                                    <LoadingButton
                                                        disabled={loading.filter}
                                                        type="button"
                                                        variant="outlined"
                                                        fullWidth
                                                        size="large"
                                                        sx={{ fontSize: '14px', boxShadow: 'none' }}
                                                        startIcon={<DeleteOutlineIcon sx={{ margin: '0 0 0 1rem' }} />}
                                                        onClick={() => {
                                                      
                                                            resetForm({
                                                                values: {
                                                                    suppliers: [],
                                                                    provinces: [],
                                                                    price: '',
                                                                },
                                                            });
                                                            handleSubmit();
                                                        }}>
                                                        حذف فیلترها
                                                    </LoadingButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                    <Grid item xs={12} mt="30px" px="32px" pb="32px">
                        <Box sx={{ display: 'flex' }} className={loading.filter && 'box--isLoading'}>
                            <Grid container columnSpacing={'44px'} rowSpacing="30px">
                                {services && services.length === 0 && <Typography>سرویسی برای نمایش وجود ندارد.</Typography>}
                                {services.map((service) => (
                                    <Grid item md={3} xl={2.4} key={service.id}>
                                        <DServiceBox service={service} to={`/app/organization/services/${service.id}`} />
                                    </Grid>
                                ))}

                                {totalPage > 1 && (
                                    <Grid item xs={12} mt="30px" sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <DPagination current={page} totalPages={totalPage} onPageChange={handlePageChange} />
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                </DLoadingWrapper>
            </DBox>
        </DashboardCard>
    );
};
const breadCrumbLinks = [{ path: '/app/organization/dashboard/', title: 'پیشخوان' }, { title: 'خدمات عمومی' }];
export default OrganizationServiceBasic;
