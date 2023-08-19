import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, TableCell, TableHead, TableRow, TableBody, Button, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Form, Formik } from 'formik';

// Utils
import adminService from 'service/api/adminService';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DTableHeader from 'components/new/shared/DTable/DTableHeader';
import DPagination from 'components/new/shared/DPagination/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import CustomInputSearch from 'components/Common/Form/CustomInputSearch';
import EmployeeItem from './EmployeeItem'; 

// Assets
import theme from 'assets/theme';

const tableColumns = [{ title: 'نام کارمند' }, { title: 'کدملی' }, { title: 'شماره موبایل' }, { title: 'موقعیت سازمانی' }];

const Employees = () => {
    const [loading, setLoading] = useState({
        initial: true,
        refresh: false,
        search: false,
    });
    const [filters, setFilters] = useState({ page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [employees, setEmployees] = useState([]);
    const { companyId } = useParams();
    const { t } = useTranslation();

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
            search: false,
        });
        setFilters({ ...filters, page: newPage });
    };
    const getCompanyEmployees = async () => {
        const queryParams = new URLSearchParams();
        queryParams.append('company_id', companyId);
        queryParams.append('page', filters.page);
        if (filters.name) queryParams.append('name', filters.name);

        await adminService
            .getCompanyEmployees(queryParams)
            .then((res) => {
                setEmployees(res.data.data);
                setTotalPage(res.data.meta.last_page);
                setLoading({
                    initial: false,
                });
            })
            .catch((err) => {
       
            });
    };
    const searchEmployees = (values, actions) => {
        if (loading.search) return;
        setLoading({
            ...loading,
            search: true,
        });
        setFilters({ ...filters, name: values.name });
    };
    useEffect(() => {
        getCompanyEmployees();
    }, [filters]);

    const downloadExcelCompany = async () => {
        if (loading.excel) return;
        setLoading({ ...loading, excel: true });

        await adminService
            .employeesExport()
            .then((res) => {
                const link = document.createElement('a');
                link.href = `${process.env.REACT_APP_STORAGE_URL}/${res.data.data}`;
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((err) => {
   
            });

        setLoading({ ...loading, excel: false });
    };

    return (
        <Box
            className={(loading.refresh || loading.search) && 'box--isLoading'}
            sx={{
                padding: '20px 40px 0 40px',
            }}>
            <DLoadingWrapper loading={loading.initial}>
                <>
                    <Grid container>
                        <Grid item xs={12} mt="10px">
                            <DTableHeader>
                                <Box sx={{ display: 'flex', ml: 'auto' }}>
                                    <Formik initialValues={{ name: '' }} onSubmit={searchEmployees}>
                                        <Form>
                                            <CustomInputSearch
                                                placeholder={t('searchEmployee')}
                                                name="name"
                                                disabled={loading.search}
                                            />
                                        </Form>
                                    </Formik>
                                </Box>
                            </DTableHeader>
                        </Grid>
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
                                    {employees.length > 0 ? (
                                        employees.map((employee, index) => (
                                            <EmployeeItem
                                                employee={employee}
                                                key={employee.id}
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
                            xs={6}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                marginTop: '10px',
                            }}>
                            <Box sx={{ displat: 'flex', alignItems: 'center', mt: '20px' }}>
                                <LoadingButton
                                    variant="outlined"
                                    loading={loading.excel}
                                    sx={{ fontSize: '14px' }}
                                    onClick={downloadExcelCompany}>
                                    خروجی اکسل
                                </LoadingButton>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={6}
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
export default Employees;
