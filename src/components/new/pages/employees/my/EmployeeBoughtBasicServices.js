import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import DServiceBox from 'components/new/shared/DServiceBox';
import DPagination from 'components/new/shared/DPagination/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DBox from 'components/new/shared/DBox';

const EmployeeBoughtBasicServices = () => {
    const [loading, setLoading] = useState({ initial: true, page: false });
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [services, setServices] = useState(false);

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
        apiParams.append('page', page);
        apiParams.append('per_page', 8);
        apiParams.append('type', 'BASIC');

        (async () => {
            await dashboardService
                .get(`my-services?${apiParams.toString()}`)
                .then((res) => {
                    setServices(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                })
                .catch((err) => {
                    console.log(5555555);
                });

            setLoading({
                ...loading,
                initial: false,
                page: false,
            });
        })();
    }, [page]);

    return (
        <Grid item xs={12}>
            <DBox sx={{ padding: '20px 30px' }}>
                <DLoadingWrapper loading={loading.initial}>
                    {services && (
                        <>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '20px' }}> خدمات عمومی خریداری‌شده </Typography>
                            </Grid>
                            <Grid item xs={12} mt="14px">
                                <Grid container columnSpacing={'44px'} rowSpacing="30px">
                                    {services && services.length === 0 && (
                                        <Grid item md={12}>
                                            <Typography>سرویسی برای نمایش وجود ندارد.</Typography>
                                        </Grid>
                                    )}
                                    {services.map((order) => (
                                        <Grid item md={3} key={order.id}>
                                            <DServiceBox
                                                small
                                                service={order.service}
                                                to={`/app/dashboard/services/${order.service.id}?order_id=${order.id}`}
                                            />
                                        </Grid>
                                    ))}

                                    {totalPage > 1 && (
                                        <Grid item xs={12} mt="30px" sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <DPagination current={page} totalPages={totalPage} onPageChange={handlePageChange} />
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </>
                    )}
                </DLoadingWrapper>
            </DBox>
        </Grid>
    );
};

export { EmployeeBoughtBasicServices };
