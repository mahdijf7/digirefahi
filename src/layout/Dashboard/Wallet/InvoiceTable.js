import { useState, useEffect } from 'react';
import { TableCell, TableHead, TableRow, TableBody, Box } from '@mui/material';

// Utils
import userService from 'service/api/userService';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import InvoiceTableDetail from './InvoiceTableDetail';

// Assets
import theme from 'assets/theme';
import InvoiceTableDetailDialog from './InvoiceTableDetailDialog';

const InvoiceTable = () => {
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({ page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const [invoiceId, setInvoiceId] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSelectDetail = (id) => {
        console.log(id, 'GETTING THE ID');
        setInvoiceId(id);
        handleOpen();
    };

    const tableColumns = [
        { title: 'شماره فاکتور' },
        { title: 'عنوان' },
        { title: 'مبلغ (تومان)' },
        { title: 'تاریخ صدور' },
        { title: 'زمان' },
        { title: 'جزییات' },
    ];

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };
    const queryString = new URLSearchParams();
    queryString.append('page', filters.page);

    const getInvoice = async (newpage = 1) => {
        console.log('run getting the data');
        setLoading({
            ...loading,
            refresh: true,
        });
        await userService
            .get(`/employee/orders?${queryString}`)
            .then((res) => {
                console.log(res.data.data);
                setLoading({
                    initial: false,
                    refresh: false,
                });

                setTransactions(res.data.data);
                setTotalPage(res.data.meta.last_page);
            })
            .catch((err) => {
                console.log(err, 'ERROR FROM TABEL TRANSACTION');
                setLoading({
                    initial: false,
                    refresh: false,
                });
            });
    };

    useEffect(() => {
        getInvoice();
    }, [filters]);

    return (
        <Box>
            <DLoadingWrapper loading={loading.initial}>
                <Box sx={wrapperStyles} className={loading.refresh && 'box--isLoading'}>
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
                                transactions.map((trnsaction, index) => (
                                    <InvoiceTableDetail
                                        onSelectDetail={onSelectDetail}
                                        open={open}
                                        handleOpen={handleOpen}
                                        handleClose={handleClose}
                                        trnsaction={trnsaction}
                                        key={trnsaction.id}
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
                    {totalPage > 1 && (
                        <Box height="8rem" mt="2rem">
                            <DPagination totalPages={totalPage} onPageChange={handlePageChange} />
                        </Box>
                    )}
                </Box>
            </DLoadingWrapper>
            <InvoiceTableDetailDialog invoiceId={invoiceId} open={open} handleOpen={handleOpen} handleClose={handleClose} />
        </Box>
    );
};

const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    padding: '0 30px',
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default InvoiceTable;
