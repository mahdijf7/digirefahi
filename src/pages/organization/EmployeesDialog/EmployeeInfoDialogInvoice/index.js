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
import EmployeeInfoDialogInvoiceItems from 'pages/organization/EmployeesDialog/EmployeeInfoDialogInvoice/EmployeeInfoDialogInvoiceItems';
import CustomInputSearch from 'components/Common/Form/CustomInputSearch';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import EmployeeInfoDialogInvoivceDetail from './EmployeeInfoDialogInvoiceDetail';

// Assets
import theme from 'assets/theme';

const EmployeeInfoDialogInvoice = ({ employeeId, open, handleOpen, handleClose }) => {
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({ page: 1, name: '' });
    const [totalPage, setTotalPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const [invoiceId, setInvoiceId] = useState(null);

    const { t } = useTranslation();

    const Initial_Values = {
        name: '',
    };
    const handleSubmit = async (values) => {
      
        const name = values.name;

        setFilters({ ...filters, name });
    };
    const onSelectDetail = (id) => {
 
        setInvoiceId(id);
        handleOpen();
    };

    const tableColumns = [
        { title: 'شماره فاکتور' },
        { title: 'عنوان خدمت' },
        { title: 'خریدار' },
        { title: 'سازمان' },
        { title: 'مبلغ (تومان)' },
        { title: 'تاریخ' },
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
    queryString.append('number', filters.name);
    queryString.append('employee_id', employeeId);

    const getTransactions = async (newpage = 1) => {
    
        setLoading({
            ...loading,
            refresh: true,
        });
        await organizationService
            .get(`orders?${queryString}`)
            .then((res) => {
         
                setLoading({
                    initial: false,
                    refresh: false,
                });

                setTransactions(res.data.data);
                setTotalPage(res.data.meta.last_page);
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
                                <CustomInputSearch
                                    sx={{ width: '100% !important' }}
                                    placeholder={'جستجوی فاکتورها'}
                                    name="name"
                                />
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
                                {transactions.length > 0 ? (
                                    transactions.map((trnsaction, index) => (
                                        <EmployeeInfoDialogInvoiceItems
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
                        <Box height="8rem" mt="2rem">
                            <DPagination totalPages={totalPage} onPageChange={handlePageChange} />
                        </Box>
                    </>
                </Box>
            </DLoadingWrapper>
            <EmployeeInfoDialogInvoivceDetail
                invoiceId={invoiceId}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
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

export default EmployeeInfoDialogInvoice;
