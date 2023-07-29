import { Link, useSearchParams } from 'react-router-dom';
import { Box, Typography, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

// Components
import DBox from 'components/new/shared/DBox';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableCell from 'components/new/shared/DTable/DTableCell';

// Assets
import theme from 'assets/theme';
import { EmpSuccessPaymentCodes } from './EmpSuccessPaymentCodes';

const EmpSuccessPayment = ({ order }) => {
    let [searchParams] = useSearchParams();
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
            <Box sx={{ display: 'grid', width: '700px' }}> 
                <Box sx={{ mt: '30px' }}>
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

                <EmpSuccessPaymentCodes codes={order.codes} />

                <Box sx={{ pb: '50px', mt: '40px', display: "flex", justifyContent: "center" }}>
                    <Button
                        component={Link}
                        to="/app/dashboard/services/my/"
                        color="brandWarning"
                        variant="contained"
                        sx={{ fontSize: '14px' }}>
                        مشاهده خدمات رفاهی من
                    </Button>
                </Box>
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
