import React, {useEffect, useState} from 'react';
import {Box, Button, Grid} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';

// Utils

// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import DDialogHeader from 'components/new/shared/DDialog/DDialogHeader';

// Assets
import OrganizationService from "../../../service/api/organization.service";
import {ColorWhite} from "../../../assets/theme/color";
import TicketIcon from "../../../assets/icone/svg/TicketIcon";
import {Form, Formik} from "formik";
import CustomInputBase from "../../../components/Common/Form/CustomInputBase";
import CustomInputFile from "../../../components/Common/Form/CustomInputFile";
import {getErrorForSnackbar} from "../../../utils/helpers";
import DSnackbar from "../../../components/new/shared/DSnackbar";

const AddTicket = ({onClose, getTickets}) => {
    const addFormInitialValues = {
        title: '',
        body: '',
        file: ""

    };
    const [loading, setLoading] = useState({save: false});
    const [request, setRequest] = useState({});
    const [selectedEmployees, setSelectedEmployees] = useState([]);
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

    const Validation_Schema = Yup.object({
        title: Yup.string('').required("مقدار این فیلد نمیتواند خالی باشد"),
        body: Yup.string('').required("مقدار این فیلد نمیتواند خالی باشد"),
    });

    const handleSubmit = async (values, {resetForm}) => {
        console.log("values",values)
        if (loading.save) return;
        setLoading({save: true});
        const formData = new FormData();
        if (values?.title) formData.append('title', values.title);
        if (values?.body) formData.append('body', values.body);
        if (values?.file) formData.append('file', values.file);
        await OrganizationService
            .addTicket(formData)
            .then((res) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'تیکت با موفقیت ایجاد شد.',
                        type: 'success',
                    },
                });
                resetForm({values: ''})
                setSelectedPdf('')
                onClose()
                getTickets()
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
    return (
        <DDialogWrapper open onClose={onClose}>
            <DDialogHeader title={"تیکت جدید"} icon={<TicketIcon/>} onClose={onClose}/>

            <Box display="grid" mt="30px" mb="0px"
                 sx={{borderTop: '1px solid #EEEEEE', paddingTop: '30px'}}>

                <Grid container spacing={2} sx={{padding: '0px 10px 0 40px'}}>
                    <Grid item xs={12}>
                        <Formik
                            initialValues={addFormInitialValues}
                            validationSchema={Validation_Schema}
                            onSubmit={handleSubmit}>

                            <Form>
                                <Grid columnSpacing={8} rowSpacing="14px" container>
                                    <Grid item xs={12} md={12}>
                                        <CustomInputBase
                                            height="4.2rem"
                                            borderRadius=".8rem"
                                            showlabel="true"
                                            name="title"
                                            title={"عنوان"}
                                            placeholder={"عنوان تیکت را وارد نمایید ..."}
                                            weight
                                            style={inputStyle}
                                        />
                                    </Grid>
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
                                            marginTop: '100px',
                                        }}>

                                        <Button
                                            disabled={loading.save}
                                            variant="outlined"
                                            sx={{fontSize: '14px', boxShadow: 'none',...whiteButtonStyle}}
                                            onClick={onClose}>
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
                </Grid>
            </Box>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({...snackBarData, show: false})}
            />

        </DDialogWrapper>
    );
};

const textHelper = {
    color: "#000",
    textAlign: 'right',
    fontWeight: 500,
    fontSize: '10px',
    marginTop: 5

};
const inputStyle = {
    backgroundColor: "#fff",
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const blueBtnStyle = {
    padding: "4px 45px",
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
        bgcolor: '#B4B4B4',
        color: ColorWhite,
    },
};







export default AddTicket;
