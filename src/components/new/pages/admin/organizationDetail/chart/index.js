import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

// Utils
import adminService from 'service/api/adminService';
import { ChartContextProvider } from './chart-context';

// Components
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import Tree from './tree';
import Employees from './employees';

const Chart = ({}) => {
    const [loading, setLoading] = useState({
        initial: true,
    });
    const [chart, setChart] = useState({});
    const { companyId } = useParams();

    const getChart = async () => {
        const queryParams = new URLSearchParams();
        queryParams.append('company_id', companyId);

        await adminService
            .getChart(queryParams)
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

    return (
        <Box
            sx={{
                padding: '20px 40px 0 40px',
            }}>
            <DLoadingWrapper loading={loading.initial}>
                <ChartContextProvider>
                    <Tree key={chart.id} root={chart} />
                    <Employees />
                    <Box className="flex" justifyContent="flex-end" mt="20px">
                        <Button sx={{ fontSize: '14px' }} variant="outlined" component={Link} to="/app/admin/companies/">
                            بازگشت به لیست سازمان‌ها
                        </Button>
                    </Box>
                </ChartContextProvider>
            </DLoadingWrapper>
        </Box>
    );
};

export default Chart;
