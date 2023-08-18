import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, TableCell, TableHead, TableRow, TableBody, CircularProgress, Grid, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';

// Utils
import adminService from 'service/api/adminService';
import { getErrorForSnackbar } from 'utils/helpers';

// Components
import DSnackbar from 'components/new/shared/DSnackbar';
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import EmployeeItem from './EmployeeItem';

// Assets
import theme from 'assets/theme';

const loadingComponent = (
    <Box display="flex" justifyContent="center" pt="32px">
        <CircularProgress />
    </Box>
);
const tableColumns = [
    { title: '', style: { width: '36px' } },
    { title: 'نام کارمند' },
    { title: 'کدملی' },
    { title: 'شماره موبایل' },
    { title: 'موقعیت سازمانی' },
];

const AddGroupDialog = ({ onClose, onSave }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const { t } = useTranslation();
    const { companyId } = useParams();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const handlePageChange = (newPage) => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        setPage(newPage);
    };
    const checkBoxToggled = (event) => {
        setSelectedEmployees({
            ...selectedEmployees,
            [event.target.name]: event.target.checked,
        });
    };
    const addGroup = async (values) => {
        if (isSaving) return;
        setIsSaving(true);

        const queryString = new URLSearchParams();
        queryString.append('company_id', companyId);
        if (values.name) queryString.append('name', values.name);
        let filteredEmployeesIndex = 0;
        Object.keys(selectedEmployees).forEach((employeeId) => {
            if (selectedEmployees[employeeId]) {
                queryString.append(`employee_ides[${filteredEmployeesIndex}]`, employeeId);
                filteredEmployeesIndex++;
            }
        });
        await adminService
            .saveGroup(queryString.toString())
            .then((res) => {
                onSave();
            })
            .catch((err) => {
          
                const errorMsg = err?.response?.data?.message;
                errorMsg &&
                    setSnackBarData({
                        show: true,
                        data: {
                            text: errorMsg,
                            type: 'error',
                        },
                    });
            });

        setIsSaving(false);
    };
    const getEmployees = async () => {
        await adminService
            .getEmployees(page)
            .then((res) => {
                setEmployees(res.data.data);
                setTotalPage(res.data.meta.last_page);
                setIsLoading(false);
                setIsRefreshing(false);
            })
            .catch((err) => {
         
            });
    };
    useEffect(() => {
        getEmployees();
    }, [page]);

    return (
        <DDialogWrapper open onClose={onClose}>
            {isLoading ? (
                loadingComponent
            ) : (
                <>
                    <DDialogHeader title="افزودن گروه" onClose={onClose} />
                    <Box
                        display="grid"
                        mt="24px"
                        sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)', padding: '18px 40px 0px 40px' }}
                        className={isRefreshing && 'box--isLoading'}>
                        <Formik initialValues={{}} onSubmit={addGroup}>
                            <Form>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <CustomInputBase
                                            height="4.2rem"
                                            borderRadius=".8rem"
                                            sx={inputStyle}
                                            showlabel="true"
                                            name="name"
                                            title={t('employees.firstName')}
                                            placeholder={t('admin.enterGroupNamePlaceholder')}
                                            weight
                                        />
                                    </Grid>
                                    <Grid item xs={12} mt="30px">
                                        <DTableWrapper loading={isLoading} mt="30px">
                                            <TableHead>
                                                <TableRow>
                                                    {tableColumns.map((column, index) => {
                                                        return (
                                                            <TableCell
                                                                style={{ ...tableHeadStyle, ...column.style }}
                                                                key={`table-column-${index}`}>
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
                                                            selected={selectedEmployees[employee.id]}
                                                            style={{
                                                                backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                            }}
                                                            onCheckBoxToggled={checkBoxToggled}
                                                        />
                                                    ))
                                                ) : (
                                                    <DTableEmpty />
                                                )}
                                            </TableBody>
                                        </DTableWrapper>
                                    </Grid>
                                    <Grid item xs={12} mt="15px" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {totalPage > 1 && (
                                            <DPagination
                                                totalPages={totalPage}
                                                onPageChange={handlePageChange}
                                                sx={{ margin: 0 }}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={12} mt="22px">
                                        <LoadingButton
                                            loading={isSaving}
                                            variant="contained"
                                            type="submit"
                                            sx={{ fontSize: '14px', boxShadow: 'none' }}>
                                            به روز رسانی
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Formik>
                    </Box>
                    <DSnackbar
                        open={snackBarData.show}
                        info={snackBarData.data}
                        onClose={() => setSnackBarData({ ...snackBarData, show: false })}
                    />
                </>
            )}
        </DDialogWrapper>
    );
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const inputStyle = {
    backgroundColor: theme.main.palette.info.input,
    borderRadius: '.8rem !important',
    '& .MuiOutlinedInput-root': {
        height: '4.2rem !impoertant',
        color: ` ${theme.main.palette.common.black}`,
        '& fieldset': {
            border: `.1rem solid ${theme.main.palette.info.border} `,
        },
    },
    '&.MuiAutocomplete-root .MuiOutlinedInput-root': {
        paddingRight: '7%',
        height: '4.3rem',
        borderRadius: '.8rem !important',
    },
    '& .MuiAutocomplete-endAdornment': {
        right: '90% !important',
        '& svg': {
            width: '3rem',
            height: '3rem',
        },
    },
};
export default AddGroupDialog;
