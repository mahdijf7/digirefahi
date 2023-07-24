import { useState, useEffect } from 'react';
import { TableCell, TableHead, TableRow, TableBody, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Utils
import organizationService from 'service/api/organization.service';
// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import EmployeeInfoDialogTransactionsItem from 'pages/organization/EmployeesDialog/EmployeeDialogTransactions/EmployeeInfoDialogTransactionsItem';
import CustomInputSearch from 'components/Common/Form/CustomInputSearch';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';

// Assets
import theme from 'assets/theme';
 
const EmployeeInfoDialogTransactions = ({ employeeId }) => {
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({ page: 1, name: '' });
    const [totalPage, setTotalPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const { t } = useTranslation();

    const Initial_Values = {
        name: '',
    };
    const handleSubmit = async (values) => {
    
        const name = values.name;

        setFilters({ ...filters, name });
    };

    const tableColumns = [
        { title: 'نوع تراکنش' },
        { title: 'مبلغ' },
        { title: 'دسته بندی' },
        { title: 'اعتبار مانده' },
        { title: 'شناسه پرداخت' },
        { title: 'وضعیت' },
        { title: 'تاریخ' },
        { title: 'زمان' },
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
    queryString.append('transaction_id', filters.name);
    queryString.append('employee_id', employeeId);

    const getTransactions = async () => {
        setLoading({
            ...loading,
            refresh: true,
        });
        await organizationService
            .get(`transactions?${queryString}`)
            .then((res) => {
                setTransactions(res?.data?.data);
                setTotalPage(res.data.meta.last_page);
                setLoading({
                    initial: false,
                    refresh: false,
                });
            })
            .catch((err) => {
                setLoading({
                    initial: false,
                    refresh: false,
                });
            });
    };
    useEffect(() => {
        getTransactions();
    }, [filters]);

    return (
        <Box sx={{mt: '30px'}}>
            <DLoadingWrapper loading={loading.initial}>
                <Box sx={wrapperStyles} className={loading.refresh && 'box--isLoading'}>
                    <Formik initialValues={Initial_Values} onSubmit={handleSubmit}>
                        <Form>
                            <Box width="31%" mb="1.3rem">
                                <CustomInputSearch sx={{ width: '100% !important' }} placeholder={'جستجوی تراکنش'} name="name" />
                            </Box>
                        </Form>
                    </Formik>
                    <>
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
                                {transactions && transactions.length > 0 ? (
                                    transactions.map((trnsaction, index) => (
                                        <EmployeeInfoDialogTransactionsItem
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
                        <Box height="8rem" mt="2rem">
                            <DPagination totalPages={totalPage} onPageChange={handlePageChange} />
                        </Box>
                    </>
                </Box>
            </DLoadingWrapper>
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
 
export default EmployeeInfoDialogTransactions;
