import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, TableCell, TableHead, TableRow, TableBody, Button, InputAdornment, Grid, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';

// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import DBox from 'components/new/shared/DBox';
import DSnackbar from 'components/new/shared/DSnackbar';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import OrgAddEmployeeDialog from 'components/new/pages/organization/employees/OrgAddEmployeeDialog';
import OrgEmployeesListItem from 'components/new/pages/organization/employees/OrgEmployeesListItem';
import DPagination from 'components/new/shared/DPagination/Index';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import EmployeeDialogInfo from './EmployeesDialog/EmployeeDialogInfo';
import EmployeeAddGroupDialog from 'components/Common/EmployeeAddGroupDialog/EmployeeAddGroupDialog';

// Assets
import theme from '../../assets/theme';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const tableColumns = [
    { title: 'نام کارمند' },
    { title: 'کدملی' },
    { title: 'شماره موبایل' },
    { title: 'نام گروه' },
    { title: 'موقعیت سازمانی' },
    { title: '' },
];

const Employees = () => {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [loading, setLoading] = useState({ initial: true, refresh: false, excel: false });
    const [filters, setFilters] = useState({ page: searchParams.get('page') || 1, name: searchParams.get('name') || '' });
    const [totalPage, setTotalPage] = useState(1);
    const [addEmployeeDialogIsOpen, setAddEmployeeDialogIsOpen] = useState(false);
    const [showEmployeeInfoDialogIsOpen, setShowEmployeeInfoDialogIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(false);
    const [addGroupOpen, setAddGroupOpen] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const toggleAddGroupDialog = () => {
        setAddGroupOpen(!addGroupOpen);
    };
    const openAddEmployeeDialog = () => {
        setAddEmployeeDialogIsOpen(true);
    };
    const closeAddEmployeeDialog = () => {
        setAddEmployeeDialogIsOpen(false);
    };
    const showEmployeeInfo = (employee) => {
        setSelectedEmployee(employee);
        setShowEmployeeInfoDialogIsOpen(true);
    
    };
    const closeShowEmployeeInfoDialog = () => {
        setShowEmployeeInfoDialogIsOpen(false);
        setSelectedEmployee(false);
    };
    const employeeCreatedHandler = (message) => {
        closeAddEmployeeDialog();
        setSnackBarData({
            show: true,
            data: {
                text: message,
                type: 'success',
            },
        });
        handlePageChange(1);
    };
    const employeeInfoUpdated = (message) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });

        setSnackBarData({
            show: true,
            data: {
                text: message,
                type: 'success',
            },
        });
        setShowEmployeeInfoDialogIsOpen(false);

        setFilters({ ...filters });
    };
    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };
    const filterHandler = (values) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, name: values.name, page: 1 });
    };
    const updateList = () => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters });
    };
    const downloadExcel = async () => {
        if (loading.excel) return;
        setLoading({ ...loading, excel: true });

        await OrganizationService
            .get(`employees-export`)
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


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            const params = new URLSearchParams();
            params.append('page', filters.page); 
            filters.name && params.append(`name`, filters.name);

            navigate({
                pathname: location.pathname,
                search: `?${params.toString()}`,
            });

            await OrganizationService.employees(params.toString(), { signal })
                .then((res) => {
                    setEmployees(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                })
                .catch((err) => {});

            setLoading({
                ...loading,
                initial: false,
                refresh: false,
            });
        })();
        return () => controller.abort();
    }, [filters]);

    return (
        <DashboardCard pt="2rem" sx={styleCard} meta={{ title: 'مدیریت کارمندان' }}>
            <Breadcrumb links={breadCrumbLinks} />
            <DBox className={loading.refresh && 'box--isLoading'} sx={{ mt: '2rem', p: '26px 29px' }}>
                <DLoadingWrapper loading={loading.initial}>
                    <Grid container spacing={'2rem'}>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Formik enableReinitialize={true} initialValues={filters} onSubmit={filterHandler}>
                                    {({ values, setFieldValue, resetForm, handleReset, handleSubmit }) => (
                                        <Form>
                                            <CustomInputBase
                                                name="name"
                                                placeholder={t('searchEmployee')}
                                                wrapperSx={{ width: '400px' }}
                                                inputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <SearchIcon sx={{ fontSize: '20px' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Form>
                                    )}
                                </Formik>
                                <Stack useFlexGap spacing="20px" direction="row">
                                    <Button
                                        variant="contained"
                                        color="brandWarning"
                                        sx={{ fontSize: '14px', height: '4rem' }}
                                        startIcon={<PersonAddAltIcon fontSize="large" sx={{ margin: '0 0 0 1rem' }} />}
                                        onClick={openAddEmployeeDialog}>
                                        افزودن کارمند
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{ fontSize: '14px', height: '4rem' }}
                                        startIcon={<GroupAddIcon fontSize="large" sx={{ margin: '0 0 0 1rem' }} />}
                                        onClick={toggleAddGroupDialog}>
                                        افزودن گروهی کارمندان
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <DTableWrapper loading={loading}>
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
                                            <OrgEmployeesListItem
                                                onShowEmployeeInfo={showEmployeeInfo}
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
                        <Grid item xs={12} mt="20px" sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <LoadingButton
                                variant="outlined"
                                loading={loading.excel}
                                sx={{ fontSize: '14px' }}
                                onClick={downloadExcel}>
                                خروجی اکسل
                            </LoadingButton>

                            {totalPage > 1 && (
                                <DPagination
                                    current={filters.page}
                                    sx={{ marginRight: 'auto' }}
                                    totalPages={totalPage}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </Grid> 
                    </Grid>
                </DLoadingWrapper>
            </DBox>

            {showEmployeeInfoDialogIsOpen && (
                <EmployeeDialogInfo
                    getEmployees={updateList}
                    title={selectedEmployee?.full_name}
                    employeeId={selectedEmployee.id}
                    onClose={() => closeShowEmployeeInfoDialog()}
                    onSave={employeeInfoUpdated}
                />
            )}

            {addEmployeeDialogIsOpen && <OrgAddEmployeeDialog onClose={closeAddEmployeeDialog} onSave={employeeCreatedHandler} />}

            <DDialogWrapper size="xs" open={addGroupOpen} onClose={toggleAddGroupDialog} title="افزودن گروهی کارمندان">
                <EmployeeAddGroupDialog
                    noCompany
                    api={'employees-import'}
                    apiService={OrganizationService}
                    getEmployees={updateList}
                    onClose={toggleAddGroupDialog}
                />
            </DDialogWrapper>

            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DashboardCard>
    );
};
 
const styleCard = {
    '& button': {
        boxShadow: 'none !important',
        '@media (max-width: 1250px)': {
            fontSize: '1rem  !important',
        },
    },
};
const breadCrumbLinks = [
    { path: '/app/organization/dashboard/', title: 'پیشخوان' },
    {
        path: '/app/organization/manage/employees/',
        title: 'مدیریت سازمان ',
    },
    { title: 'مدیریت کارمندان' },
];
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default Employees;
