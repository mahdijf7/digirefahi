import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Divider, Typography, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Utils

// Components
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader'; 
import DSnackbar from 'components/new/shared/DSnackbar';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import CustomInputDocument from 'components/Common/Form/CustomInputDocument';

//styels
import { ColorBlack, ColorWhite, ColorGrey } from 'assets/theme/color';
import UploadIcon from '@mui/icons-material/Upload';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CachedIcon from '@mui/icons-material/Cached';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const EXAMPLE_EXCEL = process.env.REACT_APP_STORAGE_BASE_URL + 'example/employees.xlsx';

function EmployeeAddGroupDialog({ employeeId, title, onClose, getEmployees, api, apiService, noCompany = false }) {
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false);
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
    const { t } = useTranslation();

    const initialValues = {
        company_id: '',
    };
    const validationSchema = Yup.object({
        company_id: Yup.object()
            .nullable()
            .shape({
                value: Yup.string(),
                label: Yup.string(),
            })
            .required(''),
    });
    const validationSchema1 = Yup.object({
        company_id: Yup.string().nullable(),
    });
    const fd = new FormData();
    const handleSubmit = async (values, actions) => {
        values.file && fd.append('file', values.file);
        values.company_id && fd.append('company_id', values.company_id.id);
        submitForm();
    };

    const submitForm = async () => {
        setLoading(true);
        setStatus({
            error: false,
            uploading: true,
            doNoting: false,
            completed: false,
        });
        await apiService
            .update(api, fd)
            .then((res) => {
                setLoading(false);

                setResponse(res.data.data);
                if (res?.data?.data?.success?.count > 0) {
                    setStatus({
                        error: false,
                        doNoting: false,
                        uploading: false,
                        completed: true,
                    });
                    getEmployees();
                } else {
                    setStatus({
                        error: true,
                        doNoting: false,
                        uploading: false,
                        completed: false,
                    });
                }
            })
            .catch((err) => {
                setLoading(false);
                const error500 = err?.response?.status == 500;
                const errorMsg = error500 ? 'اختلال سرور ساعتی بعد امتحان کنید!' : 'مشگلی پیش آمد مجدد امتحان کنید.';
                setSnackBarData({
                    show: true,
                    data: {
                        text: errorMsg,
                        type: 'error',
                    },
                });
                error500 &&
                    setStatus({
                        error: true,
                        doNoting: false,
                        uploading: false,
                        completed: false,
                    });
            });
    };

    const handleImageSelect = (file) => {
        setSelectedPdf(file);
        setResponse('');

        setStatus({
            uploading: false,
            doNoting: false,
            completed: false,
            uploaded: true,
        }); 
    };

    const icon = (
        <>
            <PeopleOutlineIcon sx={{ mb: '-1rem', ml: '1rem', fontSize: '3rem', color: 'primary.main' }} />
            {'افزودن گروهی کارمندان'}
        </>
    ); 

    const statusColor = status.error ? '#E52929' : status.uploading ? '#F7C906' : '#08BD71';
    const statusStyle = {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: statusColor,
        marginRight: '8px',
        transition: 'background-color 0.5s ease-in-out',
    };

    const spinStyle = {
        fontSize: '2rem',
        color: '#F7C906',
        animation: 'spin 1s linear infinite',
        transformOrigin: 'center center',
    };
    const svgSuccess = { color: '#08BD71', fontSize: '2rem', ml: '1rem' };
    const keyframes = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

    let statusTitle;
    if (status.uploading && loading) {
        statusTitle = (
            <>
                <style>{keyframes}</style>
                <CachedIcon sx={spinStyle} />
                {'در حال بارگذاری فایل'}
            </>
        );
    } else if (status.uploaded && !loading) {
        statusTitle = (
            <>
                <UploadIcon sx={svgSuccess} />
                {'بارگذاری با موفقیت انجام شد'}
            </>
        );
    } else if (status.completed && !loading) {
    } else {
        statusTitle = '';
    }

    return (
        <>
            <DDialogHeader title={icon} onClose={onClose} />
            <Divider sx={{ my: '2rem' }} />
            <Box sx={wrapperStyles}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={noCompany ? validationSchema1 : validationSchema}
                    onSubmit={handleSubmit}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <Grid container>
                                {!noCompany && (
                                    <Grid item xs={12}>
                                        <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: '5px', textAlign: 'right' }}>
                                            {'سازمان'}
                                        </Typography>
                                        <DAutoComplete
                                            name="company_id"
                                            showlabel
                                            sx={inputStyle}
                                            placeholder={'سازمان را انتخاب کنید'}
                                            weight
                                            formControlStyle={inputStyle}
                                            buttonProps={{ label: 'سازمان را انتخاب کنید' }}
                                            isAsync
                                            callOnOpen
                                            singleCall
                                            apiPath={`admin/companies`}
                                        />
                                    </Grid>
                                )}

                                <Grid display="flex" justifyContent="flex-start" item mt="3rem" xs={12}>
                                    <Typography variant="h4"> بارگذاری فایل</Typography>
                                </Grid>
                                <Grid item mt="1rem" xs={6}>
                                    <Typography textAlign="right" variant="body2">
                                        {'فایل اطلاعات کارمندان را بارگذاری کنید:'}
                                    </Typography>
                                </Grid>
                                <Grid item mt="1rem" xs={6}>
                                    <CustomInputDocument
                                        disabled={status.error || loading || status.uploading}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        name="file"
                                        sx={{ ...buttonStyle, width: '60%', mr: 'auto' }}
                                        onSelect={handleImageSelect}>
                                        <UploadIcon sx={{ ml: '1rem' }} />
                                        {!selectedPdf ? 'بارگذاری فایل ' : 'بارگذاری مجدد'}
                                    </CustomInputDocument>
                                </Grid>
                                <Grid display="flex" alignItems="center" justifyContent="space-between" item mt="1rem" xs={12}>
                                    <Link variant="body2" href={EXAMPLE_EXCEL}>
                                        {'+ دانلود فایل نمونه بارگذاری اطلاعات کارمندان'}
                                    </Link>
                                    {selectedPdf && (
                                        <Typography
                                            variant="body2"
                                            color="primary.main"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}>
                                            {`${
                                                selectedPdf.name.length > 15
                                                    ? '...' + selectedPdf.name.slice(0, 15)
                                                    : selectedPdf.name
                                            }`}
                                            {!status.doNoting && <span style={statusStyle} />}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid display="flex" alignItems="center" justifyContent="space-between" item mt="3rem" xs={12}>
                                    <Typography className="flex" variant="body2">
                                        {statusTitle}
                                    </Typography>

                                    {!status.completed && (
                                        <LoadingButton
                                            disabled={status.error || loading || response?.error?.count > 0 || !selectedPdf}
                                            type="submit"
                                            variant="contained"
                                            sx={{fontSize: '14px'}}
                                            mr="auto">
                                            {'افزودن'}
                                        </LoadingButton>
                                    )}
                                </Grid>
                                <Grid item xs={12} textAlign="right" sx={GridResponse}>
                                    {response && (
                                        <>
                                            {response.success?.count > 0 && (
                                                <Typography variant="body2">
                                                    <CheckCircleOutlineIcon sx={svgSuccess} />
                                                    {`${response.success?.count} کارمند با موفقیت شناسایی و ثبت شد `}
                                                </Typography>
                                            )}
                                            <br />
                                            {response.error && (
                                                <>
                                                    {response.error?.count > 0 && (
                                                        <Typography color="#E52929" variant="body2">
                                                            <WarningAmberIcon sx={svgError} />

                                                            {` افزودن  ${response.error?.count}  کارمند با خطا مواجه شد !`}
                                                        </Typography>
                                                    )}
                                                    {response.error?.file?.length > 0 && (
                                                        <Link
                                                            variant="body2"
                                                            href={`${process.env.REACT_APP_STORAGE_BASE_URL}${response?.error?.file}`}>
                                                            {'(دانلود فایل خطا)'}
                                                        </Link>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </>
    );
}

export default EmployeeAddGroupDialog;

const GridResponse = {
    '& .MuiTypography-root': {
        display: 'flex',
    },
};

const inputStyle = {
    direction: 'rtl !important',
    dir: 'rtl !important',
    borderRadius: '.8rem !important',
    height: '4.2rem',
    backgroundColor: ColorGrey,
    color: ` ${ColorBlack}`,
};

const buttonStyle = {
    width: '30% !important ',
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
const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
};

const svgError = { ml: '1rem', color: '#E52929' };
