import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DPagination from 'components/new/shared/DPagination/Index';
import DBox from 'components/new/shared/DBox';
// Assets
import theme from '../../../assets/theme';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import DSnackbar from '../../../components/new/shared/DSnackbar';
import CustomInputSearch from '../../../components/Common/Form/CustomInputSearch';
import AddIcon from '@mui/icons-material/Add';
import TicketListItem from './TicketListItem';
import AddTicket from './AddTicket';
import adminService from '../../../service/api/adminService';

const tableColumns = [
    { title: 'شماره' },
    { title: 'عنوان' },
    { title: 'نام و نام خانوادگی' },
    { title: 'سازمان/تامین کننده' },
    { title: 'کاربری' },
    { title: 'وضعیت' },
    { title: 'آخرین بروزرسانی' },
    { title: 'عملیات' },
    { title: 'جزییات' },
];
const breadCrumbLinks = [{ path: '/app/admin/', title: 'پیشخوان' }, { title: 'پشتیبانی' }];

const Tickets = () => {
    const { t } = useTranslation();
    const addFormInitialValues = {
        price: '',
        description: '',
        file: '',
    };
    const Initial_Values = {
        name: '',
    };
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({ page: 1, name: '' });
    const [totalPage, setTotalPage] = useState(1);
    const [wallet, setWallet] = useState({ remain: 0, amount: 0 });
    const [initialValue, setInitialValue] = useState(addFormInitialValues);
    const [tickets, setTickets] = useState([]);
    const [addEmployeeDialogIsOpen, setAddEmployeeDialogIsOpen] = useState(false);
    const [showAddTicketDialogIsOpen, setShowAddTicketDialogIsOpen] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const [status, setStatus] = useState({
        doNoting: true,
        uploading: false,
        uploaded: false,
        completed: false,
        error: false,
    });

    const handleFilterSubmit = async (values) => {
    
        const name = values.name;

        setFilters({ ...filters, name }); 
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
    queryString.append('name', filters.name);
    queryString.append('page', filters.page);

    const getTickets = async () => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        await OrganizationService.getTickets()
            .then((res) => {
                setTickets(res.data.data);
                setTotalPage(res.data.meta.last_page);
            })
            .catch((err) => {});
        setLoading({
            ...loading,
            initial: false,
            refresh: false,
        });
    };

    useEffect(() => { 
        (async () => {
            const params = new URLSearchParams();
            params.append('page', filters.page);
            await adminService
                .get(`tickets?${params.toString()}`)
                .then((res) => {
                    setTickets(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                })
                .catch((err) => {});
            setLoading({
                ...loading,
                initial: false,
                refresh: false,
                delete: false,
                save: false,
            });
        })();
    }, [filters]);

    const showAddTicket = (req) => {
        setSelectedRequest(req);
        setShowAddTicketDialogIsOpen(true);
    };
    const closeShowAddTicket = () => {
        setShowAddTicketDialogIsOpen(false);
    };

    const openDeleteDialog = (group) => {
        setShowDeleteDialog(true);
        setSelectedRequest(group);
    };
    const closeDeleteDialog = () => {
        setShowDeleteDialog(false);
    };

    const closeTicket = async (id) => {
        if (loading.delete) return;
        setLoading({
            ...loading,
            delete: true,
        });
        await adminService
            .closeTicket(id)
            .then((res) => {
                setShowDeleteDialog(false);
                setFilters({ ...filters });
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'بستن تیکت با موفقیت انجام شد.',
                        type: 'success',
                    },
                });
            })
            .catch((err) => {});

        setLoading({
            ...loading,
            initial: false,
            delete: false,
        });
    };

    return (
        <DashboardCard pt="2rem" sx={styleCard} meta={{ title: 'پشتیبانی' }}>
            <Breadcrumb links={breadCrumbLinks} />
            {/*{showDeleteDialog && (*/}
            {/*    <DDeleteDialog loading={loading.delete} title="درخواست" onDelete={deleteRequest} onClose={closeDeleteDialog} />*/}
            {/*)}*/}

            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />

            <DBox sx={{ mt: '2rem', p: '26px 29px' }}>
                <DLoadingWrapper loading={loading.initial}>
                    <Grid
                        container
                        spacing={'2rem'}
                        justifyContent={'space-between'}
                        className={loading.refresh && 'box--isLoading'}>
                        {/*<Grid height="4rem" item xs={3}>*/}
                        {/*    <Typography sx={titleStyles}>{'تاریخچه درخواست ها'}</Typography>*/}
                        {/*</Grid>*/}
                        {/*<Grid justifyContent="flex-start" height="4rem" mt="1rem" item xs={4} className="flex">*/}
                        {/*    <Formik initialValues={Initial_Values} onSubmit={handleFilterSubmit}>*/}
                        {/*        <Form>*/}
                        {/*            <Box width="100%" mb="1.3rem">*/}
                        {/*                <CustomInputSearch*/}
                        {/*                    sx={{ width: '100% !important' }}*/}
                        {/*                    placeholder={'جستجو '}*/}
                        {/*                    name="name"*/}
                        {/*                />*/}
                        {/*            </Box>*/}
                        {/*        </Form>*/}
                        {/*    </Formik>*/}
                        {/*</Grid>*/}
                        {/*<Grid height="4rem" m=".3rem 0 2rem" item xs={5} className="flex" justifyContent="flex-end" gap="1.5rem">*/}
                        {/*    <Button*/}
                        {/*        variant="contained"*/}
                        {/*        color="brandWarning"*/}
                        {/*        sx={{ fontSize: '14px', height: '4rem' }}*/}
                        {/*        startIcon={<AddIcon fontSize="large" sx={{ margin: '0 0 0 1rem' }} />}*/}
                        {/*        onClick={showAddTicket}*/}
                        {/*         >*/}
                        {/*        تیکت جدید*/}
                        {/*    </Button>*/}

                        {/*</Grid>*/}
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
                                    {tickets.length > 0 ? (
                                        tickets.map((ticket, index) => (
                                            <TicketListItem
                                                ticket={ticket}
                                                key={ticket.id}
                                                style={{
                                                    backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                }}
                                                baseUrl="/app/admin/management-tickets/"
                                                // onShowRequestInfo={showRequestInfo}
                                                openDeleteDialog={openDeleteDialog}
                                                closeTicket={closeTicket}
                                            />
                                        ))
                                    ) : (
                                        <DTableEmpty />
                                    )}
                                </TableBody>
                            </DTableWrapper>
                        </Grid>
                        <Grid item xs={12} mt="20px" sx={{ display: 'flex', justifyContent: 'center' }}>
                            {totalPage > 1 && <DPagination totalPages={totalPage} onPageChange={handlePageChange} />}
                        </Grid>
                    </Grid>
                </DLoadingWrapper>
            </DBox>
            {showAddTicketDialogIsOpen && (
                <AddTicket
                    onClose={() => closeShowAddTicket()}
                    getTickets={() => {
                        setFilters({ ...filters });
                    }}
                />
            )}
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

const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default Tickets;
