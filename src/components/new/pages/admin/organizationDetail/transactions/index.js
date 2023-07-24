import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, TableCell, TableHead, TableRow, TableBody, Button, Grid } from '@mui/material';

// Utils
import adminService from 'service/api/adminService';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import TransactionItem from './TransactionItem'; 

// Assets
import theme from 'assets/theme';

const tableColumns = [
    { title: 'نوع تراکنش' },
    { title: 'مبلغ (تومان)' },
    { title: 'دسته بندی' },
    { title: 'کارمند' },
    { title: 'شناسه پرداخت' },
    { title: 'وضعیت' },
    { title: 'تاریخ' },
    { title: 'زمان' },
];

const OrgTransactions = () => {
    const [loading, setLoading] = useState({
        initial: true,
        refresh: false,
    });
    const [filters, setFilters] = useState({ page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const { companyId } = useParams();

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };
    const getTransactions = async () => {
        const queryString = new URLSearchParams();
        queryString.append('company_id', companyId);
        queryString.append('page', filters.page);

        await adminService
            .getTransactionsData(queryString)
            .then((res) => {
                setTransactions(res.data.data);
                console.log(res.data.meta.last_page);
                setTotalPage(res.data.meta.last_page);
                setLoading({
                    initial: false,
                });
            })
            .catch((err) => {
                console.log('error occured!');
            });
    };
    useEffect(() => {
        getTransactions();
    }, [filters]);

    return (
        <Box
            minHeight="15rem"
            position="relative"
            className={loading.refresh && 'box--isLoading'}
            sx={{
                padding: '20px 40px 0 40px',
            }}>
            <DLoadingWrapper loading={loading.initial}>
                <>
                    <Grid container>
                        <Grid item xs={12} mt="10px">
                            <DTableWrapper>
                                <TableHead>
                                    <TableRow>
                                        {tableColumns.map((column, index) => {
                                            return (
                                                <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                                    {column.title}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.length > 0 ? (
                                        transactions.map((data, index) => (
                                            <TransactionItem
                                                transaction={data}
                                                key={data.id}
                                                style={{
                                                    backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <DTableEmpty />
                                    )}
                                </TableBody>
                            </DTableWrapper>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '30px',
                            }}>
                            {totalPage > 1 && <DPagination totalPages={totalPage} onPageChange={handlePageChange} />}
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '30px',
                            }}>
                            <Button sx={{ fontSize: '14px' }} variant="outlined" component={Link} to="/app/admin/companies/">
                                بازگشت به لیست سازمان‌ها
                            </Button>
                        </Grid>
                    </Grid>
                </>
            </DLoadingWrapper>
        </Box>
    );
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default OrgTransactions;
