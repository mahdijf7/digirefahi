import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Box, Typography, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import DBox from 'components/new/shared/DBox';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableCell from 'components/new/shared/DTable/DTableCell';

// Assets
import theme from 'assets/theme';

const EmpSuccessPayment = ({order}) => {
    let [searchParams] = useSearchParams();
    const [loading, setLoading] = useState({ initial: true }); 
    const [breadCrumbLinks, setBreadCrumbLinks] = useState([
        { path: '/dashboard', title: 'پیشخوان' },
        { path: '/dashboard/services/', title: 'خدمات رفاهی' },
    ]);
    let provinceLabel = '';
    if (order?.service?.province.length > 1) {
        provinceLabel = `${order.service.province[0]} و ${order.service.province.length - 1} استان دیگر`;
    } else if (order?.service?.province.length === 1) {
        provinceLabel = `${order.service.province[0]}`;
    }

  

    return (
        <DBox sx={{ overflow: 'hidden', alignItems: 'center', mt: '32px' }}>
            <Box
                bgcolor="primary.main"
                p="0 40px"
                sx={{
                    width: '100%',
                    height: '68px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Typography color="common.white" fontSize="22px">
                    پرداخت موفق
                </Typography>
            </Box>
            <Box sx={{ p: '40px 0', width: '700px' }}>
                <DTableWrapper>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                    {column.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <DTableCell>{order.service.name}</DTableCell>
                            <DTableCell>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        justifyContent: 'center',
                                    }}>
                                    <Typography fontSize="16px" fontWeight={600}>
                                        {order.price.toLocaleString()}
                                    </Typography>
                                    <Typography fontSize="14px">تومان</Typography>
                                </Box>
                            </DTableCell>
                            <DTableCell>{order.service.supplier}</DTableCell>
                            <DTableCell>{provinceLabel}</DTableCell>
                            <DTableCell>
                                {order.created_at ? new Date(order.created_at).toLocaleDateString('fa-IR') : '---'}
                            </DTableCell>
                        </TableRow>
                    </TableBody>
                </DTableWrapper>
            </Box>

            <Box sx={{ pb: '50px' }}>
                <Button
                    component={Link}
                    to="/app/dashboard/services/my/"
                    color="brandWarning"
                    variant="contained"
                    sx={{ fontSize: '14px' }}>
                    مشاهده خدمات رفاهی من
                </Button>
            </Box>
        </DBox>
    );
};
const columns = [
    { title: 'خدمت' },
    { title: 'مبلغ کل' },
    { title: 'تامین کننده' },
    { title: 'استان خدمت' },
    { title: 'تاریخ صدور' },
];
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.2rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default EmpSuccessPayment;
