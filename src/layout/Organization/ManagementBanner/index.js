import React from 'react';
import { useState, useEffect } from 'react';
import {
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Box,
    Button,
    CircularProgress,
    Link,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';

// Utils
import organizationService from 'service/api/organization.service';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import DTableHeader from 'components/new/shared/DTable/DTableHeader';
import BannerTableDetail from 'components/Common/Banner/BannerTableDetail';
import DSnackbar from 'components/new/shared/DSnackbar';
import DDeleteDialog from 'components/new/shared/DDeleteDialog/Index';
import DashboardCard from 'components/Common/Card/DashboardCard';
import BannerUpdateDetailDialog from 'components/Common/Banner/BannerUpdateDetailDialog';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import AddIcon from '@mui/icons-material/Add';
import BannerAddDetailDialog from 'components/Common/Banner/BannerAddDetailDialog';

// Assets
import theme from 'assets/theme';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DBox from 'components/new/shared/DBox';

function ManagmentBanner(props) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState({ initial: true, delete: false, refresh: false, get: false });
    const [filters, setFilters] = useState({ page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [bannerId, setBannerId] = useState(null);
    const [selectedBannerId, setSelectedBannerId] = useState(null);
    const [services, setServices] = useState([]);
    const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] = useState(false);
    const [openAddBanner, setOpenAddBanner] = useState(false);
    const [openUpdateBanner, setOpenUpdateBanner] = useState(false);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const tableColumns = [{ title: 'بنر' }, { title: 'نام بنر' }, { title: 'وضعیت' }, { title: '' }];

    const handleOpenModal = (id) => {
        setSelectedBannerId(id);
        setOpenUpdateBanner(true);
    };

    const handleCloseDialogAdd = () => {
        setOpenAddBanner(false);
    };
    const handleCloseDialogUpdate = () => {
        setOpenUpdateBanner(false);
    };

    const handleDelete = (id) => {
        console.log(id, 'ID OF HANDLE DELETE');
        openDeleteCategoryDialog(id);
    };

    const openDeleteCategoryDialog = (id) => {
        setBannerId(id);
        setShowDeleteCategoryDialog(true);
    };
    const closeDeleteCategoryDialog = (id) => {
        setBannerId(null);
        setShowDeleteCategoryDialog(false);
    };

    const deleteBannerById = async () => {
        if (loading.delete) return;
        setLoading({ ...loading, delete: true });

        await organizationService
            .delete(`banners/${bannerId}`)
            .then((res) => {
                setLoading({ ...loading, delete: false, refresh: true });
                closeDeleteCategoryDialog();

                setSnackBarData({
                    show: true,
                    data: {
                        text: ' .بنر با موفقیت حذف شد',
                        type: 'success',
                    },
                });

                setFilters({ ...filters, page: 1 });
            })
            .catch((err) => {
                console.log('error occured!');
            });
    };

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

    const getBannerData = async (newpage = 1) => {
        console.log('run getting the data');
        setLoading({
            ...loading,
            refresh: true,
        });
        await organizationService
            .get(`banners?${queryString}`)
            .then((res) => {
                console.log(res.data.data, 'ggetting the banner data');
                setLoading({
                    initial: false,
                    refresh: false,
                });

                setServices(res.data.data);
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
        getBannerData();
    }, [filters]);

    return (
        <DashboardCard pt="24px">
            <Breadcrumb links={breadCrumbLinks} />
            <DLoadingWrapper loading={loading.initial}>
                <DBox sx={{ mt: '24px', p: '24px 30px' }} className={loading.refresh && 'box--isLoading'}>
                    <Grid container spacing="2rem">
                        <Grid item xs={12}>
                            <DTableHeader title="بنرهای سازمان">
                                <Stack direction="row" justifyContent="flex-end" mb="1rem">
                                    <Button
                                        sx={{ fontSize: '14px' }}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<AddIcon sx={{ m: '0 0 0 10px' }} />}
                                        onClick={() => {
                                            setOpenAddBanner(true);
                                        }}>
                                        افزودن بنر
                                    </Button>
                                </Stack>
                            </DTableHeader>
                        </Grid>

                        <Grid item xs={12}>
                            <DTableWrapper>
                                <TableHead>
                                    <TableRow>
                                        {tableColumns.map((column, index) => {
                                            return column.title !== '' ? (
                                                <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                                    {column.title}
                                                </TableCell>
                                            ) : (
                                                <TableCell style={tableHeadStyle} key={`table-column-${index}`} colSpan={2}>
                                                    عملیات
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {services.length > 0 ? (
                                        services.map((service, index) => (
                                            <BannerTableDetail
                                                handleOpenModal={handleOpenModal}
                                                setIsOpen={setOpenUpdateBanner}
                                                handleDelete={handleDelete}
                                                getBannerData={getBannerData}
                                                setLoading={setLoading}
                                                loading={loading}
                                                service={service}
                                                index={index}
                                                key={service.id}
                                                apiService={organizationService}
                                                api="banners/"
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
                                <Box height="4rem" mt="2rem">
                                    <DPagination current={filters.page} totalPages={totalPage} onPageChange={handlePageChange} />
                                </Box>
                            )}
                            {showDeleteCategoryDialog && (
                                <DDeleteDialog
                                    loading={loading.delete}
                                    title="بنر"
                                    onDelete={deleteBannerById}
                                    onClose={closeDeleteCategoryDialog}
                                />
                            )}
                            <BannerAddDetailDialog
                                setSnackBarData={setSnackBarData}
                                id={selectedBannerId}
                                isOpen={openAddBanner}
                                handleClose={handleCloseDialogAdd}
                                loading={loading}
                                setLoading={setLoading}
                                setFilters={setFilters}
                                filters={filters}
                                apiService={organizationService}
                                api="banners"
                            />
                            <BannerUpdateDetailDialog
                                setSnackBarData={setSnackBarData}
                                id={selectedBannerId}
                                isOpen={openUpdateBanner}
                                handleClose={handleCloseDialogUpdate}
                                loading={loading}
                                setLoading={setLoading}
                                getBannerData={getBannerData}
                                apiService={organizationService}
                                api="banners/"
                            />
                        </Grid>
                    </Grid>
                </DBox>
            </DLoadingWrapper>

            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DashboardCard>
    );
}
const breadCrumbLinks = [
    { path: '/app/organization/dashboard/', title: 'پیشخوان' },
    {
        title: 'مدیریت بنر‌ها',
    },
];
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default ManagmentBanner;
