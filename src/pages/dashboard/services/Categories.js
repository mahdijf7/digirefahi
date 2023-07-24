import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import { DItem } from 'components/new/shared/DItem';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import { DEmployeeCreditChart } from 'components/new/shared/DEmployeeCreditChart';
import DBox from 'components/new/shared/DBox';

const ServicesCategories = () => {
    const [loading, setLoading] = useState({ initial: true });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await dashboardService
                .get(`categories`, { signal })
                .then((res) => {
                    setCategories(res.data.data);
                })
                .catch((err) => {
                    console.log(5555555);
                });

            setLoading({
                initial: false,
            });
        })();

        return () => controller.abort();
    }, []);

    return (
        <DashboardCard pt="30px">
            <DLoadingWrapper loading={loading.initial} sx={{ p: '32px 0' }}>
                <Breadcrumb links={breadCrumbLinks} />

                <Grid container spacing="20px" mt="4px">
                    <Grid item xs={12} lg={3}>
                        <DEmployeeCreditChart />
                    </Grid>
                    <Grid item xs={12} lg={9}>
                        <DBox sx={{ padding: '24px 30px' }}>
                            <Grid item xs={12}>
                                <Grid container columnSpacing={'44px'} rowSpacing="30px">
                                    {categories && categories.length === 0 && (
                                        <Typography>سرویسی برای نمایش وجود ندارد.</Typography>
                                    )}
                                    {categories.map((category) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                                            <DItem
                                                name={category.name}
                                                image={category.thumbnail}
                                                to={`/app/dashboard/services?categories=${category.id},${category.name}`}
                                            />
                                        </Grid>
                                    ))}
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
    { title: 'خدمات رفاهی بر اساس دسته بندی' },
];

export default ServicesCategories;
