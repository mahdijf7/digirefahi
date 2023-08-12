import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Grid, TableBody, TableCell, TableHead, TableRow, Typography,Button} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';

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
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "../../../assets/icone/svg/DownloadIcon";
import DownloadDisableIcon from "../../../assets/icone/svg/DownloadDisableIcon";
const CreditRequest = ({onClose, requestId, onSave}) => {
    const [loading, setLoading] = useState({save: false});
    const [request, setRequest] = useState({});
    const [selectedEmployees, setSelectedEmployees] = useState([]);

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

    const createOrganization = async (values) => {
        if (loading.save) return;
        setLoading({save: true});

        const queryString = new URLSearchParams();
        queryString.append('company_id', companyId);
        if (values.name) queryString.append('name', values.name);
        let filteredEmployeesIndex = 0;
        Object.keys(selectedEmployees).forEach((employeeId) => {
            if (selectedEmployees[employeeId]) {
                queryString.append(`employee_ides[${filteredEmployeesIndex}]`, employeeId);
                filteredEmployeesIndex++;
            }
        });
        await adminService
            .saveGroup(queryString.toString())
            .then((res) => {
                setLoading({save: false});
                onSave();
            })
            .catch((err) => {
                console.log('error occured!');
            });
    };


    const getRequest = async () => {
        if (loading.refresh) return
        setLoading({
            ...loading,
            refresh: true,
        });
        await OrganizationService.getRequest(requestId)
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

    return (
        <DDialogWrapper open onClose={onClose} sx={{overflowX:"hidden"}}>
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
                                        <TableCell style={{...tableCellStyle,width:"60%"}}>{request.company_description}</TableCell>
                                        <TableCell style={tableCellStyle}>     {<Button variant='contained' style={request.file ? downloadBtnStyle : downloadDisableBtnStyle} disabled={!request.file}
                                                                                        startIcon={request.file ? <DownloadIcon/> : <DownloadDisableIcon/>}>
                                            <a href={`${process.env.REACT_APP_STORAGE_URL}/${request.file}`} style={request.file ? downloadLinkStyle: downloadLinkDisableStyle} target="_blank" download>
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


                                <Grid  rowSpacing="14px" container>
                                    <Box  className="flex"  justifyContent="space-between">
                                    <Typography variant="h4" style={uploadTitle}>فایل ضمیمه را مشاهده نمایید:</Typography>
                                        {<Button variant='contained' style={request.archive_file ? downloadBtnStyle : downloadDisableBtnStyle} disabled={!request.archive_file}
                                                 startIcon={request.archive_file ? <DownloadIcon/> : <DownloadDisableIcon/>}>
                                            <a href={`${process.env.REACT_APP_STORAGE_URL}/${request.archive_file}`} style={request.archive_file ? downloadLinkStyle: downloadLinkDisableStyle} target="_blank" download>
                                                دانلود فایل
                                            </a>
                                        </Button>}
                                    </Box>
                                    {request.description && <Box display="grid" mt="30px" mb="0px"
                                          sx={{
                                              border: '1px dashed #D9D9D9',
                                              padding: '20px',
                                              width: "93%",
                                              borderRadius:6,
                                              textAlign:"right"
                                          }}>{request.description}</Box>}


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

                                    </Grid>
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
    borderRadius: '10px',
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
    borderRadius: '10px',
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
    minWidth: 80,
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
