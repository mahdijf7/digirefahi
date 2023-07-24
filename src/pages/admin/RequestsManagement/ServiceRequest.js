import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Grid, TableBody, TableCell, TableHead, TableRow, Typography,Button} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {Form, Formik} from "formik";

// Utils
import adminService from 'service/api/adminService';

// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';

// Assets
import theme from 'assets/theme';
import DLoadingWrapper from "../../../components/new/shared/DLoadingWrapper";
import DTableWrapper from "../../../components/new/shared/DTable/DTableWrapper";
import OrganizationService from "../../../service/api/organization.service";
import {ColorWhite} from "../../../assets/theme/color";
import DownloadIcon from "../../../assets/icone/svg/DownloadIcon";
import DownloadDisableIcon from "../../../assets/icone/svg/DownloadDisableIcon";
import UploadIcon from "../../../assets/icone/svg/UploadIcon";
import CustomInputDocument from "../../../components/Common/Form/CustomInputDocument";
import {getErrorForSnackbar} from "../../../utils/helpers";
import CustomDesInputBase from "../../../components/Common/Form/CustomDesInputBase";
import DRejectDialog from "../../../components/new/shared/DRejectDialog/Index";
import DAcceptDialog from "../../../components/new/shared/DAcceptDialog/Index";
import DSnackbar from "../../../components/new/shared/DSnackbar";
const CreditRequest = ({onClose, requestId, onSave,onRefresh}) => {
    const addFormInitialValues = {
        description: '',
        file: ""

    };
    const [loading, setLoading] = useState({save: false});
    const [request, setRequest] = useState({});
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [values, setValues] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [showAcceptDialog, setShowAcceptDialog] = useState(false);
    const [status, setStatus] = useState({
        doNoting: true,
        uploading: false,
        uploaded: false,
        completed: false,
        error: false,
    });
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const tableColumns = [
        {title: 'نام سازمان'},
        {title: 'شناسه درخواست'},
        {title: 'مبلغ (تومان)'},
        {title: 'تاریخ ثبت درخواست'},
        {title: 'وضعیت'},

    ];
    const tableFileColumns = [
        {title: 'توضیحات'},
        {title: 'فایل پیوست سازمان'},

    ];

    const {t} = useTranslation();
    const {companyId} = useParams();
    const validationSchema = Yup.object({});


    const openRejectDialog = (group) => {
        setShowRejectDialog(true);
    };
    const closeRejectDialog = () => {
        setShowRejectDialog(false);
    };

    const openAcceptDialog = (group) => {
        setShowAcceptDialog(true);
    };
    const closeAcceptDialog = () => {
        setShowAcceptDialog(false);
    };

    const changeStatusRequest = async (status) => {
        console.log("values",values)
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('status', status);
        if (values?.description) formData.append('description', values.description);
        if (values?.file) formData.append('archive_file', values.file);
        await adminService.changeStatusServiceRequest(formData,requestId)
            .then((res) => {
                console.log("res", res)
                closeAcceptDialog();
                closeRejectDialog();
                onClose();
                onRefresh();
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'درخواست با موفقیت تغییر وضعیت داد.',
                        type: 'success',
                    },
                });
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
            });

    };

    const rejectRequest = () => {
        setShowRejectDialog(false);
    };
    const handleImageSelect = (file) => {
        setSelectedPdf(file);
        setStatus({
            uploading: false,
            doNoting: false,
            completed: false,
            uploaded: true,
        });

        console.log(file);
    };
    const getRequest = async () => {
        if (loading.refresh) return
        setLoading({
            ...loading,
            refresh: true,
        });
        await adminService.getServiceRequest(requestId)
            .then((res) => {
                console.log("res", res)
                setRequest(res.data.data)
            })
            .catch((err) => {
            });
        setLoading({
            ...loading,
            initial: false,
            refresh: false,
        });
    };

    useEffect(() => {
        getRequest();
    }, []);



    const handleSubmit = async (values) => {
        console.log("handleSubmit",values)
        // if (loading.save) return;
        // setLoading({ save: true });
        // const formData = new FormData();
        // if (values?.price) formData.append('price', values.price);
        // if (values?.description) formData.append('description', values.description);
        // if (values?.file) formData.append('file', values.file);
        //
        // await OrganizationService
        //     .createCreditRequest(formData)
        //     .then((res) => {
        //         console.log("createCreditRequest",res.data)
        //         setSnackBarData({
        //             show: true,
        //             data: {
        //                 text: 'درخواست با موفقیت ایجاد شد.',
        //                 type: 'success',
        //             },
        //         });
        //         setSelectedPdf('')
        //     })
        //     .catch((err) => {
        //         const errorMsg = err?.response?.data?.data && getErrorForSnackbar(err.response.data.data);
        //         errorMsg &&
        //         setSnackBarData({
        //             show: true,
        //             data: {
        //                 text: errorMsg,
        //                 type: 'error',
        //             },
        //         });
        //     });
        // setLoading({ save: false });
    }
    return (
        <DDialogWrapper open onClose={onClose}>
            {showRejectDialog && (
                <DRejectDialog loading={loading.delete} title="درخواست"  onClose={closeRejectDialog} onReject={()=>changeStatusRequest("REJECT")}/>
            )}

            {showAcceptDialog && (
                <DAcceptDialog loading={loading.delete} title="درخواست"  onClose={closeAcceptDialog} onAccept={()=>changeStatusRequest("ACCEPT")}/>
            )}
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({...snackBarData, show: false})}
            />
            <DDialogHeader title={"وضعیت درخواست افزایش اعتبار"} onClose={onClose}/>
            <Box display="grid" mt="30px" mb="0px"
                 sx={{borderTop: '1px solid #EEEEEE', paddingTop: '40px'}}>


                <DLoadingWrapper loading={loading.initial}>
                    <Grid container spacing={'2rem'} className={loading.refresh && 'box--isLoading'}>
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
                                    <TableRow style={{backgroundColor: '#ffffff',}}>
                                        <TableCell style={tableCellStyle}>{request.company && request.company.name}</TableCell>
                                        <TableCell style={tableCellStyle}>{request.id}</TableCell>
                                        <TableCell style={tableCellStyle}>{request.price}</TableCell>
                                        <TableCell
                                            style={tableCellStyle}>{request.created_at ? `${new Date(request.created_at).toLocaleTimeString('fa-IR')} - ${new Date(request.created_at).toLocaleDateString('fa-IR')}` : "-----"}   </TableCell>
                                        <TableCell style={tableCellStyle}>{request.status === 'INIT' ?
                                            <span>بررسی نشده</span> : request.status === 'ACCEPT' ?
                                                <span style={acceptStyle}>تایید شده</span> :
                                                <span style={rejectStyle}>رد شده</span> || '---'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </DTableWrapper>
                        </Grid>


                        <Grid item xs={12}>
                            <DTableWrapper loading={loading}>
                                <TableHead>
                                    <TableRow>
                                        {tableFileColumns.map((column, index) => {
                                            return (
                                                <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                                    {column.title}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow style={{backgroundColor: '#ffffff',}}>
                                        <TableCell style={tableCellStyle}>{request.company_description}</TableCell>
                                        <TableCell style={tableCellStyle}>     {<Button variant='contained' style={request.file ? downloadBtnStyle : downloadDisableBtnStyle} disabled={!request.file}
                                                                                        startIcon={request.file ? <DownloadIcon/> : <DownloadDisableIcon/>}>
                                            <a href={request.file} style={request.file ? downloadLinkStyle: downloadLinkDisableStyle} target="_blank" download>
                                                دانلود فایل
                                            </a>
                                        </Button>}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </DTableWrapper>
                        </Grid>
                    </Grid>
                </DLoadingWrapper>

            </Box>
            <Box display="grid" mt="30px" mb="0px"
                 sx={{borderTop: '1px solid #EEEEEE', paddingTop: '40px'}}>



                        <Grid container spacing={2} >
                            <Grid item xs={12}>
                                <Formik
                                    initialValues={addFormInitialValues}
                                    onSubmit={handleSubmit}>
                                    {({errors, touched, setFieldValue, values}) => (
                                    <Form>
                                <Grid  rowSpacing="14px" container>
                                    {request.status === "INIT" ? <Box className="flex" justifyContent="space-between">

                                            <Typography variant="h4" style={uploadTitle}>بارگذاری فایل ضمیمه دیجی
                                                رفاهی:</Typography>

                                        <CustomInputDocument
                                            // disabled={status.error || loading || status.uploading}
                                            accept="file_extension|audio/*|video/*|image/*|media_type"
                                            name="file"
                                            sx={{...uploadBtnStyle, width: '100%'}}
                                            onSelect={handleImageSelect}>
                                            <span style={{marginLeft: '1rem', marginTop: 5}}><UploadIcon/></span>
                                            {!selectedPdf ? ' بارگذاری فایل  ' : ' بارگذاری مجدد '}
                                        </CustomInputDocument>
                                    </Box> :

                                        <Box className="flex" justifyContent="space-between">


                                            <Typography variant="h4" style={uploadTitle}>فایل ضمیمه دیجی رفاهی را مشاهده
                                                نمایید.
                                            </Typography>

                                            <Button variant='contained' style={request.archive_file ? downloadBtnStyle : downloadDisableBtnStyle} disabled={!request.file}
                                                    startIcon={request.archive_file ? <DownloadIcon/> : <DownloadDisableIcon/>}>
                                                <a href={request.archive_file} style={request.archive_file ? downloadLinkStyle: downloadLinkDisableStyle} target="_blank" download>
                                                    دانلود فایل
                                                </a>
                                            </Button>
                                        </Box>
                                    }
                                    {request.status==="INIT" ?
                                        <Grid item xs={12} md={12}>
                                        <CustomDesInputBase
                                            height="5.2rem"
                                            borderRadius=".8rem"
                                            border
                                            showlabel="true"
                                            name="description"
                                            // title={"توضیحات"}
                                            placeholder={"توضیحات را وارد کنید"}
                                            weight
                                            hasDefaultStyle
                                        />
                                    </Grid>
                                    :
                                        request.description ?
                                     <Box display="grid" mt="30px" mb="0px"
                                                                     sx={{
                                                                         border: '1px dashed #D9D9D9',
                                                                         padding: '20px',
                                                                         width: "93%",
                                                                         borderRadius:6,
                                                                         textAlign:"right"
                                                                     }}>{request.description}</Box>
                                            :
                                            <Box display="grid" >
                                            </Box>

                                    }


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
                                            onClick={()=>onClose()}
                                            variant="contained"
                                            sx={buttonStyle}>
                                            بستن
                                        </LoadingButton>

                                        {(request.status==="INIT" || request.status==="REJECT") && <LoadingButton
                                            loading={loading.save}
                                            onClick={() => {
                                                openAcceptDialog()
                                                setValues(values)
                                            }}
                                            variant="contained"
                                            sx={uploadBtnStyle}>
                                            تایید درخواست
                                        </LoadingButton>}


                                        {/*{request.status==="REJECT" && <LoadingButton*/}
                                        {/*    loading={loading.save}*/}
                                        {/*    onClick={() => openAcceptDialog()}*/}
                                        {/*    variant="contained"*/}
                                        {/*    sx={uploadBtnStyle}>*/}
                                        {/*    بازنگری درخواست*/}
                                        {/*</LoadingButton>}*/}

                                        {(request.status==="INIT" || request.status==="ACCEPT") && <LoadingButton
                                            loading={loading.save}
                                            onClick={() => {
                                                openRejectDialog()
                                                setValues(values)
                                            }}
                                            variant="contained"
                                            sx={yellowButtonStyle}>
                                            لغو درخواست
                                        </LoadingButton>}
                                    </Grid>
                                </Grid>
                                    </Form>
                                    )}
                                </Formik>
                            </Grid>
                        </Grid>
            </Box>



        </DDialogWrapper>
    );
};

const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

const buttonStyle = {
    width: '15% !important ',
    // minWidth: 160,
    height: '3.3rem',
    borderRaduis: '10px',
    backgroundColor: 'common.white',
    color: 'primary.main',
    fontSize: '1.2rem',
    boxShadow: 'none !important',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: 'common.white',
        color: 'primary.main',
    },
    border:"1px solid rgba(8, 119, 189, 1)",
    '&:disabled': {
        bgcolor: '#B4B4B4',
        color: ColorWhite,
    },
};
const yellowButtonStyle = {
    width: '15% !important ',
    height: '3.3rem',
    borderRaduis: '10px',
    backgroundColor: 'rgba(247, 201, 6, 1)',
    color: '#000',
    fontSize: '1.2rem',
    boxShadow: 'none !important',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(247, 201, 6, 1)',
        color: '#000',
    },
    '&:disabled': {
        bgcolor: '#B4B4B4',
        color: ColorWhite,
    },
};
const acceptStyle = {
    color: "rgba(8, 189, 113, 1)"
};

const rejectStyle = {
    color: "rgba(229, 41, 41, 1)"

}
const uploadTitle = {
    minWidth: 280,
    textAlign:"right"
};

const downloadBtnStyle = {
    padding: "4px 45px",
    backgroundColor:"#fff",
    border:"1px solid rgba(8, 119, 189, 1)",
    borderRadius: "5px",
    fontSize: 12,
    color: "#0877BD",
    textDecoration:"none",
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin:"0 20px",
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor:"#fff",
        color: "#0877BD",
        textDecoration:"none"
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor:"#fff",
        color: "#0877BD",
        textDecoration:"none",
        marginRight:14
    },
};
const uploadBtnStyle = {
    padding: "4px 35px",
    backgroundColor:"rgba(8, 119, 189, 1)",
    border:"1px solid rgba(8, 119, 189, 1)",
    borderRadius:"5px",
    fontSize: 12,
    color: "#fff",
    textDecoration:"none",
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin:"0 5px",
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor:"rgba(8, 119, 189, 1)",
        color: "#fff",
        textDecoration:"none"
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor:"rgba(8, 119, 189, 1)",
        color: "#fff",
        textDecoration:"none",
    },
};
const downloadDisableBtnStyle = {
    backgroundColor: '#F2F2F7',
    color: "rgba(180, 180, 180, 1)",
    padding: "4px 45px",
    border:"1px solid rgba(209, 209, 214, 1)",
    borderRadius: "5px",
    fontSize: 12,
    textDecoration:"none",
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin:"0 20px",
    boxShadow: 'none !important',
};

const downloadLinkStyle = {
    boxShadow: 'none !important',
    textDecoration:"none",
    marginRight:14,
    color: "#0877BD",

};
const downloadLinkDisableStyle = {
    boxShadow: 'none !important',
    textDecoration:"none",
    marginRight:14,
    color: "rgba(180, 180, 180, 1)",

};
export default CreditRequest;
