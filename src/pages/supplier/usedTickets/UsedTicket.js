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
import SupplierService from "../../../service/api/supplier.service";
import UseIcon from "../../../assets/icone/svg/UseIcon";
const UsedTicket = ({onClose, requestId, onSave}) => {
    const [loading, setLoading] = useState({save: false});
    const [ticket, setTicket] = useState({});
    const tableColumns_1 = [
        {title: 'خریدار'},
        {title: 'کد ملی'},
        {title: 'نام سازمان'},
        {title: 'تاریخ ثبت'},

    ];
    const tableColumns_2 = [
        {title: 'خدمت'},
        {title: 'مبلغ خدمت'},
        {title: 'تامین کننده'},
        {title: 'استان خدمت'},

    ];
    const tableColumns_3 = [
        {title: 'کد رهگیری'},
        {title: 'بارکد'},

    ];
    const tableFileColumns = [
        {title: 'توضیحات'},
        {title: 'فایل پیوست سازمان'},

    ];
    const {t} = useTranslation();
    const {companyId} = useParams();
    const validationSchema = Yup.object({});


    const getTicket = async () => {
        if (loading.refresh) return
        setLoading({
            ...loading,
            refresh: true,
        });
        // setTicket( {id:2,title:"تور قشم",buyer:"علی حمیدی",code:"001235678",name:"سامانه جامع ساعی",price:"100000",created_at:"",ostan:"تهران",supplier:"علی بابا",traceCode:"565656RTG",barCode:"565656RTG"})

        SupplierService.get(`orders/${requestId}`)
            .then((res) => {
                setTicket(res.data.data);
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
        getTicket();
    }, []);

    return (
        <DDialogWrapper open onClose={onClose} sx={{overflowX:"hidden"}}>
            <DDialogHeader title={"جزئیات بلیط استفاده شده"} onClose={onClose}/>
            <Box display="grid" mt="30px" mb="0px"
                 sx={{borderTop: '1px solid #EEEEEE', paddingTop: '40px'}}>


                <DLoadingWrapper loading={loading.initial}>
                    <Grid container spacing={'2rem'} className={loading.refresh && 'box--isLoading'}>
                        <Grid item xs={12}>
                            <DTableWrapper loading={loading}>
                                <TableHead>
                                    <TableRow>
                                        {tableColumns_1.map((column, index) => {
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
                                        <TableCell style={tableCellStyle}>{ticket.employee && ticket.employee.full_name}</TableCell>
                                        <TableCell style={tableCellStyle}>{ticket.employee && ticket.employee.national_code}</TableCell>
                                        <TableCell style={tableCellStyle}>{ticket.company_name}</TableCell>
                                        <TableCell style={tableCellStyle}>{ticket.created_at ? `${new Date(ticket.created_at).toLocaleTimeString('fa-IR')} - ${new Date(ticket.created_at).toLocaleDateString('fa-IR')}` : "-----"}   </TableCell>
                                    </TableRow>
                                </TableBody>
                            </DTableWrapper>
                        </Grid>
                        <Grid item xs={12}>
                            <DTableWrapper loading={loading}>
                                <TableHead>
                                    <TableRow>
                                        {tableColumns_2.map((column, index) => {
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
                                        <TableCell style={tableCellStyle}>{ticket.service && ticket.service.name}</TableCell>
                                        <TableCell style={tableCellStyle}>{ticket.price}</TableCell>
                                        <TableCell style={tableCellStyle}>{ticket.service && ticket.service.supplier}</TableCell>
                                        <TableCell style={tableCellStyle}>{(ticket.service && ticket.service.province.length>0) ?ticket.service.province[0] : '--'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </DTableWrapper>
                        </Grid>
                        <Grid item xs={12}>
                            <DTableWrapper loading={loading}>
                                <TableHead>
                                    <TableRow>
                                        {tableColumns_3.map((column, index) => {
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
                                        <TableCell style={{...tableCellStyle,width:"50%"}}>{ticket.traceCode}</TableCell>
                                        <TableCell style={{...tableCellStyle,width:"50%"}}>{ticket.barCode}</TableCell>

                                    </TableRow>
                                </TableBody>

                                <TableBody>
                                    {ticket.codes && ticket.codes.map(item => (
                                        <TableRow style={{backgroundColor: '#ffffff',}}>

                                            <TableCell
                                                style={tableCellStyle}>{item.value}</TableCell>
                                            <TableCell style={tableCellStyle}>{'--'}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>

                            </DTableWrapper>
                        </Grid>
                    </Grid>
                </DLoadingWrapper>

            </Box>
            <Box display="grid" mt="30px" mb="0px"
                 sx={{borderTop: '1px solid #EEEEEE', paddingTop: '40px'}}>





                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            gap: '10px',
                                        }}>

                                        <LoadingButton
                                            loading={loading.save}
                                            onClick={()=> {
                                                window.print()
                                            }}
                                            variant="contained"
                                            id="printpagebutton"
                                            sx={blueBtnStyle}>
                                            چاپ
                                        </LoadingButton>

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
const blueBtnStyle = {
    padding: "4px 47px",
    backgroundColor: "rgba(8, 119, 189, 1)",
    border: "1px solid rgba(8, 119, 189, 1)",
    fontSize: "14px",
    color: "#fff",
    textDecoration: "none",
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin: "0 0px",
    boxShadow: 'none',
    height: "4.2rem",
    borderRadius: "5px",
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
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
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


export default UsedTicket;
