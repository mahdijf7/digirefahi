import { useState, useEffect } from 'react';
import { Box, TableCell, TableHead, TableRow, TableBody, CircularProgress, Grid, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';

// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import OrgCreateGroupEmployeeItem from './OrgCreateGroupEmployeeItem';

// Assets
import theme from 'assets/theme';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';

const tableColumns = [
    { title: '', style: { width: '36px' } },
    { title: 'نام کارمند' },
    { title: 'کدملی' },
    { title: 'شماره موبایل' },
    { title: 'موقعیت سازمانی' },
];

const OrgCreateGroup = ({ onClose, onCreate }) => {
    const [loading, setLoading] = useState({ initial: true, save: false });
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const { t } = useTranslation();

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
    const create = async (values, actions) => {
        if (loading.save) return;
        setLoading({ ...loading, save: true });

        const params = new URLSearchParams();
        if (values.name) params.append('name', values.name);
        let filteredEmployeesIndex = 0;
        Object.keys(selectedEmployees).forEach((employeeId) => {
            if (selectedEmployees[employeeId]) {
                params.append(`employee_ides[${filteredEmployeesIndex}]`, employeeId);
                filteredEmployeesIndex++;
            }
        });
        await OrganizationService.create(`groups?${params.toString()}`)
            .then((res) => { 
                onCreate();
            })
            .catch((err) => {
                console.log(err,987);
                if (err?.response.status === 422) actions.setErrors(err.response.data.data);
            });

        setLoading({ ...loading, save: false });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            const params = new URLSearchParams();
            params.append('page', page);

            await OrganizationService.get(`employees?${params.toString()}`, { signal })
                .then((res) => {
                    setEmployees(res.data.data);
                    setTotalPage(res.data.meta.last_page);

                    setIsRefreshing(false);
                })
                .catch((err) => {
                    console.log('error occured!');
                });

            setLoading({ ...loading, initial: false });
        })();

        return () => controller.abort();
    }, [page]);

    return (
        <DDialogWrapper open onClose={onClose}>
            <DLoadingWrapper loading={loading.initial}>
                <>
                    <DDialogHeader title="افزودن گروه" onClose={onClose} />
                    <Box
                        display="grid"
                        mt="24px"
                        sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)', padding: '18px 40px 0px 40px' }}
                        className={isRefreshing && 'box--isLoading'}>
                        <Formik initialValues={{name: ''}} onSubmit={create}>
                            <Form>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <CustomInputBase
                                            showlabel="true"
                                            name="name"
                                            title={t('groupName')}
                                            placeholder={t('admin.enterGroupNamePlaceholder')}
                                            weight
                                            hasDefaultStyle
                                        />
                                    </Grid>
                                    <Grid item xs={12} mt="30px">
                                        <DTableWrapper mt="30px">
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
                                                        <OrgCreateGroupEmployeeItem
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
                                            loading={loading.save}
                                            variant="contained"
                                            type="submit"
                                            sx={{ fontSize: '14px', boxShadow: 'none' }}>
                                            {t('createGroup')}
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Formik>
                    </Box>
                </>
            </DLoadingWrapper>
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

export default OrgCreateGroup;
