import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Box, Button, Grid, TableBody, TableCell, TableHead, TableRow, Typography, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';

// Utils
import adminService from 'service/api/adminService';

// Components
import DashboardCard from 'components/Common/Card/DashboardCard';
import DSnackbar from 'components/new/shared/DSnackbar';
import DBox from 'components/new/shared/DBox';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import FormSupplier from './FormSupplierDialog';
import FormSupplierAdd from './FormSupplierDialogAdd';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import SupplierListItem from 'components/new/pages/admin/suppliers/SupplierListItem';

// Assets
import theme from 'assets/theme';

function SupplierManagement(props) {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [loading, setLoading] = useState({ initial: true, refresh: false, excel: false });
    const [filters, setFilters] = useState({
        page: searchParams.get('page') ? +searchParams.get('page') : 1,
        name: searchParams.get('name') || '',
    });
    const [supplierDialog, setSupplierDialog] = useState({ isOpen: false, selected: null });
    const [supplierDialogAdd, setSupplierDialogAdd] = useState({ isOpen: false, selected: null });
    const [totalPage, setTotalPage] = useState(1);
    const [suppliers, setSuppliers] = useState([]);
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
    const filterHandler = (values) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, name: values.name, page: 1 });
    };
    const supplierUpdated = (message) => {
        setSnackBarData({
            show: true,
            data: {
                text: message,
                type: 'success',
            },
        });
        closeDialog();
        updateList();
    };
    const updateList = () => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters });
    };

    const closeDialog = () => setSupplierDialog({ isOpen: false, selected: null });
    const closeAddDialog = () => setSupplierDialogAdd({ isOpen: false, selected: null });

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

            await adminService
                .getSuppliers(params.toString(), { signal })
                .then((res) => {
                    setSuppliers(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                })
                .catch((err) => {
                    console.log('error occured!');
                });
            setLoading({ initial: false, refresh: false });
        })();

        return () => controller.abort();
    }, [filters]);

    const downloadExcel = async () => {
        if (loading.excel) return;
        setLoading({ ...loading, excel: true });

        await adminService
            .exportSupplier()
            .then((res) => {
                const link = document.createElement('a');
                link.href = `${process.env.REACT_APP_STORAGE_URL}/${res.data.data}`;
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((error) => {
                console.log(error);
            });

        setLoading({ ...loading, excel: false });
    };

    return (
        <DashboardCard pt="2rem">
            <Breadcrumb links={breadCrumbLinks} />
            <DBox sx={{ mt: '2rem', p: '26px 29px' }} className={loading.refresh && 'box--isLoading'}>
                <DLoadingWrapper loading={loading.initial}>
                    <>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Formik enableReinitialize={true} initialValues={filters} onSubmit={filterHandler}>
                                        {({ values, setFieldValue, resetForm, handleReset, handleSubmit }) => (
                                            <Form>
                                                <CustomInputBase
                                                    name="name"
                                                    placeholder={t('searchSupplier')}
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
                                        sx={addSupplierButtonStyles}
                                        type="button"
                                        onClick={() => setSupplierDialogAdd({ isOpen: true, selected: null })}>
                                        <PersonAddAltIcon fontSize="large" />
                                        افزودن تامین کننده
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} mt="32px">
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
                                        {suppliers.length > 0 ? (
                                            suppliers.map((supplier, index) => (
                                                <SupplierListItem
                                                    supplier={supplier}
                                                    key={supplier.id}
                                                    style={{
                                                        backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                    }}
                                                    onShowSupplierInfo={() =>
                                                        setSupplierDialog({ isOpen: true, selected: supplier })
                                                    }
                                                />
                                            ))
                                        ) : (
                                            <DTableEmpty />
                                        )}
                                    </TableBody>
                                </DTableWrapper>
                            </Grid>
                            <Grid item xs={6} mt="20px">
                                <LoadingButton
                                    variant="outlined"
                                    loading={loading.excel}
                                    sx={{ fontSize: '14px' }}
                                    onClick={downloadExcel}>
                                    خروجی اکسل
                                </LoadingButton>
                            </Grid>
                            <Grid item xs={6} mt="20px" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {totalPage > 1 && <DPagination totalPages={totalPage} onPageChange={handlePageChange} />}
                            </Grid>
                        </Grid>
                    </>
                </DLoadingWrapper>
            </DBox>

            <FormSupplier
                isOpen={supplierDialog.isOpen}
                selected={supplierDialog.selected}
                onClose={closeDialog}
                onRefresh={updateList}
                onSave={supplierUpdated}
            />
            <FormSupplierAdd isOpen={supplierDialogAdd.isOpen} onClose={closeAddDialog} onRefresh={updateList} />

            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DashboardCard>
    );
}

const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const addSupplierButtonStyles = {
    gap: '10px',
    padding: '10px 26px',
    height: '40px',
    borderRadius: '.5rem',
    fontSize: '1.4rem',
    color: theme.main.palette.common.black,
    backgroundColor: theme.main.palette.secondary.main,
    '&:hover': {
        backgroundColor: theme.main.palette.secondary.main,
    },
};
const breadCrumbLinks = [{ path: '/app/admin/', title: 'پیشخوان' }, { title: 'مدیریت تامین کنندگان' }];

const tableColumns = [
    { title: 'نام تامین کننده' },
    { title: 'نوع تامین کننده' },
    { title: 'شماره تلفن نماینده' },
    { title: 'نام مدیر عامل' },
    { title: 'تاریخ ثبت نام' },
    { title: 'ویرایش' },
];
export default SupplierManagement;
