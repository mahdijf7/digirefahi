import React, { useEffect, useState } from 'react';
import { Box, Grid, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DPagination from 'components/new/shared/DPagination/Index';
import DBox from 'components/new/shared/DBox';
import DSnackbar from 'components/new/shared/DSnackbar';
import DashboardCard from 'components/Common/Card/DashboardCard';

// Assets
import theme from '../../../assets/theme';
import WalletRequestListItem from './WalletRequestListItem';
import { Form, Formik } from 'formik';
import CustomInputBase from '../../../components/Common/Form/CustomInputBase';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import CustomInputDocument from '../../../components/Common/Form/CustomInputDocument';
import UploadIcon from '@mui/icons-material/Upload';
import { ColorWhite } from '../../../assets/theme/color';
import CreditRequest from './CreditRequest';
import { getErrorForSnackbar } from '../../../utils/helpers';
import DDeleteDialog from '../../../components/new/shared/DDeleteDialog/Index';
import adminService from '../../../service/api/adminService';
import CustomInputFile from '../../../components/Common/Form/CustomInputFile';
const tableColumns = [
    { title: 'شناسه درخواست' },
    { title: 'مبلغ (تومان)' },
    { title: 'تاریخ ثبت درخواست' },
    { title: 'وضعیت' },
    { title: 'عملیات' },
];

const CreditRequests = () => {
    const { t } = useTranslation();
    const addFormInitialValues = {
        price: '',
        description: '',
        file: '',
    };
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({ page: 1, name: '' });
    const [totalPage, setTotalPage] = useState(1);
    const [wallet, setWallet] = useState({ remain: 0, amount: 0 });
    const [initialValue, setInitialValue] = useState(addFormInitialValues);
    const [requests, setRequests] = useState([]);
    const [addEmployeeDialogIsOpen, setAddEmployeeDialogIsOpen] = useState(false);
    const [showRequestInfoDialogIsOpen, setShowRequestInfoDialogIsOpen] = useState(false);
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

    const Validation_Schema = Yup.object({
        price: Yup.number('').positive().typeError('مبلغ با اعداد پر شود').required('مقدار این فیلد نمیتواند خالی باشد'),
    });
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

    const handleImageSelect = (file) => {
        setSelectedPdf(file);
        setStatus({
            uploading: false,
            doNoting: false,
            completed: false,
            uploaded: true,
        });

      
    };

    useEffect(() => {
   
        (async () => {
            const params = new URLSearchParams();
            params.append('page', filters.page);
            await OrganizationService.get(`credit-requests?${params.toString()}`)
                .then((res) => {
                    setRequests(res.data.data);
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

    const showRequestInfo = (req) => {
        setSelectedRequest(req);
        setShowRequestInfoDialogIsOpen(true);
    };
    const closeShowRequestInfo = () => {
        setShowRequestInfoDialogIsOpen(false);
    };
    const handleSubmit = async (values, { resetForm }) => {
        if (loading.save) return;
        setLoading({ ...loading, save: true });

        const formData = new FormData();
        if (values?.price) formData.append('price', values.price);
        if (values?.description) formData.append('company_description', values.description);
        if (values?.file) formData.append('file', values.file);

        await OrganizationService.createCreditRequest(formData)
            .then((res) => {
           
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'درخواست با موفقیت ایجاد شد.',
                        type: 'success',
                    },
                });
                resetForm({ values: '' });
                setSelectedPdf('');
                setLoading({
                    ...loading,
                    save: false,
                    refresh: true,
                });
                setFilters({ ...filters });
            })
            .catch((err) => {
                const errorMsg = err?.response?.data?.data && getErrorForSnackbar(err.response.data.data);
                errorMsg &&
                    setSnackBarData({
                        show: true,
                        data: {
                            text: errorMsg,
                            type: 'error',
                        },
                    });
                setLoading({ ...loading, save: false });
            });
    };

    const openDeleteDialog = (group) => {
        setShowDeleteDialog(true);
        setSelectedRequest(group);
    };
    const closeDeleteDialog = () => {
        setShowDeleteDialog(false);
    };

    const deleteRequest = async () => {
        if (loading.delete) return;
        setLoading({
            ...loading,
            delete: true,
        });
        await OrganizationService.deleteRequest(selectedRequest.id)
            .then((res) => {
                setShowDeleteDialog(false);
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'درخواست افزایش اعتبار با موفقیت حذف شد.',
                        type: 'success',
                    },
                });
                setLoading({
                    ...loading,
                    refresh: true,
                });
                setFilters({ ...filters });
            })
            .catch((err) => {
                setLoading({
                    ...loading,
                    delete: false,
                });
            });
    };

    return (
        <DashboardCard pt="2rem" sx={styleCard} meta={{ title: 'درخواست افزایش اعتبار' }}>
            <Breadcrumb links={breadCrumbLinks} />
            {showDeleteDialog && (
                <DDeleteDialog loading={loading.delete} title="درخواست" onDelete={deleteRequest} onClose={closeDeleteDialog} />
            )}

            <DBox sx={{ mt: '2rem', p: '26px 29px' }}>
                <DLoadingWrapper loading={loading.initial}>
                    <Grid container spacing={'4rem'}>
                        <Grid height="8rem" item xs={12}>
                            <Typography style={titleWalletStyles}>{'درخواست افزایش اعتبار'}</Typography>
                        </Grid>
                        <Grid container spacing={2} sx={{ padding: '20px 10px 0 40px' }}>
                            <Grid item xs={12}>
                                <Formik initialValues={initialValue} validationSchema={Validation_Schema} onSubmit={handleSubmit}>
                                    <Form>
                                        <Grid columnSpacing={8} rowSpacing="14px" container>
                                            <Grid item xs={12} md={12}>
                                                <CustomInputBase
                                                    height="4.2rem"
                                                    borderRadius=".8rem"
                                                    showlabel="true"
                                                    name="price" 
                                                    type={'number'}
                                                    placeholder={'مبلغ را به تومان وارد کنید'}
                                                    title={'مبلغ درخواستی'} 
                                                    weight
                                                    hasDefaultStyle
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <CustomInputBase
                                                    height="4.2rem"
                                                    borderRadius=".8rem"
                                                    showlabel="true"
                                                    name="description"
                                                    title={'توضیحات'}
                                                    placeholder={'توضیحات را وارد کنید'}
                                                    weight
                                                    hasDefaultStyle
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <CustomInputFile
                                                    height="9.2rem"
                                                    borderRadius=".8rem"
                                                    bg={'#f2f2f7'}
                                                    showlabel="true"
                                                    title={'ضمیمه'}
                                                    accept="file_extension|audio/*|video/*|image/*|media_type"
                                                    name="file"
                                                    weight
                                                    placeholder={'فایلی انتخاب نشده است.'}
                                                    sx={{ ...blueBtnStyle, width: '20%', textAlign: 'right' }}
                                                    onSelect={handleImageSelect}
                                                    fileName={selectedPdf ? selectedPdf.name : 'فایلی انتخاب نشده است.'}>
                                                    انتخاب فایل
                                                </CustomInputFile>
                                            </Grid>
                                            {/*</Grid>*/}
                                            <Grid
                                                item
                                                xs={12}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    gap: '10px',
                                                    marginTop: '100px',
                                                }}>
                                                <LoadingButton
                                                    loading={loading.save}
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{ fontSize: '14px', boxShadow: 'none' }}>
                                                    ثبت اطلاعات
                                                </LoadingButton>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </Formik>
                            </Grid>
                        </Grid>
                    </Grid>
                </DLoadingWrapper>
            </DBox>

            <DBox sx={{ mt: '2rem', p: '26px 29px' }}>
                <DLoadingWrapper loading={loading.initial}>
                    <Box className={loading.refresh && 'box--isLoading'}>
                        <Grid container spacing={'2rem'}>
                            <Grid height="4rem" item xs={3}>
                                <Typography sx={titleStyles}>{'تاریخچه درخواست ها'}</Typography>
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
                                        {requests.length > 0 ? (
                                            requests.map((request, index) => (
                                                <WalletRequestListItem
                                                    report={request}
                                                    key={request.id}
                                                    style={{
                                                        backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                    }}
                                                    onShowRequestInfo={showRequestInfo}
                                                    openDeleteDialog={openDeleteDialog}
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
                    </Box>
                </DLoadingWrapper>
                <DSnackbar
                    open={snackBarData.show}
                    info={snackBarData.data}
                    onClose={() => setSnackBarData({ ...snackBarData, show: false })}
                />
            </DBox>
            {showRequestInfoDialogIsOpen && (
                <CreditRequest onClose={() => closeShowRequestInfo()} requestId={selectedRequest.id} />
            )}
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DashboardCard>
    );
};

const titleStyles = {
    fontSize: '20px',
};

const titleWalletStyles = {
    fontSize: '20px',
    paddingTop: 8,
};
const blueBtnStyle = {
    padding: '4px 45px',
    backgroundColor: 'rgba(8, 119, 189, 1)',
    border: '1px solid rgba(8, 119, 189, 1)',
    fontSize: '14px',
    color: '#fff',
    textDecoration: 'none',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin: '0 0px',
    boxShadow: 'none',
    height: '4.2rem',
    borderRadius: '0 .8rem .8rem 0',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(8, 119, 189, 1)',
        color: '#fff',
        textDecoration: 'none',
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(8, 119, 189, 1)',
        color: '#fff',
        textDecoration: 'none',
    },
};

const styleCard = {
    '& button': {
        boxShadow: 'none !important',
        '@media (max-width: 1250px)': {
            fontSize: '1rem  !important',
        },
    },
};
const buttonStyle = {
    width: '20% !important ',
    minWidth: 160,
    height: '3.3rem',
    borderRaduis: '10px',
    backgroundColor: 'primary.main',
    color: 'common.white',
    fontSize: '1.2rem',
    boxShadow: 'none !important',
    '&:hover': {
        boxShadow: 'none !important',
        bgcolor: 'primary.main',
    },

    '&:disabled': {
        bgcolor: '#B4B4B4',
        color: ColorWhite,
    },
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

const uploadTitle = {
    minWidth: 80,
};
const breadCrumbLinks = [
    { path: '/app/organization/dashboard/', title: 'پیشخوان' },
    {
        path: '/app/organization/wallet/creditRequests/',
        title: ' کیف پول ',
    },
    { title: 'درخواست افزایش اعتبار' },
];
export default CreditRequests;
