import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Box, TableCell, TableHead, TableRow, TableBody, Button, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';

// Utils
import adminService from 'service/api/adminService';

// Components
import DashboardCard from 'components/Common/Card/DashboardCard';
import DBox from 'components/new/shared/DBox';
import DSnackbar from 'components/new/shared/DSnackbar';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import CompanyListItem from 'components/new/pages/admin/companies/CompanyListItem';
import AddOrganizationDialog from 'components/new/pages/admin/companies/AddOrganizationDialog';
import CustomInputBase from 'components/Common/Form/CustomInputBase';

// Assets
import theme from 'assets/theme';

const tableColumns = [
    { title: 'لوگو (تصویر)' },
    { title: 'نام سازمان' },
    { title: 'شماره تلفن نماینده' },
    { title: 'نام مدیرعامل' },
    { title: 'تعداد کارمندان' },
    { title: 'تاریخ ثبت' },
    { title: 'ویرایش' },
];
const breadCrumbLinks = [
    { path: '/app/admin/', title: 'پیشخوان' },
    {
        title: 'مدیریت سازمان ',
    },
];

const Companies = () => {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState({
        initial: true,
        refresh: false,
        excel: true,
        filter: false,
    });

    const [showAddOrganizationDialog, setShowAddOrganizationDialog] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [filters, setFilters] = useState({
        page: searchParams.get('page') ? +searchParams.get('page') : 1,
        name: searchParams.get('name') || '',
    });
    const [totalPage, setTotalPage] = useState(1);
    const { t } = useTranslation();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };
    const openAddOrganizationDialog = () => {
        setShowAddOrganizationDialog(true);
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

    const closeDialog = () => setShowAddOrganizationDialog(false);

    const downloadExcel = async () => {
        if (loading.excel) return;
        setLoading({ ...loading, excel: true });

        await adminService
            .downloadCompaniesExcel()
            .then((res) => {
                const link = document.createElement('a');
                link.href = `${process.env.REACT_APP_STORAGE_URL}/${res.data.data}`;
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((err) => {
                console.log(5555555);
            });

        setLoading({ ...loading, excel: false });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            const apiParams = new URLSearchParams();
            const routeParams = new URLSearchParams();

            apiParams.append('page', filters.page);
            routeParams.append(`page`, filters.page);

            filters.name && apiParams.append(`name`, filters.name);
            filters.name && routeParams.append(`name`, filters.name);

            navigate({
                pathname: location.pathname,
                search: `?${routeParams.toString()}`,
            });

            await adminService
                .getCompanies(apiParams.toString(), { signal })
                .then((res) => {
                    setCompanies(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                })
                .catch((err) => {
                    console.log('error occured!');
                });
            setLoading({ initial: false, refresh: false });
        })();

        return () => controller.abort();
    }, [filters]);
    return (
        <DashboardCard pt="2rem">
            <Breadcrumb links={breadCrumbLinks} />

            <DBox sx={{ marginTop: '2rem', padding: '30px' }} className={loading.refresh && 'box--isLoading'}>
                <DLoadingWrapper loading={loading.initial}>
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Formik enableReinitialize={true} initialValues={filters} onSubmit={filterHandler}>
                                {({ values, setFieldValue, resetForm, handleReset, handleSubmit }) => (
                                    <Form>
                                        <CustomInputBase
                                            name="name"
                                            placeholder={t('searchCompany')}
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

                            <Button
                                variant="contained"
                                color="brandWarning"
                                startIcon={<PersonAddAltIcon fontSize="large" sx={{ margin: '0 0 0 1rem' }} />}
                                sx={{ fontSize: '14px' }}
                                onClick={openAddOrganizationDialog}>
                                {t('addOrganization')}
                            </Button>
                        </Box>

                        <DTableWrapper sx={{ mt: '24px' }}>
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
                                {companies.length > 0 ? (
                                    companies.map((company, index) => (
                                        <CompanyListItem
                                            company={company}
                                            key={company.id}
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
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: '20px' }}>
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
                        </Box>
                    </>
                </DLoadingWrapper>
            </DBox>

            {/* Add Organization Dialog */}
            {showAddOrganizationDialog && (
                <AddOrganizationDialog onChange={updateList} onClose={closeDialog} setSnackBarData={setSnackBarData} />
            )}
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DashboardCard>
    );
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default Companies;
