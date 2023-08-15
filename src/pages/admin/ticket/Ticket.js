import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {Box, Button, Grid, Typography} from '@mui/material';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import DBox from 'components/new/shared/DBox';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';

// Assets
import {ColorWhite} from "../../../assets/theme/color";
import PenIcon from "../../../assets/icone/svg/PenIcon";
import SenderIcon from "../../../assets/icone/svg/SenderIcon";
import {Form, Formik} from "formik";
import CustomInputBase from "../../../components/Common/Form/CustomInputBase";
import CustomInputFile from "../../../components/Common/Form/CustomInputFile";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import {getErrorForSnackbar} from "../../../utils/helpers";
import DSnackbar from "../../../components/new/shared/DSnackbar";
import ReceiverIcon from "../../../assets/icone/svg/ReceiverIcon";
import DownloadIcon from "../../../assets/icone/svg/DownloadIcon";
import adminService from "../../../service/api/adminService";
const Ticket = () => {
    const addFormInitialValues = {

        body: '',
        file: ""

    };
    const navigate = useNavigate();
    const location = useLocation();
    const {ticketId} = useParams();
    const [loading, setLoading] = useState({initial: true});
    const [expanded, setExpanded] = useState(false);
    const [ticket, setTicket] = useState({});
    const [messages, setMessages] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
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
    const [breadCrumbLinks, setBreadCrumbLinks] = useState([
        {path: '/app/admin/', title: 'پیشخوان'},
        {path: '/app/admin/management-tickets/', title: 'پشتیبانی'},
        {path: `/app/admin/management-tickets/${ticketId}`, title: ` جزییات تیکت ${ticketId}#`},
    ]);
    const Validation_Schema = Yup.object({
        body: Yup.string('').required("مقدار این فیلد نمیتواند خالی باشد"),
    });
    const handleSubmit = async (values, {resetForm}) => {
        if (loading.save) return;
        setLoading({save: true});
        const formData = new FormData();
        if (values?.body) formData.append('body', values.body);
        if (values?.file) formData.append('file', values.file);
        await adminService
            .sendMessage(formData,ticket.id)
            .then((res) => {

                setSnackBarData({
                    show: true,
                    data: {
                        text: 'پیام با موفقیت ارسال شد.',
                        type: 'success',
                    },
                });
                resetForm({values: ''});
                setSelectedPdf('');
                getTicket();

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
        setLoading({save: false});
    }
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

    const getTicket=()=>{
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await adminService.get(`tickets/${ticketId}`, {signal})
                .then((res) => {
                    setTicket(res.data.data.ticket);
                    setMessages(res.data.data.messages);
                    // setBreadCrumbLinks([...breadCrumbLinks, { title: res.data.data.name }]);
                })
                .catch((err) => {
                    console.log(5555555);
                });

            setLoading({
                ...loading,
                initial: false,
                filter: false,
                page: false,
            });
        })();

        return () => controller.abort();
    }


    useEffect(() => {
        getTicket()
    }, []);

    return (
        <DashboardCard pt="2rem">
            <DLoadingWrapper loading={loading.initial}>
                <Breadcrumb links={breadCrumbLinks}/>

                <Grid container mt="4px" spacing="20px">
                    <Grid item xs={4.5}>
                        <DBox sx={{p: '20px 28px'}}>


                            <Box
                                sx={{
                                    borderBottom: '1px dashed #EEEEEE',
                                    p: '16px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "space-between",
                                    gap: '8px',
                                }}>
                                <span>شماره تیکت{' '}</span>
                                <span>
                                       {`#${ticket.id}`}
                                </span>

                            </Box>
                            <Box
                                sx={{
                                    borderBottom: '1px dashed #EEEEEE',
                                    p: '16px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "space-between",
                                    gap: '8px',
                                }}>


                                <span>وضعیت{' '}</span>
                                <span>{ticket.status === 'OPEN' ? "باز" : "بسته شده"}</span>
                            </Box>
                            <Box
                                sx={{
                                    borderBottom: '1px dashed #EEEEEE',
                                    p: '16px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "space-between",
                                    gap: '8px',
                                }}>


                                <span>درخواست دهنده{' '}</span>
                                <span color="text.main" component="span" sx={{fontSize: '14px'}}>
                                        {ticket.owner}
                                    </span>

                            </Box>
                            <Box
                                sx={{
                                    borderBottom: '1px dashed #EEEEEE',
                                    p: '16px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "space-between",
                                    gap: '8px',
                                }}>


                                <span>{' '} ارسال به</span>
                                <span>{ticket.assign}</span>

                            </Box>
                            <Box
                                sx={{
                                    borderBottom: '1px dashed #EEEEEE',
                                    p: '16px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "space-between",
                                    gap: '8px',
                                }}>

                                <span>تاریخ ایجاد{' '}</span>
                                <span>
                                {ticket.created_at
                                && `${new Date(ticket.created_at
                                ).toLocaleTimeString('fa-IR')} - ${new Date(ticket.created_at
                                ).toLocaleDateString('fa-IR')}`}
                                    </span>


                            </Box>
                            <Box
                                sx={{
                                    // borderBottom: '1px dashed #EEEEEE',
                                    p: '16px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "space-between",
                                    gap: '8px',
                                }}>


                                <span> آخرین بروزرسانی{' '}</span>

                                <span>  {ticket.update_at
                                    ? `${new Date(ticket.update_at
                                    ).toLocaleTimeString('fa-IR')} - ${new Date(ticket.update_at
                                    ).toLocaleDateString('fa-IR')}` : `${new Date(ticket.created_at).toLocaleTimeString('fa-IR')} - ${new Date(ticket.created_at).toLocaleDateString('fa-IR')}`}</span>


                            </Box>

                        </DBox>
                    </Grid>
                    <Grid item xs={7.5}>
                        <DBox sx={{p: '20px 0'}}>
                            <Box
                                sx={{
                                    borderBottom: '1px solid #EEEEEE',
                                    p: '16px 28px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent:'space-between',
                                    gap: '8px',
                                }}>
                                <p style={{
                                    fontWeight: 600,
                                    fontSize: 16
                                }}>عنوان: {`${ticket.title}`} </p>
                                {ticket.status==="CLOSE" &&
                                <LoadingButton
                                    disabled={true}
                                    type="submit"
                                    variant="contained"
                                    sx={{fontSize: '14px', boxShadow: 'none',...whiteButtonStyle}}>
                                    بسته شده
                                </LoadingButton>


                                }
                            </Box>

                            {ticket.status==="CLOSE" && <Box style={infoBoxStyle}>

                                <Typography sx={{fontSize: '12px'}}>
                                    این تیکت بسته شده است. جهت بازگشایی آن، باید پاسخی ارسال کنید.
                                </Typography>
                            </Box>}

                            <Box
                                sx={{
                                    p: '16px 28px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}>
                                <Accordion sx={!expanded ? accordionStyle:accordionExpandedStyle}
                                expanded={expanded}
                                           onChange={(e,expanded) => {
                                               setExpanded(expanded);
                                           }}
                                >
                                    <AccordionSummary
                                        sx={ !expanded ? accordionSummaryStyle: accordionSummaryExpandedStyle}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span style={{marginLeft:5}}><PenIcon /></span><span>پاسخ</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid item xs={12}>
                                            <Formik
                                                initialValues={addFormInitialValues}
                                                validationSchema={Validation_Schema}
                                                onSubmit={handleSubmit}>

                                                <Form>
                                                    <Grid columnSpacing={8} rowSpacing="14px" container>

                                                        <Grid item xs={12} md={12}>
                                                            <CustomInputBase
                                                                height="9.2rem"
                                                                borderRadius=".8rem"
                                                                showlabel="true"
                                                                name="body"
                                                                title={"متن"}
                                                                placeholder={"متن پیام را اینجا وارد نمایید ..."}
                                                                weight
                                                                multiline
                                                                rows={4}
                                                                style={inputStyle}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>

                                                            <CustomInputFile
                                                                height="9.2rem"
                                                                borderRadius=".8rem"
                                                                bg={"#fff"}
                                                                showlabel="true"
                                                                title={"ضمیمه"}
                                                                accept="file_extension|audio/*|video/*|image/*|media_type"
                                                                name="file"
                                                                weight
                                                                placeholder={"فایلی انتخاب نشده است."}
                                                                sx={{...blueBtnStyle, width: '20%', textAlign: "right"}}
                                                                onSelect={handleImageSelect}
                                                                fileName={selectedPdf ? selectedPdf.name : "فایلی انتخاب نشده است."}
                                                            >

                                                                انتخاب فایل
                                                            </CustomInputFile>
                                                            <p style={textHelper}>پسوند های مجاز: .zip, .jpg, .jpeg, .png, .rar, .txt, .pdf
                                                                (Max file size: 10MB)</p>

                                                        </Grid>

                                                        {/*</Grid>*/}
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'flex-end',
                                                                gap: '10px',
                                                                marginTop: '20px',
                                                            }}>

                                                            <Button
                                                                disabled={loading.save}
                                                                variant="outlined"
                                                                sx={{fontSize: '14px', boxShadow: 'none',...whiteButtonStyle}}
                                                                onClick={()=> {
                                                                    setExpanded(false)
                                                                    // resetForm({values: ''})
                                                                }}
                                                               >
                                                                انصراف
                                                            </Button>
                                                            <LoadingButton
                                                                loading={loading.save}
                                                                type="submit"
                                                                variant="contained"
                                                                sx={{fontSize: '14px', boxShadow: 'none',...yellowButtonStyle}}>
                                                                ارسال
                                                            </LoadingButton>
                                                        </Grid>
                                                    </Grid>
                                                </Form>
                                            </Formik>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>

                            </Box>

                            {messages.map(item=>
                               item.sender ?
                                   <Box
                                    sx={{
                                        p: '16px 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection:'column',
                                        gap: '8px',
                                        ...senderContainer
                                    }}>



                                       <Box
                                           sx={{
                                               // borderBottom: '1px dashed rgba(209, 209, 214, 1)',
                                               p: '8px 20px',
                                               display: 'flex',
                                               alignItems: 'center',
                                               justifyContent: "space-between",
                                               gap: '8px',
                                               width:"100%",
                                               color:"#000",
                                               fontSize:"12px"


                                           }}>
                                           <p style={infoSender}><span  style={{marginLeft:15}}><SenderIcon/></span>
                                          {item.owner}</p>
                                           <span>
                                       {item.created_at
                                       && `${new Date(item.created_at
                                       ).toLocaleTimeString('fa-IR')} - ${new Date(item.created_at
                                       ).toLocaleDateString('fa-IR')}`}
                                </span>

                                       </Box>

                                       <Box
                                           sx={{
                                               borderTop: '1px dashed rgba(209, 209, 214, 1)',
                                               p: '8px 20px',
                                               display: 'flex',
                                               alignItems: 'center',
                                               justifyContent: "space-between",
                                               gap: '8px',
                                               width:"100%",
                                               color:"#000",
                                               fontSize:"13px"
                                           }}>
                                           <span>{item.body}</span>

                                       </Box>
                                       {item.file && <Box
                                           sx={{
                                               p: '8px 20px',
                                               borderTop: '1px dashed rgba(209, 209, 214, 1)',
                                               display: 'flex',
                                               alignItems: 'flex-start',
                                               flexDirection:"column",
                                               justifyContent: "space-between",
                                               gap: '8px',
                                               width: "100%",
                                               color: "#000",
                                               fontSize: "10px"
                                           }}>
                                           <p style={{fontWeight: 600}}>ضمیمه ها (1)</p>
                                           <a href={`${process.env.REACT_APP_STORAGE_URL}/${item.file}`} style={downloadLinkStyle} target="_blank" download>
                                               <span style={{marginLeft:5}}><DownloadIcon /></span> {item.file}
                                           </a>

                                       </Box>}

                                </Box>
                                   :
                                   <Box
                                       sx={{
                                           p: '16px 0',
                                           display: 'flex',
                                           alignItems: 'center',
                                           flexDirection:'column',
                                           gap: '8px',
                                           ...receiverContainer
                                       }}>



                                       <Box
                                           sx={{
                                               // borderBottom: '1px dashed rgba(209, 209, 214, 1)',
                                               p: '8px 20px',
                                               display: 'flex',
                                               alignItems: 'center',
                                               justifyContent: "space-between",
                                               gap: '8px',
                                               width:"100%",
                                               color:"#000",
                                               fontSize:"12px"


                                           }}>
                                           <p style={infoSender}><span  style={{marginLeft:15}}><ReceiverIcon /></span>
                                               {item.owner}</p>
                                           <span>
                                       {item.created_at
                                       && `${new Date(item.created_at
                                       ).toLocaleTimeString('fa-IR')} - ${new Date(item.created_at
                                       ).toLocaleDateString('fa-IR')}`}
                                </span>

                                       </Box>

                                       <Box
                                           sx={{
                                               borderTop: '1px dashed rgba(209, 209, 214, 1)',
                                               p: '8px 20px',
                                               display: 'flex',
                                               alignItems: 'center',
                                               justifyContent: "space-between",
                                               gap: '8px',
                                               width:"100%",
                                               color:"#000",
                                               fontSize:"13px"
                                           }}>
                                           <span>{item.body}</span>

                                       </Box>
                                       {item.file && <Box
                                           sx={{
                                               borderTop: '1px dashed rgba(209, 209, 214, 1)',
                                               p: '8px 20px',
                                               display: 'flex',
                                               alignItems: 'flex-start',
                                               flexDirection:"column",
                                               justifyContent: "space-between",
                                               gap: '8px',
                                               width: "100%",
                                               color: "#000",
                                               fontSize: "10px"
                                           }}>
                                           <p style={{fontWeight: 600}}>ضمیمه ها (1)</p>

                                           <a href={`${process.env.REACT_APP_STORAGE_URL}/${item.file}`} style={downloadLinkStyle} target="_blank" download>
                                               <span style={{marginLeft:5}}><DownloadIcon /></span> {item.file}
                                           </a>
                                       </Box>}

                                   </Box>
                            )
                            }
                            <Link style={{ textDecoration: 'none',width: '100%',display: 'grid' }} to={`/app/admin/management-tickets`}>
                            <Box
                                sx={{
                                    p: '6px 0',
                                    display: 'flex',
                                    justifyContent: 'end',
                                }}>
                            <LoadingButton
                                loading={loading.save}
                                // onClick={()=>onClose()}
                                variant="contained"
                                sx={downloadBtnStyle}>
                                بازگشت به لیست تیکت ها
                            </LoadingButton>
                            </Box>
                            </Link>
                        </DBox>

                    </Grid>
                </Grid>
                <DSnackbar
                    open={snackBarData.show}
                    info={snackBarData.data}
                    onClose={() => setSnackBarData({...snackBarData, show: false})}
                />
            </DLoadingWrapper>
        </DashboardCard>
    );
};
const downloadBtnStyle = {
    padding: "7px 10px",
    backgroundColor:"#fff",
    width:"22%",
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
const textHelper = {
    color: "#000",
    textAlign: 'right',
    fontWeight: 500,
    fontSize: '10px',
    marginTop: 5

};
const downloadLinkStyle = {
    boxShadow: 'none !important',
    textDecoration:"none",
    color: "rgba(8, 119, 189, 1)",

};
const senderContainer = {
    background: "rgba(242, 242, 247, 0.6)",
    border: "1px solid #D1D1D6",
    borderRight: "7px solid #F7C906",
    borderRadius: "5px",
    margin:"12px auto",
    width:"93%",
   "& span":{ color:"#000",}

};

const receiverContainer = {
    background: "#fff",
    border: "1px solid #D1D1D6",
    borderLeft: "7px solid #0877BD",
    borderRadius: "5px",
    margin:"12px auto",
    width:"93%",
    "& span":{ color:"#000",}

};
const infoBoxStyle = {
    borderRadius: '5px',
    backgroundColor: '#EDFBFF',
    color: 'rgba(8, 119, 189, 1)',
    border:"0.4px solid #0877BD",
    fontSize: '1.2rem',
    padding:"10px 25px",
    margin:"20px auto",
    width:"94%"
};
const infoSender = {
 display:"flex",
    alignItems:'center',
    fontWeight:600,
    "& svg":{
     marginLeft:8
    }
};
const accordionStyle = {
    borderRadius: '5px',
    backgroundColor: 'rgba(247, 201, 6, 1)',
    color: 'rgba(0, 0, 0, 1)',
    boxShadow:"none",
};
const accordionExpandedStyle = {
    borderRadius: '5px',
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 1)',
border:"1.2px solid #F7C906",
    boxShadow:"none",

};

