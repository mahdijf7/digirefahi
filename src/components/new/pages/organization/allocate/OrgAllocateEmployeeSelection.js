import { useEffect, useRef, useState } from 'react';
import {
    Grid,
    Box,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Button,
    Radio,
    FormControlLabel,
    RadioGroup,
    Typography,
    Link,
    Checkbox,
} from '@mui/material';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { Form, Formik, FieldArray } from 'formik';

// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import DSnackbar from 'components/new/shared/DSnackbar';
import DBox from 'components/new/shared/DBox';
import DSelect from 'components/new/shared/Form/DSelect';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import OrgAllocateEmployeeItem from 'components/new/pages/organization/allocate/OrgAllocateEmployeeItem';

// Assets
import theme from 'assets/theme';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';

const OrgAllocateEmployeeSelection = ({ onEmployeeToggled }) => {
    const [loading, setLoading] = useState({ initial: true, filter: false, page: false, upload: false });
    const [totalPage, setTotalPage] = useState(1);
    const [employees, setEmployees] = useState([]);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [formikApis, setFormikApis] = useState(null);
    const [filters, setFilters] = useState({ page: 1 });
    const employeeFileRef = useRef(null);
    const { t } = useTranslation();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const tableColumns = [
        { selectAll: true },
        { title: t('fullName') },
        { title: t('nationalCode') },
        { title: t('mobile') },
        { title: t('gender') },
        { title: t('group') },
        { title: t('organizationStatus') },
    ];

    const uploadEmployeeFile = async (e, setFieldValue) => {
        if (loading.upload) return;
        setLoading({ ...loading, upload: true });

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        await OrganizationService.uploadEmployeeExcel(formData)
            .then((res) => {
                employeeFileRef.current.value = null;
                if (res.data.data.length === 0) {
                    setSnackBarData({
                        show: true,
                        data: {
                            text: 'کارمندی یافت نشد.',
                            type: 'error',
                        },
                    });
                } else {
                    setEmployees(res.data.data);
                    setTotalEmployees(res.data.data.length);
                    setFieldValue('employees', []);
                    setFieldValue('employeeExceptions', []);
                    setFieldValue('selectAll', false);
                    employeeSelcetionChanged(
                        {
                            selectAll: false,
                            employees: [],
                            employeeExceptions: [],
                        },
                        res.data.data.length
                    );
                    setTotalPage(1);
                }
            })
            .catch((err) => {
                console.log(5555555);
            });

        setLoading({ ...loading, upload: false });
    };
    const selectEmployeeFile = () => {
        if (employeeFileRef.current?.value) employeeFileRef.current.value = null;
        employeeFileRef.current && employeeFileRef.current.click();
    };
    const filter = (values) => {
        if (loading.filter) return;
        setLoading({ ...loading, filter: true });

        console.log(values, 123);

        setFilters({ ...filters, ...values, page: 1 });
    };
    const handlePageChange = (newPage) => {
        if (loading.page) return;
        setLoading({ ...loading, page: true });

        setFilters({ ...filters, page: newPage });
    };
    const employeeSelcetionChanged = (values, count) => {
        onEmployeeToggled({
            count: count,
            ...values,
        });
    };

    useEffect(() => {
        (async () => {
            const params = new URLSearchParams();
            params.append('page', filters.page);
            if (filters.gender) params.append('gender', filters.gender.id);
            if (filters.groups && filters.groups.length > 0) {
                filters.groups.forEach((item, index) => {
                    params.append(`group_ides[${index}]`, item.id);
                });
            }
            if (filters.chart) params.append('chart_id', filters.chart.id);
            console.log(filters, 88);
            await OrganizationService.get(`employees?${params.toString()}`)
                .then((res) => {
                    setEmployees(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                    setTotalEmployees(res.data.meta.total);
                    formikApis && formikApis.setFieldValue('employees', res.data.data);
                })
                .catch((err) => {
                    console.log(5555555);
                });
            setLoading({
                ...loading,
                initial: false,
                filter: false,
                page: false,
            });
        })();
    }, [filters]);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    gender: '',
                    groups: [],
                    chart: null,
                    employeeSelectionType: 'filters',
                    employees: [],
                    employeeExceptions: [],
                    selectAll: false,
                }}
                onSubmit={filter}>
                {({ values, setFieldValue, resetForm, handleSubmit }) => (
                    <Form>
                        <RadioGroup
                            value={values.employeeSelectionType}
                            name="employeeSelectionType"
                            onChange={(e) => {
                                setFieldValue('employeeSelectionType', e.target.value);
                                setFieldValue('selectAll', false);
                                setFieldValue('employees', []);
                                setFieldValue('employeeExceptions', []);

                                if (e.target.value === 'filters') {
                                    setLoading({
                                        ...loading,
                                        initial: true,
                                    });
                                    resetForm({
                                        values: {
                                            ...values,
                                            gender: '',
                                            groups: [],
                                            chart: null,
                                        },
                                    });
                                    handleSubmit();
                                } else {
                                    setFieldValue('selectAll', false);
                                    setEmployees([]);
                                    setTotalPage(1);
                                }
                            }}>
                            <Grid container mt="30px">
                                <Grid item xs={12}>
                                    <DBox>
                                        <Box sx={{ p: '0 30px', display: 'grid' }}>
                                            <Box
                                                sx={{
                                                    p: '15px 0',
                                                    borderBottom: '1px solid #EEEEEE',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}>
                                                <FormControlLabel
                                                    sx={{
                                                        mr: 0,
                                                        '& .MuiTypography-root': {
                                                            fontSize: '14px',
                                                            fontWeight: values.employeeSelectionType === 'filters' ? 600 : 400,
                                                            color:
                                                                values.employeeSelectionType === 'filters'
                                                                    ? '#000'
                                                                    : 'rgba(119, 119, 119, 1)',
                                                        },
                                                    }}
                                                    value="filters"
                                                    control={<Radio />}
                                                    label="براساس فیلترها"
                                                />

                                                <Button
                                                    component="span"
                                                    variant="outlined"
                                                    sx={{ fontSize: '14px', boxShadow: 'none' }}
                                                    disabled={loading.filter || values.employeeSelectionType === 'excel'}
                                                    onClick={() => {
                                                        resetForm({
                                                            values: {
                                                                ...values,
                                                                gender: '',
                                                                groups: [],
                                                                chart: null,
                                                            },
                                                        });
                                                        handleSubmit();
                                                    }}>
                                                    {t('deleteFilters')}
                                                </Button>
                                            </Box>
                                        </Box>
                                        <Box p="23px 30px">
                                            <Grid container spacing="30px">
                                                <Grid item xs={2}>
                                                    <DAutoComplete
                                                        name="groups"
                                                        formControlStyle={{ height: '42px' }}
                                                        buttonProps={{
                                                            label: 'گروه‌ها',
                                                        }}
                                                        isAsync
                                                        multiple
                                                        callOnOpen
                                                        apiPath={`company/groups`}
                                                        inputPlaceholder="جستجوی گروه"
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <DSelect
                                                        name="gender"
                                                        placeholder="جنسیت را انتخاب کنید"
                                                        formControlStyle={{ height: '42px' }}
                                                        defaultOptions={genderOption}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <DAutoComplete
                                                        name="chart"
                                                        formControlStyle={{ height: '42px' }}
                                                        buttonProps={{
                                                            label: 'چارت سازمانی',
                                                        }}
                                                        isAsync
                                                        searchOnType
                                                        callOnOpen
                                                        apiPath={`company/charts`}
                                                        apiStaticParams={{ all: true }}
                                                        apiResponseExtraKey="charts"
                                                        inputPlaceholder="جستجوی چارت سازمانی"
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <LoadingButton
                                                        fullWidth
                                                        loading={loading.filter}
                                                        disabled={loading.page || values.employeeSelectionType === 'excel'}
                                                        type="submit"
                                                        variant="outlined"
                                                        size="large"
                                                        sx={{ fontSize: '14px', boxShadow: 'none' }}>
                                                        جستجو
                                                    </LoadingButton>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </DBox>
                                </Grid>
                                <Grid item xs={12} mt="20px">
                                    <DBox>
                                        <Box sx={{ p: '0 30px', display: 'grid' }}>
                                            <Box sx={{ p: '15px 0', borderBottom: '1px solid #EEEEEE', display: 'flex' }}>
                                                <FormControlLabel
                                                    sx={{
                                                        mr: 0,
                                                        '& .MuiTypography-root': {
                                                            fontSize: '14px',
                                                            fontWeight: values.employeeSelectionType === 'excel' ? 600 : 400,
                                                            color:
                                                                values.employeeSelectionType === 'excel'
                                                                    ? '#000'
                                                                    : 'rgba(119, 119, 119, 1)',
                                                        },
                                                    }}
                                                    control={<Radio />}
                                                    value="excel"
                                                    label="بر اساس فایل اکسل"
                                                />
                                            </Box>
                                        </Box>
                                        <Box p="23px 64px" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography sx={{ fontSize: '12px', ml: '16px' }}>
                                                فایل اکسل شامل مشخصات کارمندان را در این قسمت آپلود نمایید:
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <Button
                                                    variant="outlined"
                                                    color="disabled"
                                                    sx={{ fontSize: '14px', color: '#777777' }}
                                                    startIcon={
                                                        <SystemUpdateAltIcon sx={{ fontSize: '12px', mr: 0, ml: '10px' }} />
                                                    }>
                                                    <Link
                                                        underline="none"
                                                        target="_blank"
                                                        download
                                                        sx={{ color: '#777777' }}
                                                        href={`${process.env.REACT_APP_STORAGE_BASE_URL}/example/employees.xlsx`}>
                                                        دانلود فایل نمونه
                                                    </Link>
                                                </Button>
                                                <input
                                                    ref={employeeFileRef}
                                                    type="file"
                                                    style={employeeFileInputStyles}
                                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                                    onChange={(e) => uploadEmployeeFile(e, setFieldValue)}
                                                />
                                                <LoadingButton
                                                    loading={loading.upload}
                                                    disabled={values.employeeSelectionType === 'filters'}
                                                    variant="contained"
                                                    color="disabled"
                                                    sx={{ fontSize: '14px' }}
                                                    startIcon={<AttachFileIcon sx={{ fontSize: '12px', mr: 0, ml: '10px' }} />}
                                                    onClick={selectEmployeeFile}>
                                                    آپلود فایل
                                                </LoadingButton>
                                            </Box>
                                        </Box>
                                    </DBox>
                                </Grid>
                                <Grid item xs={12}>
                                    <DBox
                                        className={(loading.page || loading.filter) && 'box--isLoading'}
                                        sx={{ mt: '2rem', p: '26px 29px' }}>
                                        <DLoadingWrapper loading={loading.initial}>
                                            <DTableWrapper>
                                                <TableHead>
                                                    <TableRow>
                                                        {tableColumns.map((column, index) => {
                                                            return (
                                                                <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                                                    {column.selectAll && employees.length > 0 ? (
                                                                        <Checkbox
                                                                            name="selectAll"
                                                                            onChange={() => {
                                                                                console.log(setFieldValue, 1234);
                                                                                setFormikApis({
                                                                                    setFieldValue: (name, value) =>
                                                                                        setFieldValue(name, value),
                                                                                });
                                                                                setFieldValue(
                                                                                    'employees',
                                                                                    values.selectAll ? [] : employees
                                                                                );
                                                                                setFieldValue('employeeExceptions', []);
                                                                                employeeSelcetionChanged(
                                                                                    {
                                                                                        ...values,
                                                                                        selectAll: !values.selectAll,
                                                                                        employees: values.selectAll
                                                                                            ? []
                                                                                            : employees,
                                                                                    },
                                                                                    values.selectAll ? 0 : totalEmployees
                                                                                );
                                                                                setFieldValue('selectAll', !values.selectAll);
                                                                            }}
                                                                            sx={{
                                                                                padding: '0px',
                                                                                '& .MuiSvgIcon-root': { fontSize: 20 },
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        column.title
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {employees.length > 0 ? (
                                                        employees.map((employee, index) => (
                                                            <OrgAllocateEmployeeItem
                                                                key={employee.id}
                                                                employee={employee}
                                                                selected={
                                                                    values.employees.filter((item) => item.id === employee.id)
                                                                        .length > 0
                                                                }
                                                                key={employee.id}
                                                                style={{
                                                                    backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                                }}
                                                                onCheckBoxToggled={(selectedEmployee) => {
                                                                    if (values.selectAll) {
                                                                        const employeeExceptions = values.employeeExceptions;
                                                                        const employeeAlreadyExistInExptions =
                                                                            values.employeeExceptions.filter(
                                                                                (item) => item.id === selectedEmployee.id
                                                                            );
                                                                        if (employeeAlreadyExistInExptions.length > 0) {
                                                                            const newEmployeesArray = employeeExceptions.filter(
                                                                                (item) => item.id != selectedEmployee.id
                                                                            );
                                                                            employeeSelcetionChanged(
                                                                                {
                                                                                    ...values,
                                                                                    employeeExceptions: newEmployeesArray,
                                                                                    employees: [
                                                                                        ...values.employees,
                                                                                        selectedEmployee,
                                                                                    ],
                                                                                },
                                                                                totalEmployees - employeeExceptions.length + 1
                                                                            );
                                                                            setFieldValue(
                                                                                'employeeExceptions',
                                                                                newEmployeesArray
                                                                            );
                                                                            setFieldValue('employees', [
                                                                                ...values.employees,
                                                                                selectedEmployee,
                                                                            ]);
                                                                        } else {
                                                                            employeeSelcetionChanged(
                                                                                values,
                                                                                totalEmployees - employeeExceptions.length - 1
                                                                            );
                                                                            employeeSelcetionChanged(
                                                                                {
                                                                                    ...values,
                                                                                    employeeExceptions: [
                                                                                        ...values.employeeExceptions,
                                                                                        selectedEmployee,
                                                                                    ],
                                                                                    employees: values.employees.filter(
                                                                                        (item) => item.id != selectedEmployee.id
                                                                                    ),
                                                                                },
                                                                                totalEmployees - employeeExceptions.length + 1
                                                                            );
                                                                            setFieldValue('employeeExceptions', [
                                                                                ...values.employeeExceptions,
                                                                                selectedEmployee,
                                                                            ]);
                                                                            setFieldValue(
                                                                                'employees',
                                                                                values.employees.filter(
                                                                                    (item) => item.id != selectedEmployee.id
                                                                                )
                                                                            );
                                                                        }
                                                                    } else {
                                                                        const employeeAlreadySelected =
                                                                            values.employees.filter(
                                                                                (item) => item.id === selectedEmployee.id
                                                                            ).length > 0;
                                                                        const newEmployeesArray = employeeAlreadySelected
                                                                            ? values.employees.filter(
                                                                                  (item) => item.id != selectedEmployee.id
                                                                              )
                                                                            : [...values.employees, selectedEmployee];
                                                                        setFieldValue('employees', newEmployeesArray);
                                                                        employeeSelcetionChanged(
                                                                            {
                                                                                ...values,
                                                                                employees: newEmployeesArray,
                                                                            },
                                                                            employeeAlreadySelected
                                                                                ? values.employees.length - 1
                                                                                : values.employees.length + 1
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        ))
                                                    ) : (
                                                        <DTableEmpty />
                                                    )}
                                                </TableBody>
                                            </DTableWrapper>

                                            {totalPage > 1 && (
                                                <Grid item xs={12} mt="20px" sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <DPagination
                                                        current={filters.page}
                                                        totalPages={totalPage}
                                                        onPageChange={handlePageChange}
                                                    />
                                                </Grid>
                                            )}
                                        </DLoadingWrapper>
                                    </DBox>
                                </Grid>
                            </Grid>
                        </RadioGroup>
                    </Form>
                )}
            </Formik>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </>
    );
};
const genderOption = [
    { name: 'زن', id: 'FEMALE' },
    { name: 'مرد', id: 'MALE' },
];
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const employeeFileInputStyles = {
    width: 0,
    height: 0,
    opacity: 0,
    visibility: 'hidden',
};
export default OrgAllocateEmployeeSelection;
