import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DashboardCard from 'components/Common/Card/DashboardCard';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DTableHeader from 'components/new/shared/DTable/DTableHeader';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import theme from 'assets/theme';
import Add from '@mui/icons-material/Add';
import adminService from 'service/api/adminService';

import EventsItem from 'components/Common/EventManagement/EvensItems';
import AddForm from 'components/Common/EventManagement/AddForm';
import DDeleteDialog from 'components/new/shared/DDeleteDialog/Index';
import DSnackbar from 'components/new/shared/DSnackbar';
import DBox from 'components/new/shared/DBox';

const breadCrumbLinks = [{ path: '/app/admin/', title: 'پیشخوان' }, { title: 'مدیریت رویدادها' }];
const tableColumns = [{ title: 'نام رویداد' }, { title: 'تاریخ' }, { title: 'عملیات' }];

function EventsManagement() {
    const [loading, setLoading] = useState({ initial: true, refresh: false, delete: false });
    const [filters, setFilters] = useState({ page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [event, setEvent] = useState([]);
    const [eventId, setEventId] = useState(null);
    const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] = useState(false);
    const [eventAdd, setEventAdd] = useState({ isOpen: false, update: false });
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const closeAddDialog = () => {
        setEventId(null);
        setEventAdd({ isOpen: false, update: false });
    };

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };

    const params = new URLSearchParams();
    params.append('page', filters.page);

    const openDeleteCategoryDialog = (id) => {
        setEventId(id);
        setShowDeleteCategoryDialog(true);
    };
    const closeDeleteCategoryDialog = () => {
        setEventId(null);
        setShowDeleteCategoryDialog(false);
    };

    const handleDelete = (id) => {
    
        openDeleteCategoryDialog(id);
    };

    const deleteBannerById = async () => {
        if (loading.delete) return;
        setLoading({ ...loading, delete: true });

        await adminService
            .delete(`events/${eventId}`)
            .then((res) => {
                setFilters({ ...filters, page: 1 });
                setLoading({ ...loading, delete: false });
                closeDeleteCategoryDialog();

                setSnackBarData({
                    show: true,
                    data: {
                        text: 'رویداد با موفقیت حذف شد',
                        type: 'success',
                    },
                });
            })
            .catch((err) => {
       
            });
    };
    const getEvents = async () => {
        setLoading({
            ...loading,
            refresh: true,
        });
        await adminService
            .get(`events?${params}`)
            .then((res) => {
                setLoading({
                    ...loading,
                    initial: false,
                    refresh: false,
                });
                setEvent(res.data.data);
                setTotalPage(res.data.meta.last_page);
            })
            .catch((err) => {
                setLoading({
                    ...loading,
                    initial: false,
                    refresh: false,
                });
            });
    };

    useEffect(() => {
        getEvents();
    }, [filters]);

    return (
        <DashboardCard pt="2rem" meta={{ title: 'مدیریت رویدادها' }}>
            <Breadcrumb links={breadCrumbLinks} />
            <DBox sx={{ p: '24px 30px', mt: '22px' }} className={loading.refresh && 'box--isLoading'}>
                <DLoadingWrapper loading={loading.initial}>
                    <>
                        <Grid container>
                            <Grid item xs={12}>
                                <DTableHeader title="مدیریت رویدادها">
                                    <Box display="flex" gap="1.5rem">
                                        <Button
                                            sx={addٍEventButtonStyles}
                                            type="button"
                                            onClick={() => setEventAdd({ isOpen: true, update: false })}>
                                            {/* <Add fontSize="large" /> */}
                                            افزودن رویدادها
                                        </Button>
                                    </Box>
                                </DTableHeader>
                            </Grid>
                            <Grid item xs={12}>
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
                                        {event.length > 0 ? (
                                            event.map((comment, index) => (
                                                <EventsItem
                                                    eventAdd={eventAdd}
                                                    setEventAdd={setEventAdd}
                                                    getEvents={getEvents}
                                                    eventId={eventId}
                                                    setEventId={setEventId}
                                                    setSnackBarData={setSnackBarData}
                                                    handleDelete={handleDelete}
                                                    comment={comment}
                                                    key={comment.id}
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
                            {totalPage > 1 && (
                                <Grid item xs={12} mt="20px" sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <DPagination totalPages={totalPage} current={filters.page} onPageChange={handlePageChange} />
                                </Grid>
                            )}
                        </Grid>
                    </>
                </DLoadingWrapper>
            </DBox>

            <AddForm
                apiService={adminService}
                setSnackBarData={setSnackBarData}
                event={event}
                isOpen={eventAdd.isOpen}
                onClose={closeAddDialog}
                getEvents={getEvents}
                update={eventAdd.update}
                eventId={eventId}
            />
            {showDeleteCategoryDialog && (
                <DDeleteDialog
                    loading={loading.delete}
                    title="رویداد"
                    onDelete={deleteBannerById}
                    onClose={closeDeleteCategoryDialog}
                />
            )}

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

const addٍEventButtonStyles = {
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

export default EventsManagement;
