import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

// Utils
import organizationService from 'service/api/organization.service';
import ChartContext, { ChartContextProvider } from 'components/new/pages/organization/chart/chart-context';

// Components
import DBox from 'components/new/shared/DBox';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import OrgTree from 'components/new/pages/organization/chart/tree/OrgTree';
import OrgChartEmployees from 'components/new/pages/organization/chart/orgChartEmployees';

const Chart = ({}) => {
    const [loading, setLoading] = useState({
        initial: true,
    });
    const [chart, setChart] = useState(null);
    const { selectedNode } = useContext(ChartContext);

    const getChart = async () => {
        await organizationService
            .get('charts')
            .then((res) => {
                setChart({ children_all: res.data.data.charts, name: res.data.data.company.name });
                setLoading({
                    initial: false,
                });
            })
            .catch((err) => {
                console.log('error occured!');
            });
    };
    useEffect(() => {
        getChart();
    }, []);
    useEffect(() => {
     
    }, [selectedNode]);

    return (
        <DashboardCard pt="24px">
            <Breadcrumb links={breadCrumbLinks} />

            <DLoadingWrapper loading={loading.initial}>
                <ChartContextProvider>
                    {chart && (
                        <>
                            <DBox sx={{ mt: '24px' }}>
                                <Box
                                    sx={{
                                        borderBottom: '1px solid #EEEEEE',
                                        p: '16px 30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>چارت سازمانی</Typography>
                                    <Typography color="#004D88" sx={{ fontWeight: 600, fontSize: '16px' }}>
                                        &nbsp;{chart.name}{' '}
                                    </Typography>
                                    <Typography color="#004D88" sx={{ fontWeight: 600, fontSize: '13px' }}>
                                        &nbsp;/ {chart.children_all.length} زیرمجموعه
                                    </Typography>
                                </Box>
                                <OrgTree key={chart.id} root={chart} />
                            </DBox>
                            <OrgChartEmployees />
                        </>
                    )}
                </ChartContextProvider>
            </DLoadingWrapper>
        </DashboardCard>
    );
};
const breadCrumbLinks = [
    { path: '/app/organization/dashboard/', title: 'پیشخوان' },
    {
        path: '/app/organization/manage/chart/',
        title: 'مدیریت سازمان ',
    },
    { title: 'مدیریت چارت سازمانی' },
];
export default Chart;