const accordionSummaryExpandedStyle = {

borderBottom:"1.2px solid #F7C906",
    boxShadow:"none",
    minHeight:"50px !important",
    lineHeight:"19px",
    '& .css-o4b71y-MuiAccordionSummary-content.Mui-expanded':{
        margin:"9px 0"
    },
    "& .svg":{
        marginLeft:5
    }
};
const accordionSummaryStyle = {
    boxShadow:"none",
    lineHeight:"19px",
    "& .svg":{
        marginLeft:5
    }

};
const inputStyle = {
    backgroundColor: "#fff",
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const blueBtnStyle = {
    padding: "4px 15px",
    backgroundColor: "rgba(8, 119, 189, 1)",
    border: "1px solid rgba(8, 119, 189, 1)",
    fontSize: "14px",
    color: "#fff",
    textDecoration: "none",
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin: "0 0px",
    boxShadow: 'none',
    height: "4.2rem",
    borderRadius: "0 .8rem .8rem 0",
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: "rgba(8, 119, 189, 1)",
        color: "#fff",
        textDecoration: "none"
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor: "rgba(8, 119, 189, 1)",
        color: "#fff",
        textDecoration: "none",
    },
    '&:disabled': {
        bgcolor: '#B4B4B4',
        color: ColorWhite,
    },
}
const yellowButtonStyle = {
    width: '15% !important ',
    height: '3.3rem',
    borderRadius: '10px',
    backgroundColor: 'rgba(247, 201, 6, 1)',
    color: '#000',
    fontWeight:600,
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
const whiteButtonStyle = {
    width: '15% !important ',
    height: '3.3rem',
    borderRadius: '10px',
    backgroundColor: '#fff',
    color: '#000',
    border:"1px solid rgba(247, 201, 6, 1)",
    fontWeight:600,
    fontSize: '1.2rem',
    boxShadow: 'none !important',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: '#fff',
        color: '#000',
    },
    '&:disabled': {
        bgcolor: '#fff',
        border:"1px solid #B4B4B4",
        color: "#B4B4B4",
        fontWeight:500,
    },
};

export default Ticket;
