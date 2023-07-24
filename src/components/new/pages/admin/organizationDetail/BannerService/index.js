import { useState, useEffect } from 'react';
import { TableCell, TableHead, TableRow, TableBody, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';

// Utils
import adminService from 'service/api/adminService';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import BannerTableDetail from 'components/Common/Banner/BannerTableDetail';
import DSnackbar from 'components/new/shared/DSnackbar';
import DDeleteDialog from 'components/new/shared/DDeleteDialog/Index';

// Assets
import theme from 'assets/theme';
import BannerUpdateDetailDialog from 'components/Common/Banner/BannerUpdateDetailDialog';

const BannerService = ({ open, handleOpen, handleClose }) => {
    const [loading, setLoading] = useState({ initial: true, delete: false, refresh: false, get: false });
    const [filters, setFilters] = useState({ page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [bannerId, setBannerId] = useState(null);
    const [selectedBannerId, setSelectedBannerId] = useState(null);
    const [services, setServices] = useState([]);
    const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const { companyId } = useParams();

    const tableColumns = [{ title: 'بنر' }, { title: 'نام بنر' }, { title: 'وضعیت' }, { title: '' }];

    const handleOpenModal = (id) => {
        setSelectedBannerId(id);
        setIsOpen(true);
    };

    const handleCloseDialog = () => {
        setIsOpen(false);
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

        await adminService
            .deleteBanner(bannerId)
            .then((res) => {
                setFilters({ ...filters, page: 1 });
                setLoading({ ...loading, delete: false, refresh: true });
                closeDeleteCategoryDialog();

                setSnackBarData({
                    show: true,
                    data: {
                        text: ' .بنر با موفقیت حذف شد',
                        type: 'success',
                    },
                });
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
    queryString.append('company_id', companyId);

    const getBannerData = async (newpage = 1) => {
        console.log('run getting the data');
        setLoading({
            ...loading,
            refresh: true,
        });
        await adminService
            .getBannerService(queryString)
            .then((res) => {
                console.log(res.data.data);
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
        <Box>
            <DLoadingWrapper sx={{mt: '30px'}} loading={loading.initial}>
                <Box sx={wrapperStyles} className={loading.refresh && 'box--isLoading'}>
                    <>
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
                                            setIsOpen={setIsOpen}
                                            handleClose={handleClose}
                                            handleDelete={handleDelete}
                                            getBannerData={getBannerData}
                                            setLoading={setLoading}
                                            loading={loading}
                                            service={service}
                                            index={index}
                                            key={service.id}
                                            apiService={adminService}
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
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '30px',
                            }}>
                            <Button sx={{ fontSize: '14px' }} variant="outlined" component={Link} to="/app/admin/companies/">
                                بازگشت به لیست سازمان‌ها
                            </Button>
                        </Box>
                    </>
                </Box>
            </DLoadingWrapper>
            {showDeleteCategoryDialog && (
                <DDeleteDialog
                    loading={loading.delete}
                    title="بنر"
                    onDelete={deleteBannerById}
                    onClose={closeDeleteCategoryDialog}
                />
            )}
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />

            <BannerUpdateDetailDialog
                setSnackBarData={setSnackBarData}
                id={selectedBannerId}
                isOpen={isOpen}
                handleClose={handleCloseDialog}
                loading={loading}
                setLoading={setLoading}
                getBannerData={getBannerData}
                apiService={adminService}
                api="banners/"
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

export default BannerService;
