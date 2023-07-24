import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

// Components
import DBox from 'components/new/shared/DBox';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DashboardCard from 'components/Common/Card/DashboardCard';
import ServiceListTable from 'components/Table/Admin/ServiceList/ServiceListTable';
import adminService from 'service/api/adminService';
import DPagination from 'components/new/shared/DPagination/Index';
import ServiceAdminFilter from 'components/Common/Filter/ServiceAdminFilter';

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
function ServiceList(props) {
    const [open, setOpen] = useState(false);
    const [serviceList, setServiceList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    let [searchParams, setSearchParams] = useSearchParams();

    const [loading, setLoading] = useState({ initial: true, filter: false, page: false });
    const [filters, setFilters] = useState({
        category: modifyArraySearchParam(searchParams.getAll('category')),
        suppliers: modifyArraySearchParam(searchParams.getAll('suppliers')),
        provinces: modifyArraySearchParam(searchParams.getAll('provinces')),
        ticket_type: modifyArraySearchParam(searchParams.getAll('ticket_type_ides')),
        name: searchParams.getAll('name') || '',
        type:
            modifyArraySearchParam(searchParams.getAll('type')).length > 0
                ? modifyArraySearchParam(searchParams.getAll('type'))[0]
                : '',
        // price: searchParams.get('price') ? prices.filter((item) => item.id === +searchParams.get('price'))[0] : '',
    });
    console.log(filters, 'GETTING FILTER DATA');
    const [page, setPage] = useState(searchParams.get('page') ? +searchParams.get('page') : 1);
    const [totalPage, setTotalPage] = useState(1);
    const apiParams = new URLSearchParams();
    const routeParams = new URLSearchParams();

    const filterHandler = (values) => {
        console.log(values);
        if (loading.filter) return;
        setLoading({ ...loading, filter: true });
        setPage(1);
        setFilters({
            ...filters,
            suppliers: values.suppliers,
            provinces: values.provinces,
            category: values.category,
            name: values.name,
            type: values.type,
            ticket_type_ides: values.ticket_type_ides,
        });
    };

    useEffect(() => {
        if (filters.category && filters.category.length > 0) {
            filters.category.forEach((item, index) => {
                apiParams.append(`category[${index}]`, item.id);
                routeParams.append(`category`, `${item.id},${item.name}`);
            });
        }
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
        if (filters.ticket_type_ides && filters.ticket_type_ides.length > 0) {
            filters.ticket_type_ides.forEach((item, index) => {
                apiParams.append(`ticket_type_ides[${index}]`, item.id);
                routeParams.append(`ticket_type_ides`, `${item.id},${item.name}`);
            });
        }

        if (filters.name && filters.name.length > 0) {
            apiParams.append('name', filters.name);
            routeParams.append(`name`, filters.name);
        }

        if (filters.type) {
            apiParams.append(`type`, filters.type.id);
            routeParams.append(`type`, `${filters.type.id},${filters.type.name}`);
        }

        apiParams.append('page', page);
        apiParams.append('per_page', 10);
        routeParams.append(`page`, page);

        console.log(filters.type);

        navigate({
            pathname: location.pathname,
            search: `?${routeParams.toString()}`,
        });

        getServiceList();
    }, [filters, page]);

    const getServiceList = async () => {
        setLoading({
            ...loading,
            refresh: true,
        });
        try {
            const res = await adminService.getServices(apiParams.toString());
            setServiceList(res.data);
            setTotalPage(res.data.meta.last_page);
            console.log();
            setLoading({
                initial: false,
                refresh: false,
            });
        } catch (err) {
            setLoading({
                initial: false,
                refresh: false,
            });
        }
    };

    const handlePageChange = (newPage) => {
        if (loading.page) return;
        setLoading({
            ...loading,
            page: true,
        });
        setPage(newPage);
    };

    return (
        <DashboardCard pt="22px">
            <Breadcrumb links={breadCrumbLinks} />

            <DBox sx={{ p: '24px 30px', mt: '22px' }}>
                <DLoadingWrapper loading={!serviceList.data && loading.initial}>
                    <ServiceAdminFilter filters={filters} filterHandler={filterHandler} />
                    {serviceList?.data && (
                        <ServiceListTable
                            getServiceList={getServiceList}
                            loading={loading}
                            setLoading={setLoading}
                            open={open}
                            setOpen={setOpen}
                            content={serviceList.data}
                            page={filters?.page}
                        />
                    )}
                    <Grid item xs={12} mt="30px" sx={{ display: 'flex', justifyContent: 'center' }}>
                        <DPagination current={page} totalPages={totalPage} onPageChange={handlePageChange} />
                    </Grid>
                </DLoadingWrapper>
            </DBox>
        </DashboardCard>
    );
}

const breadCrumbLinks = [
    { path: '/app/admin/', title: 'پیشخوان' },
    { path: '/app/admin/service-management/service-list/', title: 'مدیریت خدمات' },
    { title: 'لیست خدمات رفاهی' },
];
export default ServiceList;
